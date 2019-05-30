const Joi = require("joi");
const patientObj = require("../modules/patient");

const getPatients = async () => {
  const patient = await patientObj.Patient.find({});
  return patient;
};

const addPatient = patient => {
  const newPatient = new patientObj.Patient(patient);
  newPatient.save();
  return newPatient;
};

const getPatientById = async id => {
  const patient = await patientObj.Patient.findOne({ _id: id });
  return patient;
};

const getPatientByUserName = async userName => {
  const patient = await patientObj.Patient.findOne({ userName });
  return patient;
};

const updatePatientById = async (id, reqBody) => {
  const patient = await patientObj.Patient.findOneAndUpdate(
    {
      _id: id
    },
    {
      $set: reqBody
    },
    { new: true }
  );
  return patient;
};

const deletePatientById = async id => {
  const patient = await patientObj.Patient.findOneAndRemove({
    _id: id
  });
  return patient;
};

// ======================Patient validation====================
const validatePatient = patient => {
  const schema = {
    tokenId: Joi.number(),
    firstName: Joi.string().min(3),
    lastName: Joi.string().min(3),
    userName: Joi.string().min(3),
    password: Joi.string().min(6),
    age: Joi.number(),
    sex: Joi.string().min(1),
    address: Joi.string().min(3),
    eName: Joi.string().min(3),
    ePhone: Joi.string().length(10),
    relation: Joi.string().min(3)
  };
  return Joi.validate(patient, schema);
};

module.exports = {
  getPatients,
  addPatient,
  getPatientById,
  getPatientByUserName,
  updatePatientById,
  deletePatientById,
  validatePatient
};
