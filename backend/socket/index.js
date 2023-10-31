const { Server } = require("socket.io");
const appServer = require("../App");

const io = new Server(appServer);

io.on("connection", socket => {
  console.log("connected");
  socket.on("save-state", async data => {
    console.log(data);
    try {
      const user = await ScriptModel.findOne({ "author.name": "Ajay" });
      if (user) {
        await user.updateOne({ state: data.state });
      } else {
        await ScriptModel.create({
          author: { name: "Ajay" },
          state: data.state,
        });
      }
      socket.broadcast.emit("receive-state", data);
    } catch (err) {
      console.log(err.message);
    }
  });
});
