const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/user.js");
const router = express.Router();
const flash=require("connect-flash");
const passport=require("passport");
const {savedin}=require("../middleware.js");
const usercontroller=require("../controllers/user.js");
router
 .route("/signup")
 .get(usercontroller.userk)
 .post(usercontroller.userdash);
router
  .route("/login")
  .get(usercontroller.userredirect)
  .post(savedin,passport.authenticate("local",{failureRedirect:"/login",failureFlash: true}),usercontroller.userpostlogin);

router.get("/logout",usercontroller.userlogout
);
module.exports = router;