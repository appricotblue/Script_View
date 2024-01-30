const ScriptModel = require("../model/scriptModel");

module.exports = {
  /** @param {string} id @returns {Promise<Object|null} */
  findScriptById: async (id) => {
    const data = await ScriptModel.findOne({ _id: id });
    return data;
  },

  /** @returns {Promise<Object>|null} */
  createNewScript: async () => {
    const data = await ScriptModel.create({ author: "user" });
    return data;
  },

  /** @param {void} @returns {Promise<Array>|null} */
  getRecentDocList: async () => {
    const list = await ScriptModel.find()
      .sort({ updatedAt: -1 })
      .limit(10)
      .select("_id title updatedAt");
    return list;
  },
};
