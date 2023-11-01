const { Server } = require("socket.io");
const appServer = require("../App");
const ScriptModel = require("../model/scriptModel");
const { ObjectId } = require("mongoose").Schema.Types;

const io = new Server(appServer);

io.on("connection", socket => {
  console.log("connected");
  socket.on("save-state", async data => {
    try {
    //   const user = await ScriptModel.findOne({ "author.name": "Ajay" });
    //   if (user) {
    //     await user.updateOne({ state: data.state });
    //   } else {
    //     await ScriptModel.create({
    //       author: ObjectId(user),
    //       state: data.state,
    //     });
    //   }
      socket.broadcast.emit("receive-state", data);
    } catch (err) {
      console.log(err.message);
    }
  });
});
