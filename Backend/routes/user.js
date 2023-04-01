const express = require("express");

const { addUser, getUser } = require("../controllers/userController");

const router = express.Router();

//post one user
router.post("/", addUser);

//get one user
router.get("/uid", getUser);

module.exports = router;
