const router = require("express").Router();
const {
  getInitial,
  exportFile,
  createScript,
  listRecent,
  deleteDoc,
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
module.exports = router;
