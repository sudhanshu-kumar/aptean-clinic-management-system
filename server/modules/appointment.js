const mongoose = require("mongoose");
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const appointmentSchema = new mongoose.Schema(
  {
    aptDate: { type: Date },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'doctor' },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'patient' },
    type: { type: String },
    status: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'nurse' }
  },
  { timestamps: true }
);
const Appointment = mongoose.model("appointment", appointmentSchema);

module.exports = {
    Appointment
};
