const cloudinary = require('./CloudinaryConfig');

exports.uploadToCloudinary = (image, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, { resource_type: 'auto', folder }, (error, result) => {
      if (error) {
        reject(error); // Reject the promise on error
      } else {
        resolve(result.secure_url); // Resolve the promise with the secure URL
      }
    });
  });
}
