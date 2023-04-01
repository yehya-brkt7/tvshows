const express = require("express");

const {
  addUser,
  getUser,
  updateList,
} = require("../controllers/userController");

const router = express.Router();

//post one user
router.post("/", addUser);

//get one user
router.get("/:uid", getUser);

//update user list
router.put("/:uid", updateList);

module.exports = router;
