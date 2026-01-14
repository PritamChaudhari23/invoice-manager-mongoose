require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// LOGIN
async function login(req, res) {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.json({ message: "User not found" });
    }

    const match = await bcrypt.compare(req.body.password, user.password);
    const payload = { username: user.username, id: user._id };
    const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });

    if (match) {
      res.json({ accessToken });
    } else {
      res.json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// SIGN UP
async function signup(req, res) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
    });

    res.send({ message: "User created successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Error during signup" });
  }
}

module.exports = {
  login,
  signup,
};
