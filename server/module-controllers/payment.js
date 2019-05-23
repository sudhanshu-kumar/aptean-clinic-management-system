const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const paymentObj = require("../modules/payment");

const getPayments = async () => {
  const payments = await paymentObj.Payment.find({}).populate("invoice");
  return payments;
};

const addPayment = payment => {
  const newPayment = new paymentObj.Payment(payment);
  newPayment.save();
  return newPayment;
};

const getPaymentById = async id => {
  const payment = await paymentObj.Payment.findOne({ _id: id }).populate(
    "invoice"
  );
  return payment;
};

const updatePaymentById = async (id, reqBody) => {
  const payment = await paymentObj.Payment.findOneAndUpdate(
    {
      _id: id
    },
    {
      $set: reqBody
    },
    { new: true }
  );
  return payment;
};

const deletePaymentById = async id => {
  const payment = await paymentObj.Payment.findOneAndRemove({
    _id: id
  });
  return payment;
};

// ======================Payment validation====================
const validatePayment = payment => {
  const schema = {
    pId: Joi.number(),
    invoice: Joi.objectId(),
    amount: Joi.number(),
    pMethod: Joi.string()
  };
  return Joi.validate(payment, schema);
};

module.exports = {
  getPayments,
  addPayment,
  getPaymentById,
  updatePaymentById,
  deletePaymentById,
  validatePayment
};
