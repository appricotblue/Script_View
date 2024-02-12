const router = require("express").Router();
const userModel = require("../model/userModel");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await userModel.findOne({ email });

    // Check if the user exists and validate the password
    if (user && password == user.password) {
      res.status(200).json({ message: "Login successful!", user });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    // Check if the email already exists
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Create a new user
    const newUser = new userModel({ firstname, lastname, email, password });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!", newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
