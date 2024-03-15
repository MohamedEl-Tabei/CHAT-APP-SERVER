const express = require("express");
const router = express.Router();
const Controller  = require("../base/controller");
const Middleware = require("../base/middleware")
//delete
router.route("/deleteUsers").delete(Controller.User.deleteAllusers);
//post
router.route("/signup").post(Middleware.User.preSignup,Controller.User.signup);
router.route("/login").post(Controller.User.login);
router.route("/sendResetPasswordLink").post(Controller.User.sendResetPasswordLink);
//
router.route("/searchFriend").post(Middleware.User.verifyToken)
router.route("/searchNewFriend").post(Middleware.User.verifyToken,Controller.User.searchNewFriend)
router.route("/searchRequest").post(Middleware.User.verifyToken)
//put
router.route("/resetPassword").put(Middleware.User.verifyToken,Controller.User.resetPassword);
//get
router.route("/users").get(Controller.User.getAllUser);
router.route("/validToken").get(Middleware.User.verifyToken,Controller.User.validToken);
router.route("/loginByToken").get(Middleware.User.verifyToken,Controller.User.LoginByToken);
router.route("/:id").get(Controller.User.getUser);





module.exports=router
