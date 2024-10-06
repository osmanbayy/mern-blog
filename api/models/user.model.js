import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true, min: 4, max: 10, unique: true },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true }
  }, { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;