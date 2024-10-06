import User from "../models/user.model.js";
import bcyrptjs from 'bcryptjs';

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  
  if(!username || !email || !password || username === '' || email === '' || password === ''){
    return res.status(400).json({ message: 'All fields are required!' });
  }

  const hashedPassword = await bcyrptjs.hashSync(password, 10);
  
  const newUser = new User({
    username,
    email, 
    password: hashedPassword
  });

  try {
    await newUser.save();
    res.json({ success: true, message: 'Signup Successful!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }

};
