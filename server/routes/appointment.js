const express = require("express");
const appointmentObj = require("../module-controllers/appointment");

const app = express.Router();

// =================Get All Appointments======================
app.get("/api/appointments", async (request, response) => {
  try {
    const appointments = await appointmentObj.getAppointments();
    console.log("sds");
    if (appointments.length > 0) response.json(appointments);
    response.status(404).send("no appointment found");
  } catch (err) {
    response.status(500).send("Something went wrong, please try again..!!!");
  }
});

//= =================Add New Appointment=========================
app.post("/api/appointments", (request, response) => {
  try {
    console.log(request.body);
    const { error } = appointmentObj.validateAppointment(request.body); // result.error (object destructor)
    console.log(error);
    if (error) {
       response.status(400).send(error.details[0].message);
     } else {
      const newAppointment = appointmentObj.addAppointment(request.body);
      response.json(newAppointment);
    }
  } catch (err) {
    response.status(500).send("Something went wrong, please try again..!!!");
  }
});

//= =================Get Appointment By Id========================
app.get("/api/appointments/:appointmentId", async (request, response) => {
  try {
    const appointment = await appointmentObj
      .getAppointmentById(request.params.appointmentId)
      .catch(() => {
        response.status(404).send("Requested id not found");
      });
    if (appointment === null) {
      response.status(400).send("No Appointment found with the given id");
    }
    response.json(appointment);
  } catch (err) {
    response.status(500).send("Something went wrong, please try again..!!!");
  }
});

// ========================Update Appointment By Id======================
app.put("/api/appointments/:appointmentId", async (request, response) => {
  try {
    const { error } = appointmentObj.validateAppointment(request.body); // result.error (object destructor)
    if (error) {
      response.status(400).send(error.details[0].message);
    } else {
      const appointment = await appointmentObj
        .updateAppointmentById(request.params.appointmentId, request.body)
        .catch(() => {
          response.status(404).send("Requested id not found");
        });
      if (appointment === null) {
        response.status(400).send("No Appointment found with the given id");
      }
      response.json(appointment);
    }
  } catch (err) {
    response.status(500).send("Something went wrong, please try again..!!!");
  }
});

// ===========Delete Appointment By Id===========================
app.delete("/api/appointments/:appointmentId", async (request, response) => {
  try {
    const appointment = await appointmentObj
      .deleteAppointmentById(request.params.appointmentId)
      .then(() => { response.status(204).send("deleted successfully") })
      .catch(() => {
        response.status(404).send("Requested id not found");
      });
    if (appointment === null) {
      response.status(400).send("No Appointment found with the given id");
    }
    response.json(appointment);
  } catch (err) {
    response.status(500).send("Something went wrong, please try again..!!!");
  }
});

module.exports = { app };
