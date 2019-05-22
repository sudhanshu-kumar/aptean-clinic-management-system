const mongoose = require("mongoose");

const nurseSchema = new mongoose.Schema(
  {
    nName: { type: String },
    nUserName: { type: String },
    nPassword: { type: String },
    nEmail: { type: String },
    nPhone: { type: String }
  },
  { timestamps: true }
);
const Nurse = mongoose.model("nurse", nurseSchema);

module.exports = {
  Nurse
};
