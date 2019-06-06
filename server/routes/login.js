const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const adminObj = require("../module-controllers/admin");
const doctorObj = require("../module-controllers/doctor");
const patientObj = require("../module-controllers/patient");
const nurseObj = require("../module-controllers/nurse");


const app = express.Router();

//=====================Login===========================
app.post("/api/login", async (request, response) => {
  try {
    const patient = await patientObj.getPatientByUserName(request.body.userName);
    if (patient === null) {
      const doctor = await doctorObj.getDoctorByUserName(request.body.userName);
      if (doctor === null) {
        const nurse = await nurseObj.getNurseByUserName(request.body.userName);
        if (nurse === null) {
          const admin = await adminObj.getAdminByUserName(request.body.userName);
          if (admin === null) {
            response.status(404).send("no user found");
          } else {
            const samePassword = await bcrypt.compare(
              request.body.password,
              admin.password
            );
            if (!samePassword) response.status(403).send("password incorrect");
            jwt.sign({adminId: admin._id}, 'key', (err, token) => {
              response.json({
                token,
                user: admin
              });
            });
            //response.json(admin);
          }
        } else {
          const samePassword = await bcrypt.compare(
            request.body.password,
            nurse.password
          );
          if (!samePassword) response.status(403).send("password incorrect");
          jwt.sign({nurseId: nurse._id}, 'key', (err, token) => {
            response.json({
              token,
              user: nurse
            });
          });
          //response.json(nurse);
        }
      } else {
        const samePassword = await bcrypt.compare(
          request.body.password,
          doctor.password
        );
        if (!samePassword) response.status(403).send("password incorrect");
        response.json(doctor);
      }
    } else {
      const samePassword = await bcrypt.compare(
        request.body.password,
        patient.password
      );
      if (!samePassword) response.status(403).send("password incorrect");
      response.json(patient);
    }
  } catch (err) {
    response.status(500).send("Something went wrong, please try again..!!!");
  }
});

module.exports = { app };
