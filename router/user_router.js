const express = require("express");
const router = express.Router();
const Controller  = require("../base/controller");
const Middleware = require("../base/middleware")
router.route("/signup").post(Middleware.User.preSignup,Controller.User.signup);




module.exports=router
