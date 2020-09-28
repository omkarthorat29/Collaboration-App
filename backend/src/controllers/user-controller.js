var User = require("../models/user");
var jwt = require("jsonwebtoken");
var config = require("../config/config");
var Hospital = require("../models/hospital");

function createToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    config.jwtSecret,
    {
      expiresIn: 86400, // 86400 expires in 24 hours
    }
  );
}

exports.registerUser = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ msg: "You need to send email and password" });
  }

  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.status(400).json({ msg: err });
    }

    if (user) {
      return res.status(400).json({ msg: "The user already exists" });
    }

    let newUser = User(req.body);
    newUser.save((err, user) => {
      if (err) {
        return res.status(400).json({ msg: err });
      }
      return res.status(201).json(user);
    });
  });
};

exports.loginUser = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ msg: "You need to send email and password" });
  }

  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.status(400).send({ msg: err });
    }

    if (!user) {
      return res.status(400).json({ msg: "The user does not exist" });
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch && !err) {
        return res.status(200).json({
          token: createToken(user),
        });
      } else {
        return res
          .status(400)
          .json({ msg: "The email and password don't match." });
      }
    });
  });
};

exports.profile = (req, res) => {
  if (req.user.role == "admin") {
    User.aggregate(
      [
        {
          $match: {
            _id: req.user._id,
          },
        },
        {
          $lookup: {
            from: Hospital.collection.name,
            localField: "_id",
            foreignField: "adminId",
            as: "hospital",
          },
        },
        { $unwind: { path: "$hospital", preserveNullAndEmptyArrays: true } },
        {
          $project: {
            _id: 1,
            email: 1,
            phone: 1,
            fullname: 1,
            profile: 1,
            role: 1,
            hospitalId: 1,
            verified: 1,
            hospital: 1,
          },
        },
      ],
      (err, user) => {
        if (err) {
          return res.status(400).send({ msg: err });
        }
        if (!user) {
          return res
            .status(400)
            .json({ msg: "The user Hospital does not exist" });
        }
        return res.json(user[0]);
      }
    );
  } else {
    User.aggregate(
      [
        {
          $match: {
            _id: req.user._id,
          },
        },
        {
          $lookup: {
            from: Hospital.collection.name,
            localField: "hospitalId",
            foreignField: "hospitalId",
            as: "hospital",
          },
        },
        { $unwind: { path: "$hospital", preserveNullAndEmptyArrays: true } },
        {
          $project: {
            _id: 1,
            email: 1,
            phone: 1,
            fullname: 1,
            profile: 1,
            role: 1,
            hospitalId: 1,
            verified: 1,
            hospital: 1,
          },
        },
      ],
      (err, user) => {
        if (err) {
          return res.status(400).send({ msg: err });
        }
        if (!user) {
          return res
            .status(400)
            .json({ msg: "The user Hospital does not exist" });
        }
        return res.json(user[0]);
      }
    );
  }
};

exports.getUserProfile = (req, res) => {
  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(400).send({ msg: err });
    }
    if (!user) {
      return res.status(400).json({ msg: "The user Hospital does not exist" });
    }
    return res.json(user);
  });
};

exports.userUpdate = (req, res, next) => {
  var socketio = req.app.get("socketio");

  User.updateOne(
    { _id: req.user._id },
    {
      $set: req.body,
    },
    (err, user) => {
      if (err) {
        return res.status(400).json({ msg: err });
      }

      socketio.sockets.emit("userUpdated", req.user._id);

      return res.status(201).json({ updated: user.ok, id: req.user._id });
    }
  );
};

exports.adminUserUpdate = (req, res) => {
  var socketio = req.app.get("socketio");

  User.updateOne(
    { _id: req.params.id },
    {
      $set: { verified: req.body.verified },
    },
    (err, user) => {
      if (err) {
        return res.status(400).json({ msg: err });
      }
      socketio.sockets.emit("userVerified", req.user.id);
      socketio.sockets.emit("userUpdated", req.params.id);

      return res.status(201).json({ updated: user.ok, id: req.params.id });
    }
  );
};
