const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const schema = {
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String, default: "https://i.ibb.co/QrJDDVt/salah.png" },
  friends:{type:[mongoose.SchemaTypes.ObjectId],default:[]},
  requestToYou:{type:[mongoose.SchemaTypes.ObjectId],default:[]},
  requestFromYou:{type:[mongoose.SchemaTypes.ObjectId],default:[]},
  socketId:{type:String,default:""},
  requestNotifications:{type:[mongoose.SchemaTypes.ObjectId],default:[]},
  messageNotifications:{type:[mongoose.SchemaTypes.ObjectId],default:[]},
};
const options = {
  timestamps: true,
};
const User = new mongoose.Schema(schema, options);
User.method("createJWTLogin", async function (rememberMe) {
  let options = { expiresIn: rememberMe ? "10 days" : "1 days" };
  let token = await jwt.sign({ id: this.id }, process.env.PRIVATEKEY, options);
  return token;
});
User.method("createJWT", async function (options) {
  let token = await jwt.sign({ id: this.id }, process.env.PRIVATEKEY, options);
  return token;
});
User.static("verifyJWT", async function (token) {
  let data = await jwt.verify(token, process.env.PRIVATEKEY);
  return data;
});
module.exports = mongoose.model("User", User);
