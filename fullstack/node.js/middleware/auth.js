const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token || token.length === 0) {
      throw new Error("Token not found");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      throw new Error("Invalid token");
    }

    if (decoded.exp<Date.now()/1000){
      throw new Error('token expired');
    }


    const user = await User.findById(decoded.id);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error)

    return res.status(401).json({message:error.message});
  }
};

module.exports =auth;
