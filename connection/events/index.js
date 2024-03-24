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
const refuseRequest=async(io, receiverId,senderId)=>{
  let sender=await Model.User.findById(senderId);
  let receiver=await Model.User.findById(receiverId);
  await sender.updateOne({
    requestToYou:Util.Arry.deleteOneFromArray(receiver._id,sender.requestToYou)
  })
  await receiver.updateOne({
    requestFromYou:Util.Arry.deleteOneFromArray(sender._id,receiver.requestFromYou)
  })
  io.to(await receiver.socketId).emit("requestRefused",await sender._id)
}
const Events = {
  cancelRequest,
  acceptRequest,refuseRequest
};
module.exports = Events;
