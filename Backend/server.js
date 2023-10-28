require("dotenv").config();

const express = require("express");
const showRoutes = require("./routes/shows");
const disabledRoutes = require("./routes/disabledarr");
const userRoutes = require("./routes/user");

const mongoose = require("mongoose");

//express app
const showsapp = express();

//Cors
var cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

showsapp.use(cors(corsOptions));

//middleware
showsapp.use(express.json());

showsapp.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Credentials", "true");

  next();
});

//routes
showsapp.use("/apis/shows", showRoutes);
showsapp.use("/apis/disabledarr", disabledRoutes);
showsapp.use("/apis/user", userRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    showsapp.listen(process.env.PORT, () => {
      console.log("connected to db", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
