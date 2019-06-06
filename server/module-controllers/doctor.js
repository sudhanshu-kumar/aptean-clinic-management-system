const Joi = require("joi");
const doctorObj = require("../modules/doctor");

const getDoctors = async () => {
  const doctor = await doctorObj.Doctor.find({}).select("-password");
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
  const doctor = await doctorObj.Doctor.findOne({ userName });
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
    name: Joi.string().min(3),
    userName: Joi.string().min(3),
    password: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string().length(10),
    speciality: Joi.string().min(3),
    fee: Joi.number(),
    availabilityTimes: Joi.string(),
    userType: Joi.string().min(3)
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
