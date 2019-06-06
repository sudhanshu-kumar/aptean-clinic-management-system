const express = require("express");
const db = require("./mongoDB-connection/dbConnection");
const app = express();
const cors = require("cors");
const patientRoute = require("./routes/patient");
const doctorRoute = require("./routes/doctor");
const nurseRoute = require("./routes/nurse");
const appointmentRoute = require("./routes/appointment");
const visitRoute = require("./routes/visit");
const invoiceRoute = require("./routes/invoice");
const paymentRoute = require("./routes/payment");
const adminRoute = require("./routes/admin");
const loginRoute = require("./routes/login");

app.use(cors());
app.use(express.json());

app.use(patientRoute.app);
app.use(doctorRoute.app);
app.use(nurseRoute.app);
app.use(appointmentRoute.app);
app.use(visitRoute.app);
app.use(invoiceRoute.app);
app.use(paymentRoute.app);
app.use(adminRoute.app);
app.use(loginRoute.app);

// PORT
const port = process.env.PORT || 3001;

db.getDBConnection().then(() => {
  app.listen(port, () => {
    console.log(`server is running on port number ${port}...`);
  });
});
