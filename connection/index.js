const Model = require("../base/model");
const onConnection = async (socket, io) => {
  let socketId = socket.id;
  await socket.on("addToOnlineUsers", async (userId) => {
    const usr = await Model.User.findByIdAndUpdate(userId, { socketId });
    await io.emit("isOnline", usr._id);
  });
  await socket.on("sendRequest", async (receiverId, senderId) => {
    const receiver = await Model.User.findById(receiverId);
    const sender = await Model.User.findById(senderId);
    let requestFromYou = [...sender.requestFromYou];
    let requestToYou = [...receiver.requestToYou];
    requestFromYou.push(receiver._id);
    requestToYou.push(sender._id);
    await sender.updateOne({
      requestFromYou,
    });
    await receiver.updateOne({
      requestToYou,
    });
    await io
      .to(await receiver.socketId)
      .emit("requestNotification", await sender._id);
  });
  await socket.on("disconnect", async () => {
    const user = await Model.User.findOneAndUpdate(
      { socketId },
      { socketId: "" }
    );
    if (await user) await io.emit("isOffline", user.id);
  });
};
module.exports = { onConnection };
