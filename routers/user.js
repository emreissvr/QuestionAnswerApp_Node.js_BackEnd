const express = require("express");
const question = require("./question");
const { getSingleUser, getAllUsers } = require("../controllers/user.js");
const { checkUserExist } = require("../middlewares/database/databaseErrorHelpers");
const auth = require("./auth");


const router = express.Router();

// get all user
router.get("/",getAllUsers)
router.get("/:id",checkUserExist,getSingleUser) // express.js id'yi dinamik olarak almak için :id yazılır.


module.exports = router;