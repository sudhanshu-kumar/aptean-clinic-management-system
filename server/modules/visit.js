const mongoose = require("mongoose");
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const visitSchema = new mongoose.Schema(
  {
    appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'appointment' },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'patient' },
    diagnosedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'doctor' },
    nursedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'nurse' },
    date: { type: String, default: new Date().toString() }
  },
  { timestamps: true }
);
const Visit = mongoose.model("visit", visitSchema);

module.exports = {
    Visit
};
