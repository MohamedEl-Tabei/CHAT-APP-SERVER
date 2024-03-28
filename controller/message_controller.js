const mongoose = require("mongoose");
const Model = require("../base/model");
const Util = require("../base/util");
const sendNewMessage = async (req, res) => {
  try {
    const newMessage = new Model.Message({ ...req.body });
    await newMessage.save();
    res.status(200).json("message has been sent");
  } catch (error) {
    res.status(400).json(Util.Error.getErrorMessage(error));
  }
};
const getMessages = async (req, res) => {
  try {
    const user = await Model.User.findById(req.id);
    const connectWithId = req.body.id;
    const messagesToYou = await Model.Message.find({
      sender:  connectWithId,
      reciever: user.id ,
    });
    const messagesFromYou = await Model.Message.find({
        sender:  user.id,
        reciever: connectWithId ,
      });
      const messages= [...await messagesFromYou,...await messagesToYou].sort((x,y)=>x.createdAt-y.createdAt);
    await res.status(200).json(messages);
  } catch (error) {
    res.status(400).json(Util.Error.getErrorMessage(error));
  }
};

const controller = { sendNewMessage ,getMessages};

module.exports = controller;
