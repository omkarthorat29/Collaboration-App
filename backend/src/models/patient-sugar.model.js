var mongoose = require("mongoose");
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
const Levels = new mongoose.Schema(
  {
    level: {
      type: String,
    },
    on_time: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
var SugarLevelSchema = new mongoose.Schema(
  {
    patientId: ObjectId,
    levels: [Levels],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SugarLevel", SugarLevelSchema);
