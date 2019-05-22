const Joi = require("joi");
const doctorObj = require("../modules/doctor");

const getDoctors = async () => {
  const doctor = await doctorObj.Doctor.find({});
  return doctor;
};

const addDoctor = doctor => {
  const newDoctor = new doctorObj.Doctor(doctor);
  newDoctor.save();
  return newDoctor;
};

const getDoctorById = async id => {
  const doctor = await doctorObj.Doctor.findOne({ _id: id });
  return doctor;
};

const getDoctorByUserName = async userName => {
    const doctor = await doctorObj.Doctor.findOne({ dUserName: userName });
    return doctor;
  };

const updateDoctorById = async (id, reqBody) => {
  const doctor = await doctorObj.Doctor.findOneAndUpdate(
    {
      _id: id
    },
    {
      $set: reqBody
    },
    { new: true }
  );
  return doctor;
};

const deleteDoctorById = async id => {
  const doctor = await doctorObj.Doctor.findOneAndRemove({
    _id: id
  });
  return doctor;
};

// ======================Doctor validation====================
const validateDoctor = doctor => {
  const schema = {
    dName: Joi.string().min(3),
    dUserName: Joi.string().min(3),
    dPassword: Joi.string(),
    dEmail: Joi.string().email(),
    dPhone: Joi.string().length(10),
    dSpeciality: Joi.string().min(3),
    dFee: Joi.number(),
    availabilityTimes: Joi.string()
  };
  return Joi.validate(doctor, schema);
};

module.exports = {
  getDoctors,
  addDoctor,
  getDoctorById,
  getDoctorByUserName,
  updateDoctorById,
  deleteDoctorById,
  validateDoctor
};
