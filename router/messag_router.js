const express=require("express")
const Controller = require("../base/controller")
const Middleware=require("../base/middleware")
const router=express.Router()

router.route("/sendMessage").post(Controller.Message.sendNewMessage);

router.route("/getMessages").post(Middleware.User.verifyToken,Controller.Message.getMessages)


module.exports=router