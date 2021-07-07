require("dotenv").config();
const jwt = require("jsonwebtoken");

function generateAccessToken({ id }) {
  return jwt.sign({ sub: id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30m",
  });
}

module.exports = { generateAccessToken };
