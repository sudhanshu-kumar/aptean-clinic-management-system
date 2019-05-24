const express = require("express");
var bcrypt = require("bcrypt");
const adminObj = require("../module-controllers/admin");
const BCRYPT_SALT_ROUNDS = 10;

const app = express.Router();

//= =================Add New Admin=========================
app.post("/api/admins", async (request, response) => {
    try {
      const { error } = adminObj.validateAdmin(request.body); // result.error (object destructor)
      console.log(error);
      if (error) {
        response.status(400).send(error.details[0].message);
      } else {
        request.body.password = await bcrypt.hash(
          request.body.password,
          BCRYPT_SALT_ROUNDS
        );
        const newAdmin = adminObj.addAdmin(request.body);
        response.json(newAdmin);
      }
    } catch (err) {
      response.status(500).send("Something went wrong, please try again..!!!");
    }
  });

//=====================Login Admin===========================
app.post("/api/admins/login", async (request, response) => {
  try {
    const admin = await adminObj.getAdminByUserName(request.body.userName);
    if (admin === null)
      response.status(400).send("No Admin found with the given UserName");
    const samePassword = await bcrypt.compare(
      request.body.password,
      admin.password
    );
    if (!samePassword) response.status(403).send("password incorrect");
    response.json(admin);
  } catch (err) {
    response.status(500).send("Something went wrong, please try again..!!!");
  }
});

module.exports = { app };
