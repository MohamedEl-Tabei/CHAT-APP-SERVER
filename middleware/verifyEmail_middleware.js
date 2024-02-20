const Util = require("../base/util");
const Model = require("../base/model");
const preSendCodeToVerifyEmail = async (req, res, nxt) => {
  try {
    Util.Validator.Email(req.body.email);
    req.body.email = req.body.email.toLowerCase();
    let user = await Model.User.findOne({ email: req.body.email });
    if (user) {
      throw new Error(`${req.body.email} already has an account.`);
    }
    await nxt();
  } catch (error) {
    res.status(401).json(Util.Error.getErrorMessage(error));
  }
};
module.exports = { preSendCodeToVerifyEmail };
