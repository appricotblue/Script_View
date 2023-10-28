const mongoose = require("mongoose");

const scriptSchema = new mongoose.Schema(
  {
    author: { name: { type: String, required: "Author name is required" } },
    state: { type: String, required: "state is required to update" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("script", scriptSchema);
