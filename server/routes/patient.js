const express = require("express");
const patientObj = require("../module-controllers/patient");

const app = express.Router();

// =================Get All Patients======================
app.get("/api/patients", async (request, response) => {
  try {
    const patients = await patientObj.getPatients();
    console.log("sds");
    if (patients.length > 0) response.json(patients);
    response.status(404).send("no patient found");
  } catch (err) {
    response.status(500).send("Something went wrong, please try again..!!!");
  }
});

//= =================Add New Patient=========================
app.post("/api/patients", async (request, response) => {
  try {
    const { error } = patientObj.validatePatient(request.body); // result.error (object destructor)
    console.log(error);
    if (error) {
      response.status(400).send(error.details[0].message);
    } else {
      const patients = await patientObj.getPatients();
      if (patients.length < 1) request.body.tokenId = 101;
      else request.body.tokenId = patients[patients.length - 1].tokenId + 1;
      const newPatient = patientObj.addPatient(request.body);
      response.json(newPatient);
    }
  } catch (err) {
    response.status(500).send("Something went wrong, please try again..!!!");
  }
});

//= =================Get Patient By Id========================
app.get("/api/patients/:patientId", async (request, response) => {
  try {
    const patient = await patientObj
      .getPatientById(request.params.patientId)
      .catch(() => {
        response.status(404).send("Requested id not found");
      });
    if (patient === null) {
      response.status(400).send("No Patient found with the given id");
    }
    response.json(patient);
  } catch (err) {
    response.status(500).send("Something went wrong, please try again..!!!");
  }
});

// ========================Update patient By Id======================
app.put("/api/patients/:patientId", async (request, response) => {
  try {
    const { error } = patientObj.validatePatient(request.body); // result.error (object destructor)
    if (error) {
      response.status(400).send(error.details[0].message);
    } else {
      const patient = await patientObj
        .updatePatientById(request.params.patientId, request.body)
        .catch(() => {
          response.status(404).send("Requested id not found");
        });
      if (patient === null) {
        response.status(400).send("No Patient found with the given id");
      }
      response.json(patient);
    }
  } catch (err) {
    response.status(500).send("Something went wrong, please try again..!!!");
  }
});

// ===========Delete Patient By Id===========================
app.delete("/api/patients/:patientId", async (request, response) => {
  try {
    const patient = await patientObj
      .deletePatientById(request.params.patientId)
      .catch(() => {
        response.status(404).send("Requested id not found");
      });
    if (patient === null) {
      response.status(400).send("No Patient found with the given id");
    }
    response.json(patient);
  } catch (err) {
    response.status(500).send("Something went wrong, please try again..!!!");
  }
});

module.exports = { app };
