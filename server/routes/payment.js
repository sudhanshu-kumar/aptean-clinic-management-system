const express = require("express");
const paymentObj = require("../module-controllers/payment");
const invoiceObj = require("../module-controllers/invoice");

const app = express.Router();

// =================Get All Payments======================
app.get("/api/payments", async (request, response) => {
  try {
    const payments = await paymentObj.getPayments();
    console.log("sds");
    if (payments.length > 0) response.json(payments);
    response.status(404).send("no payment found");
  } catch (err) {
    response.status(500).send("Something went wrong, please try again..!!!");
  }
});

//= =================Add New Payment=========================
app.post("/api/payments", async (request, response) => {
  try {
    console.log(request.body);
    const { error } = paymentObj.validatePayment(request.body); // result.error (object destructor)
    console.log(error);
    if (error) {
      response.status(400).send(error.details[0].message);
    } else {
      const payments = await paymentObj.getPayments();
      if (payments.length < 1) request.body.pId = 500001;
      else request.body.pId = payments[payments.length - 1].pId + 1;
      const invoice = await invoiceObj.getInvoiceById(request.body.invoice);
      if (invoice === null) response.status(400).send("no invoice found");
      else request.body.amount = invoice.total;
      const newPayment = paymentObj.addPayment(request.body);
      response.json(newPayment);
    }
  } catch (err) {
    response.status(500).send("Something went wrong, please try again..!!!");
  }
});

//= =================Get Payment By Id========================
app.get("/api/payments/:paymentId", async (request, response) => {
  try {
    const payment = await paymentObj
      .getPaymentById(request.params.paymentId)
      .catch(() => {
        response.status(404).send("Requested id not found");
      });
    if (payment === null) {
      response.status(400).send("No Payment found with the given id");
    }
    response.json(payment);
  } catch (err) {
    response.status(500).send("Something went wrong, please try again..!!!");
  }
});

// ========================Update Payment By Id======================
app.put("/api/payments/:paymentId", async (request, response) => {
  try {
    const { error } = paymentObj.validatePayment(request.body); // result.error (object destructor)
    if (error) {
      response.status(400).send(error.details[0].message);
    } else {
      const payment = await paymentObj
        .updatePaymentById(request.params.paymentId, request.body)
        .catch(() => {
          response.status(404).send("Requested id not found");
        });
      if (payment === null) {
        response.status(400).send("No Payment found with the given id");
      }
      response.json(payment);
    }
  } catch (err) {
    response.status(500).send("Something went wrong, please try again..!!!");
  }
});

// ===========Delete Payment By Id===========================
app.delete("/api/payments/:paymentId", async (request, response) => {
  try {
    const payment = await paymentObj
      .deletePaymentById(request.params.paymentId)
      .then(() => {
        response.status(204).send("deleted successfully");
      })
      .catch(() => {
        response.status(404).send("Requested id not found");
      });
    if (payment === null) {
      response.status(400).send("No Payment found with the given id");
    }
    response.json(payment);
  } catch (err) {
    response.status(500).send("Something went wrong, please try again..!!!");
  }
});

module.exports = { app };
