const jwt = require("jsonwebtoken");

 function setTokenCookie(res, user, secret) {
  const token = jwt.sign({ id: user._id, username: user.username }, secret, {
    expiresIn: "24h",
  });
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });
}

module.exports = { setTokenCookie };
