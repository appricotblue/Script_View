const router = require("express").Router();
const { getInitial, exportFile } = require("../controllers/scriptControllers");

// initial state
router.get("/get-initial", getInitial);

// export content (eg:pdf)
router.post("/export", exportFile);

module.exports = router;
