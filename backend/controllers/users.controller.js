const User = require('../models/userSchema.model.js');

const createUser = async (req, res) => {
  try{
    const newUser = await User.create(req.body)
    res.status(201).json(newUser)
  }catch(error){
    if (error.code === 11000) { // MongoDB duplicate key error code
      return res.status(400).json({ message: 'Email already in use. Please choose another one.' });
    }
    return res.status(500).json({message: error.message || `Failed to create user`})
  }
}

const getUsers = async (req, res) => {
  try{
    const users = await User.find();
    return res.status(200).json(users)
  }catch(error){
    return res.status(500).json({message: error.message || `Failed to get all users`})
  }
}

module.exports = {
  createUser,
  getUsers
}