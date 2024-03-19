const Model = require("../base/model");
const onConnection = async (socket, io) => {
  let socketId = socket.id;
  await socket.on("addToOnlineUsers", async (userId) => {
    const usr = await Model.User.findByIdAndUpdate(userId, { socketId });
    await io.emit("isOnline", usr._id);
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
