const Joi = require("joi");
const nurseObj = require("../modules/nurse");

const getNurses = async () => {
  const nurses = await nurseObj.Nurse.find({});
  return nurses;
};

const addNurse = nurse => {
  const newNurse = new nurseObj.Nurse(nurse);
  newNurse.save();
  return newNurse;
};

const getNurseById = async id => {
  const nurse = await nurseObj.Nurse.findOne({ _id: id });
  return nurse;
};

const getNurseByUserName = async userName => {
  const nurse = await nurseObj.Nurse.findOne({ userName });
  return nurse;
};

const updateNurseById = async (id, reqBody) => {
  const nurse = await nurseObj.Nurse.findOneAndUpdate(
    {
      _id: id
    },
    {
      $set: reqBody
    },
    { new: true }
  );
  return nurse;
};

const deleteNurseById = async id => {
  const nurse = await nurseObj.Nurse.findOneAndRemove({
    _id: id
  });
  return nurse;
};

// ======================Nurse validation====================
const validateNurse = nurse => {
  const schema = {
    name: Joi.string().min(3),
    userName: Joi.string().min(3),
    password: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string().length(10),
    userType: Joi.string().min(3)
  };
  return Joi.validate(nurse, schema);
};

module.exports = {
  getNurses,
  addNurse,
  getNurseById,
  getNurseByUserName,
  updateNurseById,
  deleteNurseById,
  validateNurse
};
