const Disabledarr = require("../models/disabledArrModel");

//get disabledId
const getArr = async (req, res) => {
  const usid = req.body;

  const arr = await Disabledarr.find(usid).sort({ createdAt: -1 });

  res.status(200).json(arr);
};

//post id to disabledarr
const addId = async (req, res) => {
  const { id, usid } = req.body;

  try {
    const darr = await Disabledarr.create({ id, usid });
    res.status(200).json(darr);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

//delete id from database
const deleteId = async (req, res) => {
  const id = req.body.id;

  const usid = req.body.usid;

  try {
    const darr = await Disabledarr.findOneAndDelete({
      $and: [
        {
          usid: usid,
        },
        {
          id: id,
        },
      ],
    });

    res.status(200).json(darr);

    console.log(darr);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

module.exports = {
  addId,
  getArr,
  deleteId,
};
