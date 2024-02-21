const express = require("express");
const router = express.Router();
const Controller  = require("../base/controller");
const Middleware = require("../base/middleware")
router.route("/signup").post(Middleware.User.preSignup,Controller.User.signup);
router.route("/login").post(Controller.User.login);
router.route("/users").get(Controller.User.getAllUser);
router.route("/:id").get(Controller.User.getUser);




module.exports=router
