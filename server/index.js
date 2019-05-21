const express = require("express");
const db = require("./mongoDB-connection/dbConnection");
const app = express();
const cors = require("cors");
const patientRoute = require("./routes/patient");

app.use(cors());
app.use(express.json());

app.use(patientRoute.app);

// PORT
const port = process.env.PORT || 3001;

db.getDBConnection().then(() => {
  app.listen(port, () => {
    console.log(`server is running on port number ${port}...`);
  });
});
