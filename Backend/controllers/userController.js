const User = require("../models/userModel");
// const List = require("../models/userModel");
const mongoose = require("mongoose");

//post one show
const addUser = async (req, res) => {
  const { uid } = req.params.uid;

  //add to db
  try {
    const user = await User.create({ uid: uid });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
  // res.json({ mssg: "Post a new show" });
};

//get one user
const getUser = async (req, res) => {
  const { uid } = req.params.uid;

  try {
    const user = await User.find({ uid: uid });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

//get List of user

module.exports = {
  addUser,
  getUser,
};
