const express = require("express");
const {register,getUser, login, logout, imageUpload, forgotPassword, resetPassword, editDetails} = require("../controllers/auth");
const profileImageUpload = require("../middlewares/libraries/profileImageUpload")
const { getAccessToRoute} = require("../middlewares/authorization/auth")

const router = express.Router();

// register
router.post("/register", register);
// login
router.post("/login", login);
// upload
router.post("/upload",[getAccessToRoute,profileImageUpload.single("profile_image")],imageUpload);
// forgot password
router.post("/forgotpassword",forgotPassword);
// profile
router.get("/profile",getAccessToRoute, getUser);
// logout
router.get("/logout",getAccessToRoute, logout);
// reset password
router.put("/resetpassword", resetPassword);
// edit details
router.put("/edit",getAccessToRoute, editDetails);


module.exports = router;