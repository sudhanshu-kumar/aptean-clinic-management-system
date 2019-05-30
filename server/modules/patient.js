const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    tokenId: { type: Number },
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String },
    password: { type: String },
    age: { type: Number },
    sex: { type: String },
    address: { type: String },
    eName: { type: String },
    ePhone: { type: String },
    relation: { type: String },
    userType: { type: String, default: "patient" }
  },
  { timestamps: true }
);
const Patient = mongoose.model("patient", patientSchema);

module.exports = {
  Patient
};
