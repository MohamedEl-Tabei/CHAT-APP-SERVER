const Util = require("../base/util");
const verifyCode = async (req, res) => {
  try {
    res.status(200).json();
  } catch (error) {
    res.status(400).json(Util.Error.getErrorMessage(error));
  }
};
const sendCodeToVerifyEmail = async (req, res) => {
  try {
    await Util.SendEmail.code(req.body.email, 123);
    res.status(200).json("ok");
  } catch (error) {
    res.status(400).json(Util.Error.getErrorMessage(error));
  }
};
module.exports = { verifyCode, sendCodeToVerifyEmail };
