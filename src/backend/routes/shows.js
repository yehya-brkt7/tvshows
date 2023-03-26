const express = require("express");

const {
  createShow,
  getShows,
  deleteShow,
  updateShow,
} = require("../controllers/showController");

const router = express.Router();

//get all shows
router.get("/", getShows);

//post one show
router.post("/", createShow);

//delete show
router.delete("/", deleteShow);

//update show
router.put("/", updateShow);

//update
// router.patch("/", (req, res) => {
//   res.json({ mssg: "update array" });
// });

module.exports = router;
