const { Schema, model } = require("mongoose");

const scriptSchema = new Schema(
  {
    title: { type: String, requried: "Requires Title" },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: "Requires Author",
    },
    editorState: { type: String },
  },
  { timestamps: true }
);

module.exports = model("script", scriptSchema);
