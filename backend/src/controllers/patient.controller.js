var PatientSugar = require("../models/patient-sugar.model");
var User = require("../models/user");
const mongoose = require("mongoose");

exports.add = (req, res) => {
  if (req.body.on_time == "Before Meal") {
    if (parseInt(req.body.level) >= 70 && parseInt(req.body.level) <= 130)
      req.body.status = "NORMAL";
    if (parseInt(req.body.level) > 130) req.body.status = "HIGH";
    if (parseInt(req.body.level) < 70) req.body.status = "LOW";
  }

  if (req.body.on_time == "After Meal") {
    if (parseInt(req.body.level) > 180) req.body.status = "HIGH";
    else req.body.status = "NORMAL";
  }
  console.log(req.body);
  var socketio = req.app.get("socketio");
  PatientSugar.updateOne(
    {
      patientId: req.user._id,
    },
    {
      $set: {
        patientId: req.user._id,
      },
      $push: {
        levels: { $each: [req.body], $sort: { updatedAt: -1 } },
      },
    },
    { upsert: true, setDefaultsOnInsert: true },
    (err, message) => {
      if (err) {
        return res.status(400).json({ msg: err });
      }
      socketio.sockets.emit("sugarAdded", req.user._id);
      socketio.sockets.emit("patientSugarAdded", req.user.hospitalId);
      return res.status(201).json(message);
    }
  );
};

exports.view = (req, res) => {
  PatientSugar.findOne(
    {
      patientId: req.user._id,
    },
    (err, result) => {
      if (err) {
        return res.status(400).json({ msg: err });
      }
      return res.status(201).json(result);
    }
  );
};

exports.viewForDoctor = (req, res) => {
  PatientSugar.aggregate(
    [
      {
        $lookup: {
          from: User.collection.name,
          localField: "patientId",
          foreignField: "_id",
          as: "userData",
        },
      },
      { $unwind: { path: "$userData", preserveNullAndEmptyArrays: true } },
      { $match: { "userData.hospitalId": req.params.hospitalId } },
      {
        $project: {
          _id: 1,
          levels: { $slice: ["$levels", 3] },
          userData: 1,
          updatedAt: 1,
        },
      },
    ],
    (err, result) => {
      if (err) {
        return res.status(400).json({ msg: err });
      }
      return res.status(201).json(result);
    }
  );
};
