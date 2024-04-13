const Model = require("../base/model");
const Events = require("./events");
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
    let requestNotifications = [...receiver.requestNotifications];
    requestNotifications.push(sender._id);
    requestFromYou.push(receiver._id);
    requestToYou.push(sender._id);
    await sender.updateOne({
      requestFromYou,
    });
    await receiver.updateOne({
      requestToYou,
      requestNotifications,
    });
    await io
      .to(await receiver.socketId)
      .emit("requestNotification", await sender._id);
    await io
      .to(await receiver.socketId)
      .emit("newRequest", await sender._id);
  });
  await socket.on(
    "cancelRequest",
    async (receiverId, senderId) =>
      await Events.cancelRequest(io, receiverId, senderId)
  );
  await socket.on(
    "acceptRequest",
    async (receiverId, senderId) =>
      await Events.acceptRequest(io, receiverId, senderId)
  );
  await socket.on("refuseRequest",async (receiverId,senderId)=>await Events.refuseRequest(io,receiverId,senderId))
  await socket.on("sendMessage",async (receiverId,senderId,text)=>await Events.sendMessage(io,receiverId,senderId,text))
  await socket.on("seeMessage",async (receiverId,senderId)=>await Events.seeMessage(io,receiverId,senderId))
  await socket.on("disconnect", async () => {
    const user = await Model.User.findOneAndUpdate(
      { socketId },
      { socketId: "" }
    );
    if (await user) await io.emit("isOffline", user.id);
  });
};
module.exports = { onConnection };
