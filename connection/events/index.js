const Util = require("../../base/util");
const Model = require("../../base/model");
const onError = (error) => {
  return Util.Error.getErrorMessage(error);
};
const cancelRequest = async (io, receiverId, senderId) => {
  try {
    const receiver = await Model.User.findById(receiverId);
    const sender = await Model.User.findById(senderId);
    let toYou = Util.Arry.deleteOneFromArray(
      await sender.id,
      await receiver.requestToYou
    );
    let fromYou = Util.Arry.deleteOneFromArray(
      await receiver.id,
      await sender.requestFromYou
    );
    await receiver.updateOne({ requestToYou: toYou });
    await sender.updateOne({ requestFromYou: fromYou });
    await io
      .to(await receiver.socketId)
      .emit("cancelRequestToYou", await sender.id);
  } catch (error) {
    io.emit("error", onError(error));
  }
};
const acceptRequest = async (io, receiverId, senderId) => {
  try {
    const sender = await Model.User.findById(senderId);
    const receiver = await Model.User.findById(receiverId);
    await receiver.updateOne({
      friends: Util.Arry.pushOneToArray(sender._id, receiver.friends),
      requestFromYou: Util.Arry.deleteOneFromArray(
        sender._id,
        receiver.requestFromYou
      ),
    });
    await sender.updateOne({
      friends: Util.Arry.pushOneToArray(receiver._id, sender.friends),
      requestToYou: Util.Arry.deleteOneFromArray(
        receiver._id,
        sender.requestToYou
      ),
    });
    await io.to(receiver.socketId).emit("requestAccepted", sender._id);
  } catch (error) {
    console.log(error);
  }
};
const refuseRequest = async (io, receiverId, senderId) => {
  let sender = await Model.User.findById(senderId);
  let receiver = await Model.User.findById(receiverId);
  await sender.updateOne({
    requestToYou: Util.Arry.deleteOneFromArray(
      receiver._id,
      sender.requestToYou
    ),
  });
  await receiver.updateOne({
    requestFromYou: Util.Arry.deleteOneFromArray(
      sender._id,
      receiver.requestFromYou
    ),
  });
  io.to(await receiver.socketId).emit("requestRefused", await sender._id);
};
const sendMessage = async (io, receiverId, senderId, text) => {
  let receiver = await Model.User.findById(receiverId);
  let sender = await Model.User.findById(senderId);
  let newMessage = new Model.Message({
    text,
    sender: senderId,
    reciever: receiverId,
  });
  await receiver.updateOne({
    messageNotifications: Util.Arry.pushOneToArray(
      sender._id,
      receiver.messageNotifications
    ),
  });

  await newMessage.save();
  io.to(await receiver.socketId).emit(
    "receiveMessage",
    await newMessage,
    senderId
  );
  io.to(await sender.socketId).emit("getMessage", await newMessage);
};
const seeMessage = async (io, receiverId, senderId) => {
  try{
  //send event->sender who see message
  //recieve event -> reciever whose message seen
  let receiver = await Model.User.findById(receiverId);
  let sender = await Model.User.findById(senderId);

  let messages = await Model.Message.find({ reciever: sender._id,sender:receiver._id });
  await messages.forEach(async (message) => {
    await message.updateOne({ isSeen: true });
  });
  //send event->sender who send message to you
  //recieve event -> reciever is you
  const messagesToYou = await Model.Message.find({
    sender: sender._id ,
    reciever: receiver._id,
  });
  const messagesFromYou = await Model.Message.find({
    sender: receiver._id,
    reciever: sender._id ,
  });
  const allMessages = [
    ...(await messagesFromYou),
    ...(await messagesToYou),
  ].sort((x, y) => x.createdAt - y.createdAt);
  io.to(await receiver.socketId).emit("yourMessageSeen", await allMessages);
}catch(error){
  console.log("error")
}
};
const Events = {
  cancelRequest,
  acceptRequest,
  refuseRequest,
  sendMessage,
  seeMessage,
};
module.exports = Events;
