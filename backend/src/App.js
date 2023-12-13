// External variables
const express = require("express");
// const cors = require('cors');
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();
const router = require("../src/Routes/routes");
const cors = require("cors")
const MongoURI = "mongodb+srv://samaelharras:samaelharras123@aclcluster.hmtxznh.mongodb.net/";


const app = express();
app.use(cors({
  origin: "*",
  credentials: true,
}));


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
  refresh,
  verify, 
  login,
  logout
} = require('./Controllers/loginController');

app.post("/refresh",refresh);
app.post("/login",login);
app.post("/logout/:username",verify, logout);


app.use("/Admin", router);
app.use("/Guest", router);
app.use("/Patient", router);
app.use("/Pharmacist", router);

app.use('/DoctorFromTheClinic', router)

const{
  sendOTP,
  updatePassword,
  changePassword
} = require ('../src/Controllers/OtpController')

app.post('/OtpResetPassword',sendOTP);
app.post('/UpdatePassword',updatePassword); // forgot password
app.put('/ChangePassword/:username',changePassword);