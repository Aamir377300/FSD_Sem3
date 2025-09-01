const express = require("express");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const { authenticateToken, generateToken } = require("./auth");

const app = express();
app.use(bodyParser.json());

const users = [];

// Signup route
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  if (users.find((u) => u.username === username)) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(201).json({ message: "Signup completed" });
  console.log("signup ✅")
  console.log(users)
});

// Login route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  const isMatch = await bcrypt.compare(password, user.password);
  if (!user && !isMatch) {
    return res.status(400).json({ message: "Invalid username or password" });
  }


  const token = generateToken(user);
  res.status(200).json({ message: "Login successful", token });
  console.log("login is done")
  console.log(token)

});

// Protected route
app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, this is protected data` });
});

app.listen(5002, () => {
  console.log("Server running on http://localhost:5002");

});
