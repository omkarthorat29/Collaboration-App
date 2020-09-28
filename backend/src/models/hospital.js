var mongoose = require("mongoose");
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var HospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    phone: {
      type: String,
    },

    address: {
      type: String,
    },
    hospitalId: {
      type: String,
    },
    adminId: ObjectId,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Hospital", HospitalSchema);
// sample = new Date()
// sample.setDate(sample.getDate() + 30);
// valid = sample.toLocaleDateString()
// today = new Date().toLocaleDateString()

// console.log("Today : ",today)
// console.log("valid Till : ",valid)
