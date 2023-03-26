const User = require("../models/userModel");
const mongoose = require("mongoose");

//post one show
const addUser = async (req, res) => {
  const { uid } = req.body;

  //add to db
  try {
    const user = await User.create({ uid });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
  // res.json({ mssg: "Post a new show" });
};

//get one user
const getUser = async (req, res) => {
  const { uid } = req.body;

  try {
    const user = await User.findOne({ uid: uid });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

module.exports = {
  addUser,
  getUser,
};
