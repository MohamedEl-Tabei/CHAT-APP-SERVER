const mongoose=require("mongoose")
const schema={
    code:{type:String,required:"Code is required."},
    email:{type:String,unique:true}
}
const VerifyEmail= new mongoose.Schema(schema)



module.exports=mongoose.model("Verify Email",VerifyEmail)