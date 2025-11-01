const mongoose = require("mongoose");
const { Schema } = mongoose;

const focusSessionSchema = new Schema({
  title: String,
  startTime: Date,
  endTime: Date,
  status: { type: String, default: "Scheduled" },
  _user: { type: Schema.Types.ObjectId, ref: "User" },
});

mongoose.model("focusSessions", focusSessionSchema);
