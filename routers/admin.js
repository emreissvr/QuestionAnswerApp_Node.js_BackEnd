const express = require("express");
const {getAccessToRoute, getAdminAccess} = require("../middlewares/authorization/auth");
const { route } = require("./question");
const { blockUser, deleteUser } = require("../controllers/admin");
const { checkUserExist } = require("../middlewares/database/databaseErrorHelpers");



const router = express.Router();

router.use([getAccessToRoute,getAdminAccess]); // iki middleware ard arda çalışacak ve tüm route'larda geçerli olacak
 
// user'ın olup olmadığını kontrol etmek için yazdığım middleware'i burada da kullandım. Bu middleware tüm route'larda geçerli olacak
router.get("/block/:id",checkUserExist, blockUser);

router.delete("/user/:id",checkUserExist,deleteUser);


module.exports = router;
