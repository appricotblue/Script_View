const router = require("express").Router();
const {
  getInitial,
  exportFile,
  createScript,
  listRecent,
} = require("../controllers/scriptControllers");

// initial state
router.get("/get-initial/:id", getInitial);

// create document
router.get("/create/:id", createScript);

// get recently updated document list
router.get("/list_recent", listRecent);

// export content (eg:pdf)
router.post("/export", exportFile);

module.exports = router;
