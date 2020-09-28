var mongoose = require("mongoose");
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

let date =
  new Date().getDate() +
  "/" +
  new Date().getMonth() +
  "/" +
  new Date().getFullYear();

var TaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    created: { type: String, default: date.toString() },
    userId: ObjectId,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", TaskSchema);
