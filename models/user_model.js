const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const schema = {
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String, default: "https://i.ibb.co/QrJDDVt/salah.png" },
};
const options = {
  timestamps: true,
};
const User = new mongoose.Schema(schema, options);
User.method("createJWT", async function (rememberMe) {
  let options = { expiresIn: rememberMe ? "10 days" : "1 days" };
  let token = await jwt.sign({ id: this.id }, process.env.PRIVATEKEY, options);
  return token;
});
User.static("verifyJWT", async function (token) {
  let data = await jwt.verify(token, process.env.PRIVATEKEY);
  return data;
});
module.exports = mongoose.model("User", User);
