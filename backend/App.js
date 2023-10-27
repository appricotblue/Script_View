const express = require("express");
const morgan = require("morgan");
const app = express();
require("dotenv").config();

const scriptRouter = require("./routes/scriptRouter");
const fontsRouter = require("./routes/fontsRouter");

app.use(express.json());
app.use(morgan("combined"));

app.use("/api/scripts/", scriptRouter);
app.use("/fonts/", fontsRouter);

const PORT = 8080;

app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
