const jwt = require("jsonwebtoken");

const SECRET_KEY = "verySecretKey";

// Function to generate JWT token
function generateToken(user) {
  return jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: "1d" });
}

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer tokenString

  if (!token) {
    return res.status(401).json({ message: "Access Token required" });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    req.user = user;
    next();
  });
}

module.exports = { generateToken, authenticateToken };
