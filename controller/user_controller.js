const Model = require("../base/model");
const Util = require("../base/util");
const signup = async (req, res) => {
  try {
    let rememberMe = req.body.rememberMe;
    let newUser = new Model.User(req.body);
    let token = await newUser.createJWT(rememberMe);
    newUser.password = await Util.Hashing.hash(newUser.password);
    await newUser.save();
    res.status(201).json({
      image: newUser.image,
      id: newUser.id,
      createdAt: newUser.createdAt,
      token,
    });
  } catch (error) {
    res.status(400).json(Util.Error.getErrorMessage(error));
  }
};
const login = async (req, res) => {
  try {
    const user = req.body;
    const dbUser = await Model.User.findOne({
      email: user.email.toLowerCase(),
    });
    let valid = true;
    if (dbUser) {
      if (await Util.Hashing.compare(user.password, dbUser.password)) {
        let token = await dbUser.createJWT(user.rememberMe);
        res.status(200).json({ ...dbUser._doc, password: undefined, token });
      } else valid = false;
    } else valid = false;
    if (!valid) throw new Error("Invalid email or password.");
  } catch (error) {
    res.status(401).json(Util.Error.getErrorMessage(error));
  }
};
const getAllUser = async (req, res) => {
  try {
    let users = await Model.User.find({}, "name image");
    res.status(200).json(users);
  } catch (error) {
    res.status(401).json(Util.Error.getErrorMessage(error));
  }
};
const getUser = async (req, res) => {
  try {
    let user = await Model.User.findById(req.params.id, "name image friends");
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json(Util.Error.getErrorMessage(error));
  }
};
const deleteAllusers=async (req,res)=>{
  try {
    await Model.User.deleteMany();
    res.status(200).json("Done")
  } catch (error) {
    res.status(400).json(Util.Error.getErrorMessage(error));
  }
}
module.exports = { signup, login, getAllUser, getUser,deleteAllusers };
