const ScriptModel = require("../model/scriptModel");

module.exports = {
  /** @param {string} state @param {string} authorId */
  saveScript: async ({ state, id }) => {
    const user = await ScriptModel.findOne({ _id: id });
    if (user) {
      await user.updateOne({ editorState: state });
    }
  },
};
