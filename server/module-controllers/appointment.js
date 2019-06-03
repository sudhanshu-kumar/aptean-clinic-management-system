const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);
const appointmentObj = require("../modules/appointment");

const getAppointments = async () => {
  const appointments = await appointmentObj.Appointment.find({}).populate("doctor patient createdBy");
  return appointments;
};

const addAppointment = appointment => {
  const newAppointment = new appointmentObj.Appointment(appointment);
  newAppointment.save();
  return newAppointment;
};

const getAppointmentById = async id => {
  const appointment = await appointmentObj.Appointment.findOne({ _id: id }).populate("doctor patient createdBy");
  return appointment;
};

const getAppointmentByPatient = async patient => {
  const appointment = await appointmentObj.Appointment.find({ patient }).populate("doctor patient createdBy");
  return appointment;
};

const updateAppointmentById = async (id, reqBody) => {
  const appointment = await appointmentObj.Appointment.findOneAndUpdate(
    {
      _id: id
    },
    {
      $set: reqBody
    },
    { new: true }
  );
  return appointment;
};

const deleteAppointmentById = async id => {
  const appointment = await appointmentObj.Appointment.findOneAndRemove({
    _id: id
  });
  return appointment;
};

// ======================Appointment validation====================
const validateAppointment = appointment => {
  const schema = {
    aptDate: Joi.date(),
    doctor: Joi.objectId(),
    patient: Joi.objectId(),
    type: Joi.string(),
    status: Joi.string(),
    createdBy: Joi.objectId()
  };
  return Joi.validate(appointment, schema);
};

module.exports = {
  getAppointments,
  addAppointment,
  getAppointmentById,
  getAppointmentByPatient,
  updateAppointmentById,
  deleteAppointmentById,
  validateAppointment
};
