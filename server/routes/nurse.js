const express = require("express");
var bcrypt = require("bcrypt");
const nurseObj = require("../module-controllers/nurse");
const BCRYPT_SALT_ROUNDS = 10;

const app = express.Router();

// =================Get All Nurses======================
app.get("/api/nurses", async (request, response) => {
  try {
    const nurses = await nurseObj.getNurses();
    console.log("sds");
    if (nurses.length > 0) response.json(nurses);
    response.status(404).send("no nurse found");
  } catch (err) {
    response.status(500).send("Something went wrong, please try again..!!!");
  }
});

//= =================Add New Nurse=========================
app.post("/api/nurses", async (request, response) => {
  try {
    const { error } = nurseObj.validateNurse(request.body); // result.error (object destructor)
    console.log(error);
    if (error) {
      response.status(400).send(error.details[0].message);
    } else {
      request.body.nPassword = await bcrypt.hash(
        request.body.nPassword,
        BCRYPT_SALT_ROUNDS
      );
      const newNurse = nurseObj.addNurse(request.body);
      response.json(newNurse);
    }
  } catch (err) {
    response.status(500).send("Something went wrong, please try again..!!!");
  }
});

//=====================Login Nurse===========================
app.post("/api/nurses/login", async (request, response) => {
  try {
    const nurse = await nurseObj.getNurseByUserName(request.body.nUserName);
    if (nurse === null)
      response.status(400).send("No Nurse found with the given UserName");
    const samePassword = await bcrypt.compare(
      request.body.nPassword,
      nurse.nPassword
    );
    if (!samePassword) response.status(403).send("password incorrect");
    response.send("password matched");
  } catch (err) {
    response.status(500).send("Something went wrong, please try again..!!!");
  }
});

//= =================Get Nurse By Id========================
app.get("/api/nurses/:nurseId", async (request, response) => {
  try {
    const nurse = await nurseObj
      .getNurseById(request.params.nurseId)
      .catch(() => {
        response.status(404).send("Requested id not found");
      });
    if (nurse === null) {
      response.status(400).send("No Nurse found with the given id");
    }
    response.json(nurse);
  } catch (err) {
    response.status(500).send("Something went wrong, please try again..!!!");
  }
});

// ========================Update Nurse By Id======================
app.put("/api/nurses/:nurseId", async (request, response) => {
  try {
    const { error } = nurseObj.validateNurse(request.body); // result.error (object destructor)
    if (error) {
      response.status(400).send(error.details[0].message);
    } else {
      const nurse = await nurseObj
        .updateNurseById(request.params.nurseId, request.body)
        .catch(() => {
          response.status(404).send("Requested id not found");
        });
      if (nurse === null) {
        response.status(400).send("No Nurse found with the given id");
      }
      response.json(nurse);
    }
  } catch (err) {
    response.status(500).send("Something went wrong, please try again..!!!");
  }
});

// ===========Delete Nurse By Id===========================
app.delete("/api/nurses/:nurseId", async (request, response) => {
  try {
    const nurse = await nurseObj
      .deleteNurseById(request.params.nurseId)
      .catch(() => {
        response.status(404).send("Requested id not found");
      });
    if (nurse === null) {
      response.status(400).send("No Nurse found with the given id");
    }
    response.json(nurse);
  } catch (err) {
    response.status(500).send("Something went wrong, please try again..!!!");
  }
});

module.exports = { app };
