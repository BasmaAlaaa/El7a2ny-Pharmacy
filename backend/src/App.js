// External variables
const express = require("express");
// const cors = require('cors');
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();
const router = require("../src/Routes/routes");
const cors = require("cors")
const MongoURI = process.env.MONGO_URI ;


const app = express();
app.use(cors());
// app.use(cors({
//   origin: '*',
// }));

app.use(express.json());
const port = process.env.PORT || "8000";

// configurations
// Mongo DB
mongoose.connect(MongoURI)
  .then(() => {
    console.log("MongoDB is now connected!")
    // Starting server
    app.listen(port, () => {
      console.log(`Listening to requests on http://localhost:${port}`);
    })
  })
  .catch(err => console.log(err));

app.get("/home", (req, res) => {
  res.status(200).send("You have everything installed!");
});

const {
  availableMedicinesDetailsByPatient, 
  login,
  logout
} = require('./Controllers/loginController');

app.post("/login",login);
app.get("/logout",logout);

app.use("/Admin", router);
app.use("/Guest", router);
app.use("/Patient", router);
app.use("/Pharmacist", router);

const{
  sendOTP,
  updatePassword,
  changePassword
} = require ('../src/Controllers/OtpController')

app.post('/ChangePassword/:Username',changePassword);
app.post('/OtpResetPassword',sendOTP);
app.get('/UpdatePassword',updatePassword);