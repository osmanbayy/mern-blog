import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true, min: 4, max: 10, unique: true },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String, default: "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=" },
  isAdmin: { type: Boolean, default: false }
  }, { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;