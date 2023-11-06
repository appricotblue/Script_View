const ScriptModel = require("../model/scriptModel");

module.exports = {
  /** @param {string} id @returns {Promise<Object|null} */
  findAutherById: async (id) => {
    const data = await ScriptModel.findOne({ author: id });
    return data;
  },
};
