const mongoose = require("mongoose");
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
const message = new mongoose.Schema(
  {
    senderId: ObjectId,
    content: {
      type: String,
    },
    url: {
      type: String,
    },
    type: {
      type: String,
    },
    originalname: {
      type: String,
    },
    isSeen: {
      type: String,
      default: "no",
    },
  },
  {
    timestamps: true,
  }
);

var Messages = new mongoose.Schema(
  {
    idOne: ObjectId,
    idTwo: ObjectId,
    roleOne: {
      type: String,
    },
    roleTwo: {
      type: String,
    },
    messages: [message],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Messages", Messages);
