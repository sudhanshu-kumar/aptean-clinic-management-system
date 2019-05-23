const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const paymentSchema = new mongoose.Schema(
  {
    pId: { type: Number },
    invoice: { type: mongoose.Schema.Types.ObjectId, ref: "invoice" },
    amount: { type: Number },
    pMethod: { type: String, default: "cash" }
  },
  { timestamps: true }
);
const Payment = mongoose.model("payment", paymentSchema);

module.exports = {
    Payment
};
