const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    tokenId: { type: Number, unique: true },
    pLastName: { type: String },
    pFisrstName: { type: String },
    age: { type: Number },
    sex: { type: String },
    address: { type: String },
    uniqueId: { type: String, unique: true },
    emergecyContact: {
      name: { type: String },
      phone: { type: String },
      eUid: { type: String },
      relation: { type: String }
    }
  },
  { timestamps: true }
);
const Patient = mongoose.model("patient", patientSchema);

module.exports = {
  Patient
};
