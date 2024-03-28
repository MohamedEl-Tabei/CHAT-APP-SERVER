const Mongoose=require("mongoose");
const schema={
    text:String,
    sender:{type:Mongoose.Types.ObjectId,required:true},
    reciever:{type:Mongoose.Types.ObjectId,required:true}
}
const options={timestamps:true}
const Schema=new Mongoose.Schema(schema,options)



module.exports=Mongoose.model("message",Schema)