const express = require("express");
const morgan = require("morgan");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const db = mongoose.connection;
require("dotenv").config();

const scriptRouter = require("./routes/scriptRouter");
const fontsRouter = require("./routes/fontsRouter");
const ScriptModel = require("./model/scriptModel");

const app = express();
const server = createServer(app);

mongoose.connect(
  "mongodb+srv://ajayprakash:mrAJAY1@cluster0.fo34uzm.mongodb.net/scriptview?retryWrites=true&w=majority"
);

db.once("open", () => {
  console.log("mongodb connected");
});

db.on("error", console.error.bind(console, "Connection ERROR: "));

const io = new Server(server);

io.on("connection", socket => {
  console.log("connected");
  socket.on("save-state", async data => {
    console.log(data);
    try {
      const user = await ScriptModel.findOne({ "author.name": "Ajay" });
      if (user) {
        console.log(user);
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

app.use(express.json());
app.use(morgan("combined"));

app.use("/api/scripts/", scriptRouter);
app.use("/fonts/", fontsRouter);

const PORT = 8080;

server.listen(PORT, () => console.log(`server listening on port ${PORT}`));
