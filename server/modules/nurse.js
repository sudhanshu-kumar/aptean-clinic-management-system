const mongoose = require("mongoose");

const nurseSchema = new mongoose.Schema(
  {
    name: { type: String },
    userName: { type: String },
    password: { type: String },
    email: { type: String },
    phone: { type: String },
    userType: { type: String, default: "nurse" }
  },
  { timestamps: true }
);
const Nurse = mongoose.model("nurse", nurseSchema);

module.exports = {
  Nurse
};
