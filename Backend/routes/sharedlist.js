const express = require("express");

const { createList, getList } = require("../controllers/sharedlistController");

const router = express.Router();

//get a list by id
router.get("/:usid", getList);

//post one list
router.post("/", createList);

//update
// router.patch("/", (req, res) => {
//   res.json({ mssg: "update array" });
// });

module.exports = router;
