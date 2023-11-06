const router = require("express").Router();
const { authenticate } = require("../middlewares/authMiddlewares");

router.post("/login", (req, res) => {
  const { email, password } = req.body;
});

module.exports = router;
