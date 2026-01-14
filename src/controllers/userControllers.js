require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepo = require("../repository/userRepository");

// LOGIN
async function login(req, res) {
  try {
    const { username, password } = req.body;

    const user = await userRepo.findByUsername(username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const payload = { id: user._id, username: user.username };
    const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// SIGN UP
async function signup(req, res) {
  try {
    const { name, surname, email, username, password } = req.body;

    const existingUser = await userRepo.findByEmailOrUsername(
      email,
      username
    );

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Email or username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await userRepo.create({
      name,
      surname,
      email,
      username,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Signup error:", error.message);
    return res.status(500).json({ message: "Error during signup" });
  }
}

module.exports = {
  login,
  signup,
};
