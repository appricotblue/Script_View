const { default: mongoose } = require("mongoose");

/**
 * Establish DB.
 * @returns {void}
 */

module.exports = function () {
  const db = mongoose.connection;

  const { ENVIRONMENT, DB_URI } = process.env;
  const URI =
    ENVIRONMENT === "PRODUCTION"
      ? DB_URI
      : "mongodb+srv://ajayprakash:mrAJAY1@cluster0.fo34uzm.mongodb.net/scriptViewDev?retryWrites=true&w=majority";

  mongoose.connect(URI);

  db.once("open", () => {
    console.log("mongodb connected");
  });

  db.on("error", console.error.bind(console, "Connection ERROR: "));
};
