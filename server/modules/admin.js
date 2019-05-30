const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    name: { type: String },
    userName: { type: String },
    password: { type: String },
    userType: { type: String, default: "admin" }
  }
);
const Admin = mongoose.model("admin", adminSchema);

module.exports = {
    Admin
};
