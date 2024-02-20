const express=require("express")
const router=express.Router()
const Controller=require("../base/controller")
const Middleware=require("../base/middleware")
router.route("/sendCode").post(Middleware.VerifyEmail.preSendCodeToVerifyEmail,Controller.VerifyEmail.sendCodeToVerifyEmail)

module.exports=router