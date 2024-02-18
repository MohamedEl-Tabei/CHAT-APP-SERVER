const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
let port = process.env.PORT || 5000;
let uri = process.env.URI;
mongoose.connect(uri).then(() => {
  console.log("Data base connected");
});
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
