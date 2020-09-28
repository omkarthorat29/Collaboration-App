var Task = require("../models/task");
const mongoose = require("mongoose");

exports.add = (req, res) => {
  var socketio = req.app.get("socketio");
  req.body.userId = req.user._id;
  console.log(req.user);
  let task = new Task(req.body);

  task.save((err, result) => {
    if (err) {
      return res.status(400).json({ msg: err });
    }
    socketio.sockets.emit("taskAdded", result.userId);
    return res.status(201).json(result);
  });
};

exports.findTask = (req, res) => {
  console.log(req.user);
  Task.find({ userId: req.user._id }, (err, result) => {
    if (err) {
      return res.status(400).json({ msg: err });
    }
    console.log("find task", result);
    return res.status(201).json(result);
  }).sort({ createdAt: -1 });
};

exports.updateTask = (req, res) => {
  Task.findByIdAndUpdate(
    { _id: req.body._id },
    { $set: { completed: req.body.completed } },
    (err, result) => {
      if (err) {
        return res.status(400).json({ msg: err });
      }
      return res.status(201).json(result);
    }
  );
};

exports.deleteTask = (req, res) => {
  Task.findByIdAndDelete(
    { _id: req.params.id },

    (err, result) => {
      if (err) {
        return res.status(400).json({ msg: err });
      }
      return res.status(201).json(result);
    }
  );
};

exports.todaysTask = (req, res) => {
  let date =
    new Date().getDate() +
    "/" +
    new Date().getMonth() +
    "/" +
    new Date().getFullYear();

  Task.find(
    { userId: req.user._id, created: date },

    (err, result) => {
      if (err) {
        return res.status(400).json({ msg: err });
      }
      return res.status(201).json(result);
    }
  ).sort({ updatedAt: -1 });
};
