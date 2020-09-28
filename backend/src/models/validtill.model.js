var mongoose = require("mongoose");
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var ValidTill = new mongoose.Schema(
  {
    hospitalId: {
      type: String,
    },
    verified: {
      type: String,
      default: "yes",
    },
    validTill: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ValidTill", ValidTill);

// var result = new Date();
//   result.setDate(result.getDate() +30);

// var today = result.toLocaleDateString(Option);
// console.log(today)
