const router = require("express").Router();
const {
  getInitial,
  exportFile,
  createScript,
  listRecent,
  deleteDoc,
  storeOneLine,
  addOneLine,
} = require("../controllers/scriptControllers");

// initial state
router.get("/get-initial/:id", getInitial);

// create document
router.get("/create", createScript);

// get recently updated document list
router.get("/list_recent", listRecent);

// export content (eg:pdf)
router.post("/export", exportFile);

// delete document
router.delete("/delete/:id", deleteDoc);

// store oneline
router.post('/storeOneLineData', addOneLine);

module.exports = router;

