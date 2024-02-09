const router = require("express").Router();
const {
  getInitial,
  exportFile,
  createScript,
  listRecent,
  deleteDoc,
  storeOneLine,
  addOneLine,
  getOneLinesByScriptId,
  getCharacters,
} = require("../controllers/scriptControllers");

// initial state
router.get("/get-initial/:id", getInitial);

// create document
router.post("/create", createScript);

// get recently updated document list
router.post("/list_recent", listRecent);

// export content (eg:pdf)
router.post("/export", exportFile);

// delete document
router.delete("/delete/:id", deleteDoc);

// store oneline
router.post("/storeOneLineData", addOneLine);

// fetch onelines
router.get("/getOnelines/:id", getOneLinesByScriptId);

// fetch characters
router.get("/getCharacters/:scriptId", getCharacters);

module.exports = router;
