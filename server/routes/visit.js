const express = require("express");
const visitObj = require("../module-controllers/visit");
const doctorObj = require("../module-controllers/doctor");
const patientObj = require("../module-controllers/patient");
const nurseObj = require("../module-controllers/nurse");
const appointmentObj = require("../module-controllers/appointment");

const app = express.Router();

// =================Get All Visits======================
app.get("/api/visits", async (request, response) => {
  try {
    const visits = await visitObj.getVisits();
    if (visits.length > 0) response.json(visits);
    response.status(404).send("no visit found");
  } catch (err) {
    response.status(500).send("Something went wrong, please try again..!!!");
  }
});

//= =================Add New Visit=========================
app.post("/api/visits", async (request, response) => {
  try {
    //console.log(request.body);
    if (request.body.appointment) {
      const patient = await patientObj.getPatientByUserName(
        request.body.appointment
      );

      if (patient === null) {
        response.status(404).send("no patient found with given username");
      } else {
        const appointment = await appointmentObj.getAppointmentByPatient(
          patient._id.toString()
        );

        if (appointment.length === 0) {
          response.status(404).send("no appointment found with given patient");
        } else {
          request.body.appointment = appointment[0]._id.toString();
          console.log(typeof request.body.appointment);
        }
      }
    }
    if (request.body.patient) {
      const patient = await patientObj.getPatientByUserName(
        request.body.patient
      );
      if (patient === null) {
        response.status(404).send("no patient found with given username");
      } else {
        request.body.patient = patient._id.toString();
      }
    }
    const doctor = await doctorObj.getDoctorByUserName(
      request.body.diagnosedBy
    );
    console.log(doctor);
    if (doctor === null) {
      response.status(404).send("No doctor found with the given username");
    } else {
      const nurse = await nurseObj.getNurseByUserName(request.body.nursedBy);
      if (nurse === null) {
        response.status(404).send("No Nurse found with the given username");
      } else {
        request.body.diagnosedBy = doctor._id.toString();
        request.body.nursedBy = nurse._id.toString();
        console.log(request.body);
        const { error } = visitObj.validateVisit(request.body); // result.error (object destructor)
        console.log(error);
        if (error) {
          response.status(400).send(error.details[0].message);
        }
        const newVisit = visitObj.addVisit(request.body);
        response.json(newVisit);
      }
    }
  } catch (err) {
    response.status(500).send("Something went wrong, please try again..!!!");
  }
});

//= =================Get Visit By Id========================
app.get("/api/visits/:visitId", async (request, response) => {
  try {
    const visit = await visitObj
      .getVisitById(request.params.visitId)
      .catch(() => {
        response.status(404).send("Requested id not found");
      });
    if (visit === null) {
      response.status(400).send("No Visit found with the given id");
    }
    response.json(visit);
  } catch (err) {
    response.status(500).send("Something went wrong, please try again..!!!");
  }
});

//= =================Get Visit By Patient========================
app.get("/api/visits/patient/:patient", async (request, response) => {
  try {
    const visit = await visitObj
      .getVisitByPatient(request.params.patient)
      .catch(() => {
        response.status(404).send("Requested id not found");
      });
    if (visit === null) {
      response.status(400).send("No Visit found with the given Patient");
    }
    response.json(visit);
  } catch (err) {
    response.status(500).send("Something went wrong, please try again..!!!");
  }
});

// ========================Update Visit By Id======================
app.put("/api/visits/:visitId", async (request, response) => {
  try {
    const doctor = await doctorObj.getDoctorByUserName(request.body.doctor);
    const patient = await patientObj.getPatientByUserName(request.body.patient);
    const nurse = await nurseObj.getNurseByUserName(request.body.createdBy);
    if (doctor === null) {
      response.status(400).send("No Doctor found with the given username");
    } else if (patient === null) {
      response.status(400).send("No Patient found with the given username");
    } else if (nurse === null) {
      response.status(400).send("No Nurse found with the given username");
    } else {
      request.body.doctor = doctor._id.toString();
      request.body.patient = patient._id.toString();
      request.body.createdBy = nurse._id.toString();
      console.log(request.body);
      const { error } = visitObj.validateVisit(request.body); // result.error (object destructor)
      if (error) {
        response.status(400).send(error.details[0].message);
      } else {
        const visit = await visitObj
          .updateVisitById(request.params.visitId, request.body)
          .catch(() => {
            response.status(404).send("Requested id not found");
          });
        if (visit === null) {
          response.status(400).send("No Visit found with the given id");
        }
        response.json(visit);
      }
    }
  } catch (err) {
    response.status(500).send("Something went wrong, please try again..!!!");
  }
});

// ===========Delete Visit By Id===========================
app.delete("/api/visits/:visitId", async (request, response) => {
  try {
    const visit = await visitObj
      .deleteVisitById(request.params.visitId)
      .then(() => {
        response.status(204).send("deleted successfully");
      })
      .catch(() => {
        response.status(404).send("Requested id not found");
      });
    if (visit === null) {
      response.status(400).send("No Visit found with the given id");
    }
    response.json(visit);
  } catch (err) {
    response.status(500).send("Something went wrong, please try again..!!!");
  }
});

module.exports = { app };
