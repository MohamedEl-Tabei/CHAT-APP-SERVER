const Util = require("../base/util");
const Model=require ("../base/model")
const preSignup =async (req, res, nxt) => {
  try {
    let data = req.body;
    Util.Validator.Name(data.name);
    Util.Validator.Password(data.password)
    Util.Validator.Email(data.email)
    req.body.email=req.body.email.toLowerCase()
    await nxt();
  } catch (error) {
    res.status(401).json(Util.Error.getErrorMessage(error));
  }
};
const verifyToken=async (req,res,nxt)=>{
  try {
    let data= await Model.User.verifyJWT(req.headers["x-auth-token"])
    req.id=await data.id
    await nxt();
  } catch (error) {
    res.status(401).json(Util.Error.getErrorMessage(error));
  }
}
module.exports = { preSignup,verifyToken };
