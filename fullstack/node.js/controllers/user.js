const User = require("../models/user");
const { z } = require("zod");
const { signInSchema } = require("../lib/validation/user");
const { signUpSchema } = require("../lib/validation/user");
const { userIdValidation, usernameValidation, passwordValidation,updateSchema } = require("../lib/validation/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { setTokenCookie } = require("../lib/utils");

const signUp = async (req, res) => {
  try {
    const { fullName, username, email, password } = signUpSchema.parse(req.body);
    //......

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ message: "Username allready exist" });
    }
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "mail allready exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
    });

    const newUser = await user.save();

    if (!newUser) {
      return res.status(400).json({ message: "faild to create user" });
    }

    setTokenCookie(res, newUser, process.env.JWT_SECRET);
    return res.status(200).json({message:'user signed in successfully'})


    signUpSchema.parse({ fullName, username, email, password });
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    
    return res.status(500).json({ message: "Internal server error" }); // error: error.message


  }
};

const signIn = async (req, res) => {
  try {
    const { username, password } = signInSchema.parse(req.body);

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    setTokenCookie(res, user, process.env.JWT_SECRET);

    return res.status(200).json({message:'user signed in successfully'})

  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }

    return res.status(500).json({ message: "internal server error" });
  }
};


const signOut = async(req,res)=>{
  try{
    if(req.user.id !== req.params.id){
      return res.status(403).json({message:'forbidden'});
    }
    
    res.clearCookie('token');
    return res.status(200).json({message:'user signed out sucssefuly'});
  }catch (error){
    console.log(error);
    return res.status(500).json({message:'internal server error'});
  }
  
  
  };

  

  const updateUser = async (req, res) => {
    try {
      if(req.user.id !== req.params.id){
        return res.status(403).json({message:'forbidden'});
      }

      const userId = userIdValidation.parse(req.params.userId);  
      const { username, email, password } = updateSchema.parse(req.body);  
  
      const existingUser = await User.findById(userId);
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const usernameExists = await User.findOne({ username });
      if (usernameExists) {
        return res.status(400).json({ message: "Username allready exist" });
      }
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: "mail allready exists" });
      }
    
  
      const updateData = {};
      if (username) updateData.username = username;
      if (email) updateData.email = email;
  
      if (password) {
        const isSamePassword = await bcrypt.compare(password, existingUser.password);
        if (!isSamePassword) {
          updateData.password = await bcrypt.hash(password, 10);
        }
      }
  
      const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
  
      setTokenCookie(res, updatedUser, process.env.JWT_SECRET);
  
      return res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
  
  
  
  module.exports = {
    signUp,
    signIn,
    signOut,
    updateUser,
  };