const Util = require("../base/util");
const Model = require("../base/model");
const verifyCode = async (req, res) => {
  try {
    let c = await Model.VerifyEmail.findOne({
      email: req.body.email.toLowerCase(),
    });
    let code = req.body.code;
    let validCode = await Util.Hashing.compare(code, c.code);
    await c.deleteOne();
    await res.status(200).json(validCode);
  } catch (error) {
    res.status(400).json(Util.Error.getErrorMessage(error));
  }
};
const sendCodeToVerifyEmail = async (req, res) => {
  try {
    const code = Math.random().toString().slice(2, 7);
    if (req.isExist) {
      Model.VerifyEmail.findOneAndUpdate(
        { email: req.body.email },
        { code: await Util.Hashing.hash(code) }
      );
    } else {
      const message = new Model.VerifyEmail({
        email: req.body.email,
        code: await Util.Hashing.hash(code),
      });
      await message.save();
    }
    await Util.SendEmail.code(req.body.email, code);
    await res.status(200).json("ok");
  } catch (error) {
    res.status(400).json(Util.Error.getErrorMessage(error));
  }
};
module.exports = { verifyCode, sendCodeToVerifyEmail };
