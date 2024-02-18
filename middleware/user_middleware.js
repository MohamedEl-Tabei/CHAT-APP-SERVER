const Util = require("../base/util");

const preSignup = (req, res, nxt) => {
  try {
    let data = req.body;
    Util.Validator.Name(data.name);
    Util.Validator.Password(data.password)
    Util.Validator.Email(data.email)
    req.body.email=req.body.email.toLowerCase()
    nxt();
  } catch (error) {
    res.status(401).json(Util.Error.getErrorMessage(error));
  }
};

module.exports = { preSignup };