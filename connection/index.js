const Model = require("../base/model");
const onConnection = async (socket) => {
  let socketId = socket.id;
  await socket.on("addToOnlineUsers", async (userId) => {
    await Model.User.findByIdAndUpdate(userId, { socketId });
    await socket.on("disconnect", async () => {
      await Model.User.findOneAndUpdate({socketId}, { socketId: "" });
    });
  });
};
module.exports = { onConnection };
