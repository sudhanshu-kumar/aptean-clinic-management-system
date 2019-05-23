const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const invoiceObj = require("../modules/invoice");

const getInvoices = async () => {
  const invoices = await invoiceObj.Invoice.find({}).populate("appointment");
  return invoices;
};

const addInvoice = invoice => {
  const newInvoice = new invoiceObj.Invoice(invoice);
  newInvoice.save();
  return newInvoice;
};

const getInvoiceById = async id => {
  const invoice = await invoiceObj.Invoice.findOne({ _id: id }).populate(
    "appointment"
  );
  return invoice;
};

const updateInvoiceById = async (id, reqBody) => {
  const invoice = await invoiceObj.Invoice.findOneAndUpdate(
    {
      _id: id
    },
    {
      $set: reqBody
    },
    { new: true }
  );
  return invoice;
};

const deleteInvoiceById = async id => {
  const invoice = await invoiceObj.Invoice.findOneAndRemove({
    _id: id
  });
  return invoice;
};

// ======================Invoice validation====================
const validateInvoice = invoice => {
  const schema = {
    iNo: Joi.number(),
    appointment: Joi.objectId(),
    items: Joi.array(),
    total: Joi.number(),
    status: Joi.string()
  };
  return Joi.validate(invoice, schema);
};

module.exports = {
  getInvoices,
  addInvoice,
  getInvoiceById,
  updateInvoiceById,
  deleteInvoiceById,
  validateInvoice
};
