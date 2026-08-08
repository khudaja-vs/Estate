import cloudinary from '../utils/cloudinary.js';

export const uploadAvatar = async (req, res) => {
  try {
    // Frontend se aane wali image path / base64 string
    const { image } = req.body; 

    const result = await cloudinary.uploader.upload(image, {
      folder: 'profile_avatars', // Cloudinary me folder name
      width: 150,
      crop: 'scale',
    });

    // Database me save karne ke liye secure URL return karein
    res.status(200).json({
      success: true,
      url: result.secure_url,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const test = (req, res) => {
    res.json({ 
        message: 'Api is working!!!' 
    });
}