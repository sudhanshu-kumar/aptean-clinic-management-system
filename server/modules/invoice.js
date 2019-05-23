const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const invoiceSchema = new mongoose.Schema(
  {
    iNo: { type: Number },
    appointment: { type: mongoose.Schema.Types.ObjectId, ref: "appointment" },
    items: { type: Array },
    total: { type: Number },
    status: { type: String }
  },
  { timestamps: true }
);
const Invoice = mongoose.model("invoice", invoiceSchema);

module.exports = {
  Invoice
};
