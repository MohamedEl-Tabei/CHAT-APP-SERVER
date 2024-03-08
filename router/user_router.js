const express = require("express");
const router = express.Router();
const Controller  = require("../base/controller");
const Middleware = require("../base/middleware")
router.route("/signup").post(Middleware.User.preSignup,Controller.User.signup);
router.route("/login").post(Controller.User.login);
router.route("/sendResetPasswordLink").post(Controller.User.sendResetPasswordLink);
router.route("/loginByToken").get(Middleware.User.verifyToken,Controller.User.LoginByToken);
router.route("/users").get(Controller.User.getAllUser);
router.route("/:id").get(Controller.User.getUser);

router.route("/deleteUsers").delete(Controller.User.deleteAllusers);





module.exports=router
