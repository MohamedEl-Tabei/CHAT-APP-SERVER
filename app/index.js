const express=require("express")
const cors=require("cors")
const app=express()
const Router=require("../base/router")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api/user",Router.User)
app.use("/api/message",Router.Message)
app.use("/api/verifyEmail",Router.VerifyEmail)



module.exports=app