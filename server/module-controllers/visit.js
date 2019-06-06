const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);
const VisitObj = require("../modules/Visit");

const getVisits = async () => {
  const Visits = await VisitObj.Visit.find({}).populate("appointment patient diagnosedBy nursedBy");
  return Visits;
};

const addVisit = Visit => {
  const newVisit = new VisitObj.Visit(Visit);
  newVisit.save();
  return newVisit;
};

const getVisitById = async id => {
  const Visit = await VisitObj.Visit.findOne({ _id: id }).populate("appointment patient diagnosedBy nursedBy");
  return Visit;
};

const getVisitByPatient = async patient => {
  const Visit = await VisitObj.Visit.find({ patient }).populate("appointment patient diagnosedBy nursedBy");
  return Visit;
};

const updateVisitById = async (id, reqBody) => {
  const Visit = await VisitObj.Visit.findOneAndUpdate(
    {
      _id: id
    },
    {
      $set: reqBody
    },
    { new: true }
  );
  return Visit;
};

const deleteVisitById = async id => {
  const Visit = await VisitObj.Visit.findOneAndRemove({
    _id: id
  });
  return Visit;
};

// ======================Visit validation====================
const validateVisit = Visit => {
  const schema = {
    appointment: Joi.objectId(),
    patient: Joi.objectId(),
    diagnosedBy: Joi.objectId(),
    nursedBy: Joi.objectId(),
    date: Joi.date(),
  };
  return Joi.validate(Visit, schema);
};

module.exports = {
  getVisits,
  addVisit,
  getVisitById,
  getVisitByPatient,
  updateVisitById,
  deleteVisitById,
  validateVisit
};
