const express = require("express");
const invoiceObj = require("../module-controllers/invoice");

const app = express.Router();

// =================Get All Invoices======================
app.get("/api/invoices", async (request, response) => {
  try {
    const invoices = await invoiceObj.getInvoices();
    console.log("sds");
    if (invoices.length > 0) response.json(invoices);
    response.status(404).send("no invoice found");
  } catch (err) {
    response.status(500).send("Something went wrong, please try again..!!!");
  }
});

//= =================Add New Invoice=========================
app.post("/api/invoices", async (request, response) => {
  try {
    console.log(request.body);
    const { error } = invoiceObj.validateInvoice(request.body); // result.error (object destructor)
    console.log(error);
    if (error) {
       response.status(400).send(error.details[0].message);
     } else {
        const invoices = await invoiceObj.getInvoices();
        if (invoices.length < 1) request.body.iNo = 100001;
        else request.body.iNo = invoices[invoices.length - 1].iNo + 1;
        request.body.total = request.body.items.reduce((acc, item) => { return acc + parseInt(item.price) }, 0)
        const newInvoice = invoiceObj.addInvoice(request.body);
        response.json(newInvoice);
    }
  } catch (err) {
    response.status(500).send("Something went wrong, please try again..!!!");
  }
});

//= =================Get Invoice By Id========================
app.get("/api/invoices/:invoiceId", async (request, response) => {
  try {
    const invoice = await invoiceObj
      .getInvoiceById(request.params.invoiceId)
      .catch(() => {
        response.status(404).send("Requested id not found");
      });
    if (invoice === null) {
      response.status(400).send("No Invoice found with the given id");
    }
    response.json(invoice);
  } catch (err) {
    response.status(500).send("Something went wrong, please try again..!!!");
  }
});

// ========================Update Invoice By Id======================
app.put("/api/invoices/:invoiceId", async (request, response) => {
  try {
    const { error } = invoiceObj.validateInvoice(request.body); // result.error (object destructor)
    if (error) {
      response.status(400).send(error.details[0].message);
    } else {
      const invoice = await invoiceObj
        .updateInvoiceById(request.params.invoiceId, request.body)
        .catch(() => {
          response.status(404).send("Requested id not found");
        });
      if (invoice === null) {
        response.status(400).send("No Invoice found with the given id");
      }
      response.json(invoice);
    }
  } catch (err) {
    response.status(500).send("Something went wrong, please try again..!!!");
  }
});

// ===========Delete Invoice By Id===========================
app.delete("/api/invoices/:invoiceId", async (request, response) => {
  try {
    const invoice = await invoiceObj
      .deleteInvoiceById(request.params.invoiceId)
      .then(() => { response.status(204).send("deleted successfully") })
      .catch(() => {
        response.status(404).send("Requested id not found");
      });
    if (invoice === null) {
      response.status(400).send("No Invoice found with the given id");
    }
    response.json(invoice);
  } catch (err) {
    response.status(500).send("Something went wrong, please try again..!!!");
  }
});

module.exports = { app };
