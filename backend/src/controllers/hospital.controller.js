var Hospital = require("../models/hospital");
const mongoose = require("mongoose");
var ValidTill = require("../models/validtill.model");
var User = require("../models/user");
exports.create = (req, res, next) => {
  req.body.hospitalId = Math.floor(
    100000 + Math.random() * 9000000000
  ).toString();

  req.body.adminId = mongoose.Types.ObjectId(req.body.id);
  console.log(req.body);

  Hospital.updateOne(
    { adminId: req.body.adminId },

    req.body,
    { upsert: true },
    (err, data) => {
      if (err) {
        return res.status(400).json({ msg: err });
      }
      return res.status(201).json({ operation: true });
    }
  );
};

exports.getHospital = (req, res) => {
  Hospital.findOne({ hospitalId: req.params.id }, (err, data) => {
    if (err) {
      return res.status(400).json({ msg: err });
    }
    if (!data) return res.json("Hospital Not Found");
    return res.status(201).json(data);
  });
};

exports.getAllHospitalUserTypeWise = (req, res, next) => {
  User.aggregate(
    [
      {
        $match: {
          hospitalId: req.params.hospitalId,
        },
      },
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 },
        },
      },
    ],
    (err, count) => {
      if (err) {
        return res.status(400).json({ msg: err });
      }
      return res.status(201).json(count);
    }
  );
};
exports.allUsers = (req, res) => {
  User.find(
    { hospitalId: req.params.hospitalId, role: req.params.role },
    (err, user) => {
      if (err) {
        return res.status(400).send({ msg: err });
      }

      if (!user) {
        return res
          .status(400)
          .json({ msg: "The user Hospital does not exist" });
      }

      return res.json(user);
    }
  );
};

exports.addValidity = (req, res) => {
  var result = new Date();
  result.setDate(result.getDate() + 10);

  var today = result.toLocaleDateString();

  req.body.validTill = today;
  console.log(req.body);
  ValidTill.updateOne(
    { hospitalId: req.body.hospitalId },
    req.body,
    { upsert: true },
    (err, data) => {
      if (err) {
        return res.status(400).json({ msg: err });
      }
      return res.status(201).json(data);
    }
  );
};

exports.getValidity = (req, res) => {
  ValidTill.findOne({ hospitalId: req.params.hospitalId }, (err, data) => {
    if (err) {
      return res.status(400).json({ msg: err });
    }
    if (!data) return res.json("Hospital Not Found");
    return res.status(201).json(data);
  });
};
