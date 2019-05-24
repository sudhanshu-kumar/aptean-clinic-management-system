const express = require("express");
var bcrypt = require("bcrypt");
const doctorObj = require("../module-controllers/doctor");
const BCRYPT_SALT_ROUNDS = 10;

const app = express.Router();

// =================Get All Doctors======================
app.get("/api/doctors", async (request, response) => {
  try {
    const doctors = await doctorObj.getDoctors();
    console.log("sds");
    if (doctors.length > 0) response.json(doctors);
    response.status(404).send("no doctor found");
  } catch (err) {
    response.status(500).send("Something went wrong, please try again..!!!");
  }
});

//= =================Add New Doctor=========================
app.post("/api/doctors", async (request, response) => {
  try {
    const { error } = doctorObj.validateDoctor(request.body); // result.error (object destructor)
    console.log(error);
    if (error) {
      response.status(400).send(error.details[0].message);
    } else {
      request.body.password = await bcrypt.hash(
        request.body.password,
        BCRYPT_SALT_ROUNDS
      );
      const newDoctor = doctorObj.addDoctor(request.body);
      response.json(newDoctor);
    }
  } catch (err) {
    response.status(500).send("Something went wrong, please try again..!!!");
  }
});

//=====================Login Doctor===========================
app.post("/api/doctors/login", async (request, response) => {
  try {
    const doctor = await doctorObj.getDoctorByUserName(request.body.userName);
    if (doctor === null)
      response.status(400).send("No Doctor found with the given UserName");
    const samePassword = await bcrypt.compare(
      request.body.password,
      doctor.password
    );
    if (!samePassword) response.status(403).send("password incorrect");
    response.json(doctor);
  } catch (err) {
    response.status(500).send("Something went wrong, please try again..!!!");
  }
});

//= =================Get Doctor By Id========================
app.get("/api/doctors/:doctorId", async (request, response) => {
  try {
    const doctor = await doctorObj
      .getDoctorById(request.params.doctorId)
      .catch(() => {
        response.status(404).send("Requested id not found");
      });
    if (doctor === null) {
      response.status(400).send("No Doctor found with the given id");
    }
    response.json(doctor);
  } catch (err) {
    response.status(500).send("Something went wrong, please try again..!!!");
  }
});

// ========================Update Doctor By Id======================
app.put("/api/doctors/:doctorId", async (request, response) => {
  try {
    const { error } = doctorObj.validateDoctor(request.body); // result.error (object destructor)
    if (error) {
      response.status(400).send(error.details[0].message);
    } else {
      const doctor = await doctorObj
        .updateDoctorById(request.params.doctorId, request.body)
        .catch(() => {
          response.status(404).send("Requested id not found");
        });
      if (doctor === null) {
        response.status(400).send("No Doctor found with the given id");
      }
      response.json(doctor);
    }
  } catch (err) {
    response.status(500).send("Something went wrong, please try again..!!!");
  }
});

// ===========Delete Doctor By Id===========================
app.delete("/api/doctors/:doctorId", async (request, response) => {
  try {
    const doctor = await doctorObj
      .deleteDoctorById(request.params.doctorId)
      .catch(() => {
        response.status(404).send("Requested id not found");
      });
    if (doctor === null) {
      response.status(400).send("No Doctor found with the given id");
    }
    response.json(doctor);
  } catch (err) {
    response.status(500).send("Something went wrong, please try again..!!!");
  }
});

module.exports = { app };
