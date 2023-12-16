const { Server } = require("socket.io");
const { saveScript, editScriptTitle } = require("../helpers/socketHelpers");
/**
 * This function handles all operations related to web socket connection
 *
 * @param {Object} appServer - Accepts an instance of http server. (createServer())
 */

module.exports = function (appServer) {
  const io = new Server(appServer, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("socket connected");
    // saves state. if error, emits SaveStateError
    socket.on("save-state", async (data) => {
      try {
        await saveScript(data);
      } catch (err) {
        io.emit("SaveStateError", { message: err.message, stack: err.stack });
      }
    });
    // TODO - You may have to create a route for this one, to rename it
    socket.on("edit-title", async (data) => {
      try {
        await editScriptTitle(data);
      } catch (err) {
        io.emit("editTitleError", { message: err.message, stack: err.stack });
      }
    });
  });
};
