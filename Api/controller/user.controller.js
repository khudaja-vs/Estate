import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

export const updateUser = async (req, res, next) => {
  // Check karein ke token ka user id aur params ki id same hai ya nahi
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only update your own account!'));

  try {
    // Agar password change kar rahe hain toh usay hash karein
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    // Database mein user update karein
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar, // <-- Yeh Cloudinary / image URL update karega
        },
      },
      { new: true } // Updated data return karne ke liye
    );

    // Password rest response se exclude karein
    const { password, ...rest } = updatedUser._doc;

    // Response send karein
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};