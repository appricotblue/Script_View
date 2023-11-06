const { Schema, model } = require("mongoose");

const scriptSchema = new Schema(
  {
    title: { type: String, requried: "Requires Title" },
    author: {
      // type: Schema.Types.ObjectId,
      // ref: "User",
      // required: "Requires Author",
      type: String,
    },
    editorState: { type: String },
  },
  { timestamps: true },
);

const ScriptModel = model("script", scriptSchema);
module.exports = ScriptModel;
