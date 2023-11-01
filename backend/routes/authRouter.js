const { authenticate } = require("../middlewares/authMiddlewares");

const router = require("express").Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;
});

module.exports = router;
