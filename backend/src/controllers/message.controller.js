var Message = require("../models/messages.model");
const mongoose = require("mongoose");
var User = require("../models/user");
const e = require("express");

exports.addMessage = (req, res) => {
  var socketio = req.app.get("socketio");
  req.body.message.senderId = mongoose.Types.ObjectId(
    req.body.message.senderId
  );
  const idOne = mongoose.Types.ObjectId(req.user.id);
  const idTwo = mongoose.Types.ObjectId(req.params.selectedId);
  Message.findOne(
    {
      $or: [
        {
          $and: [{ idOne: idOne }, { idTwo: idTwo }],
        },
        {
          $and: [{ idOne: idTwo }, { idTwo: idOne }],
        },
      ],
    },
    (err, data) => {
      if (err) {
        return res.status(400).json({ msg: err });
      }
      if (data) {
        Message.updateOne(
          {
            _id: data._id,
          },
          {
            $push: {
              messages: req.body.message,
            },
          },
          { upsert: true, setDefaultsOnInsert: true },
          (err, message) => {
            if (err) {
              return res.status(400).json({ msg: err });
            }
            socketio.sockets.emit("newMessage", {
              idOne: req.user.id,
              idTwo: req.params.selectedId,
              message: req.body.message,
              user: req.user,
              selectedRole: req.user.role,
            });

            return res.status(201).json(message);
          }
        );
      } else {
        Message.updateOne(
          {
            idOne: idOne,
            idTwo: idTwo,
          },
          {
            $set: {
              idOne: idOne,
              idTwo: idTwo,
              roleOne: req.user.role,
              roleTwo: req.params.selectedRole,
            },
            $push: {
              messages: req.body.message,
            },
          },
          { upsert: true, setDefaultsOnInsert: true },
          (err, message) => {
            if (err) {
              return res.status(400).json({ msg: err });
            }
            socketio.sockets.emit("newMessage", {
              idOne: req.user.id,
              idTwo: req.params.selectedId,
              user: req.user,
              message: req.body.message,
              selectedRole: req.params.selectedRole,
            });
            return res.status(201).json(message);
          }
        );
      }
    }
  );
};

exports.updateMessage = (req, res) => {
  var socketio = req.app.get("socketio");
  Message.update(
    { _id: req.params.id, "messages._id": req.params.msgId },
    {
      $set: {
        "messages.$.isSeen": "yes",
      },
    },

    (err, messages) => {
      if (err) return res.json(err);
      socketio.sockets.emit("isSeenUpdated", {
        id: req.params.id,
        msgId: req.params.msgId,
      });
      return res.json(messages);
    }
  );
};

exports.getMessage = (req, res) => {
  const idOne = mongoose.Types.ObjectId(req.user.id);
  const idTwo = mongoose.Types.ObjectId(req.params.selectedId);

  Message.findOne(
    {
      $or: [
        {
          $and: [{ idOne: idOne }, { idTwo: idTwo }],
        },
        {
          $and: [{ idOne: idTwo }, { idTwo: idOne }],
        },
      ],
    },
    {
      messages: {
        $slice: -parseInt(req.params.limit),
      },
    }
  ).exec((err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

exports.getRecentMessages = (req, res) => {
  Message.find(
    {
      $or: [{ idOne: req.user.id }, { idTwo: req.user.id }],
    },
    {
      messages: {
        $slice: -parseInt(1),
      },
    },
    {
      sort: { "messages.createdAt": -1 },
    }
  )
    .lean()
    .exec((err, data) => {
      if (err) return res.json(err);

      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        element.user = {};
      }
      return res.json(data);
    });
};
