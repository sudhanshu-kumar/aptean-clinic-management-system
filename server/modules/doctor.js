const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String },
    userName: { type: String },
    password: { type: String },
    email: { type: String },
    phone: { type: String },
    speciality: { type: String },
    fee: { type: Number },
    availabilityTimes: { type: String }
  },
  { timestamps: true }
);
const Doctor = mongoose.model("doctor", doctorSchema);

module.exports = {
  Doctor
};
