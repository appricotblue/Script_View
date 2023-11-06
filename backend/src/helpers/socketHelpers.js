const ScriptModel = require("../model/scriptModel");

module.exports = {
  /** @param {string} state @param {string} authorId */
  saveScript: async ({ state, authorId }) => {
    const user = await ScriptModel.findOne({ author: "user" });
    if (user) {
      await user.updateOne({ editorState: state });
    } else {
      await ScriptModel.create({
        // author: ObjectId(user),
        author: "user",
        editorState: state,
      });
    }
  },
};
