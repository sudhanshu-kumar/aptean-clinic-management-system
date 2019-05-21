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

const getPatientByUniqueId = async uniqueId => {
    const patient = await patientObj.Patient.findOne({ uniqueId });
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
    pLastName: Joi.string().min(3),
    pFisrstName: Joi.string().min(3),
    age: Joi.number(),
    sex: Joi.string().min(1),
    address: Joi.string().min(3),
    uniqueId: Joi.string().min(6),
    emergecyContact: {
      name: Joi.string().min(3),
      phone: Joi.string().length(10),
      eUid: Joi.string().min(6),
      relation: Joi.string().min(3)
    }
  };
  return Joi.validate(patient, schema);
};

module.exports = {
  getPatients,
  addPatient,
  getPatientById,
  getPatientByUniqueId,
  updatePatientById,
  deletePatientById,
  validatePatient
};
