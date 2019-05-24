const Joi = require("joi");
const adminObj = require("../modules/admin");

const getAdminByUserName = async userName => {
  const admin = await adminObj.Admin.findOne({ userName });
  return admin;
};

const addAdmin = admin => {
  const newAdmin = new adminObj.Admin(admin);
  newAdmin.save();
  return newAdmin;
};

// ======================Admin validation====================
const validateAdmin = admin => {
  const schema = {
    name: Joi.string().min(3),
    userName: Joi.string().min(3),
    password: Joi.string()
  };
  return Joi.validate(admin, schema);
};

module.exports = {
  getAdminByUserName,
  addAdmin,
  validateAdmin
};
