const express = require("express");
const patientObj = require("../module-controllers/patient");

const app = express.Router();

// =================Get All Patients======================
app.get("/api/patients", async (request, response) => {
  const patients = await patientObj.getPatients();
  response.json(patients);
});

//= =================Add New Patient=========================
app.post("/api/patients", async (request, response) => {
  const patients = await patientObj.getPatients();
  request.body.tokenId = patients[patients.length - 1].tokenId + 1;
  const { error } = patientObj.validatePatient(request.body); // result.error (object destructor)

  if (error) {
    response.status(400).send(error.details[0].message);
  } else {
      
    const newPatient = patientObj.addPatient(request.body);
    response.json(newPatient);
  }
});

//= =================Get Patient By Id========================
app.get("/api/patients/:patientId", async (request, response) => {
  const patient = await patientObj
    .getPatientById(request.params.patientId)
    .catch(() => {
      response.status(404).send("Requested id not found");
    });
  if (customer === null) {
    response.status(400).send("No Patient found with the given id");
  }
  response.json(patient);
});

// ========================Update patient By Id======================
app.put("/api/patients/:patientId", async (request, response) => {
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
});

// ===========Delete Patient By Id===========================
app.delete("/api/patients/:patientId", async (request, response) => {
  const patient = await patientObj
    .deletePatientById(request.params.patientId)
    .catch(() => {
      response.status(404).send("Requested id not found");
    });
  if (patient === null) {
    response.status(400).send("No Patient found with the given id");
  }
  response.json(patient);
});

module.exports = { app };
