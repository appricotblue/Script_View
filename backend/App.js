require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { createServer } = require("node:http");

const path = require("node:path");
const scriptRouter = require("./src/routes/scriptRouter");
const fontsRouter = require("./src/routes/fontsRouter");
const socket = require("./src/socket");
const establishDB = require("./src/configs/db");
const corsConfig = require("./src/configs/cors");

const { PORT, NODE_ENV } = process.env;

const isProduction = NODE_ENV === "production";

if (isProduction) console.log("server running on production");
// create app and http server
const app = express();
const server = createServer(app);

app.use(express.json());

if (!isProduction) app.use(morgan("combined"));

// set up cors
if (isProduction) cors(corsConfig);
else cors();

// establish db and socket
socket(server);
establishDB();

// routing
app.use("/api/scripts/", scriptRouter);
app.use("/fonts/", fontsRouter);

// point the static files to production build of frontend
if (isProduction) {
  app.use(express.static(path.join(__dirname, "../frontend", "dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

const port = PORT || 8080;

server.listen(port, () => console.log(`server listening on port ${port}`));
