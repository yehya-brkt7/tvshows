const Show = require("../models/showModel");
const User = require("../models/userModel");

const mongoose = require("mongoose");
//get all shows
const getShows = async (req, res) => {
  const usid = req.body;

  const shows = await Show.find(usid).sort({ createdAt: -1 });

  res.status(200).json(shows);
};

//post one show
const createShow = async (req, res) => {
  const { title, genres, rating, fanrating, id, usid, image } = req.body;

  //add to db
  try {
    const show = await Show.create({
      title,
      genres,
      rating,
      fanrating,
      id,
      usid,
      image,
    });
    res.status(200).json(show);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
  // res.json({ mssg: "Post a new show" });
};

//delete show
const deleteShow = async (req, res) => {
  const id = req.body.id;

  const usid = req.body.usid;
  try {
    const show = await Show.findOneAndDelete({
      $and: [
        {
          usid: usid,
        },
        {
          id: id,
        },
      ],
    });
    res.status(200).json(show);
    console.log(show);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateShow = async (req, res) => {
  //   const { id } = req.params;

  const usid = req.body.usid;
  const id = req.body.id;
  const fanrating = req.body.fanrating;

  try {
    const show = await Show.findOneAndUpdate(
      {
        $and: [
          {
            usid: usid,
          },
          {
            id: id,
          },
        ],
      },
      { $set: { fanrating: fanrating } }
    );

    res.status(200).json(show);
    console.log(show);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

module.exports = {
  createShow,
  getShows,
  deleteShow,
  updateShow,
};
