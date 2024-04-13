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
router.route("/searchFriend").post(Middleware.User.verifyToken,Controller.User.searchYourFriend)
router.route("/searchNewFriend").post(Middleware.User.verifyToken,Controller.User.searchNewFriend)
router.route("/searchRequest").post(Middleware.User.verifyToken,Controller.User.searchRequest)
router.route("/addToMostRecentlyUsedEmoji").post(Middleware.User.verifyToken,Controller.User.addToMostRecentlyUsedEmoji)
router.route("/getLastMessage").post(Middleware.User.verifyToken,Controller.User.getLastMessage)
router.route("/deleteMessageNotifications").post(Middleware.User.verifyToken,Controller.User.deleteMessageNotifications);

//put
router.route("/resetPassword").put(Middleware.User.verifyToken,Controller.User.resetPassword);

//get
router.route("/clearRequestNotifications").get(Middleware.User.verifyToken,Controller.User.clearRequestNotifications)
router.route("/users").get(Controller.User.getAllUser);
router.route("/validToken").get(Middleware.User.verifyToken,Controller.User.validToken);
router.route("/loginByToken").get(Middleware.User.verifyToken,Controller.User.LoginByToken);
router.route("/frends").get(Middleware.User.verifyToken,Controller.User.getAllFriends);
router.route("/requests").get(Middleware.User.verifyToken,Controller.User.getRequests);
router.route("/recentlyUsedEmoji").get(Middleware.User.verifyToken,Controller.User.getMostRecentlyUsedEmoji);
router.route("/MessageNotifications").get(Middleware.User.verifyToken,Controller.User.getMessageNotifications);


router.route("/:id").get(Middleware.User.verifyToken,Controller.User.getUser);





module.exports=router
