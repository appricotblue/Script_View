const { Server } = require("socket.io");
const { saveScript } = require("../helpers/socketHelpers");
/**
 * This function handles all operations related to web socket connection
 *
 * @param {Object} appServer - Accepts an instance of http server. (createServer())
 */

module.exports = function (appServer) {
  const io = new Server(appServer);

  io.on("connection", (socket) => {
    // saves state. if error, emits SaveStateError
    socket.on("save-state", async (data) => {
      try {
        await saveScript(data);
      } catch (err) {
        io.emit("SaveStateError", { message: err.message, stack: err.stack });
      }
    });
  });
};
