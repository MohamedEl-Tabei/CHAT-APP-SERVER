const Model = require("../base/model");
const Util = require("../base/util");
const signup = async (req, res) => {
  try {
    let rememberMe = req.body.rememberMe;
    let newUser = new Model.User(req.body);
    let token = await newUser.createJWT(rememberMe);
    newUser.password=await Util.Hashing.hash(newUser.password)
    await newUser.save();
    res.status(201).json({ ...newUser._doc, token });
  } catch (error) {
    res.status(400).json(Util.Error.getErrorMessage(error));
  }
};


module.exports = { signup };
