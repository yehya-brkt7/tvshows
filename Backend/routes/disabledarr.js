const express = require("express");

const {
  addId,
  getArr,
  deleteId,
} = require("../controllers/disabledArrController");

const router = express.Router();

//get disabled array
router.get("/", getArr);

//add id to array
router.post("/", addId);

//delete id from array
router.delete("/", deleteId);

module.exports = router;
