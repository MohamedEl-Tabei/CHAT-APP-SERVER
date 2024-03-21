const Util = require("../../base/util");
const Model = require("../../base/model");
const onError = (error) => {
  return Util.Error.getErrorMessage(error);
};
const cancelRequest = async (io, receiverId, senderId) => {
  try {
    const receiver = await Model.User.findById(receiverId);
    const sender = await Model.User.findById(senderId);
    let toYou = Util.Arry.deleteOneFromArray( await sender.id,await receiver.requestToYou)
    let fromYou = Util.Arry.deleteOneFromArray(await receiver.id,await sender.requestFromYou)
    await receiver.updateOne({requestToYou:toYou})
    await sender.updateOne({requestFromYou:fromYou})
    await io
      .to(await receiver.socketId)
      .emit("cancelRequestToYou", await sender.id);
  } catch (error) {
    io.emit("error", onError(error));
  }
};
const Events = {
  cancelRequest,
};
module.exports = Events;
