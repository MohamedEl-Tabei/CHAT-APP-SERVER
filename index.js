const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const connection = require("./connection");
dotenv.config();
let port = process.env.PORT || 5000;
let uri = process.env.URI;
mongoose.connect(uri).then(() => {
  console.log("Data base connected");
});
let server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
let io = new Server(server, { cors: "*" });
io.on("connection",(socket)=>connection.onConnection(socket,io));
