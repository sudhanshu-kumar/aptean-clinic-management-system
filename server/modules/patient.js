const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  tokenId: Number,
  pLastName: String,
  pFisrstName: String,
  age: Number,
  sex: String,
  address: String,
  uniqueId: String,
  emergecyContact: {
    name: String,
    phone: String,
    eUid: String,
    relation: String
  }
});
const Patient = mongoose.model("patient", patientSchema);

module.exports = {
  Patient
};
