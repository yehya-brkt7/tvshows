const List = require("../models/sharedlistModel");

const mongoose = require("mongoose");
//get all shows
const getList = async (req, res) => {
  const usid = req.params.usid;

  try {
    const lists = await List.find({ usid: usid }).sort({ createdAt: -1 });

    res.status(200).json(lists);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

//post one show
const createList = async (req, res) => {
  const { username, usid, list } = req.body;

  //add to db
  try {
    const list = await List.create({
      username,
      usid,
      list,
    });
    res.status(200).json(list);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

module.exports = {
  createList,
  getList,
};
