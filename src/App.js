// External variables
const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();
const routes = require("./Routes/routes"); 
const MongoURI = process.env.MONGO_URI ;


const app = express();
app.use(express.json()); 
const port = process.env.PORT || "8000";

// configurations
// Mongo DB
mongoose.connect(MongoURI)
.then(()=>{
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


app.use("/Admin", routes);
app.use("/Guest",routes);
app.use("/Patient", routes);
app.use("/Pharmacist", routes);


