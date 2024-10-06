import User from "../models/user.model.js";
import bcyrptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  
  if(!username || !email || !password || username === '' || email === '' || password === ''){
    next(errorHandler(400, 'All Fields are Required!'));
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
    next(error);
  }

};
