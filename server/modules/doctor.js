const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    dName: { type: String },
    dUserName: { type: String },
    dPassword: { type: String },
    dEmail: { type: String },
    dPhone: { type: String },
    dSpeciality: { type: String },
    dFee: { type: Number },
    availabilityTimes: { type: String }
  },
  { timestamps: true }
);
const Doctor = mongoose.model("doctor", doctorSchema);

module.exports = {
    Doctor
};
