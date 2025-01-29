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


exports.deleteImageFromCloudinary = (imageUrl, folder) => {
    return new Promise((resolve, reject) => {
      try {
        const publicId = imageUrl.split('/').slice(-1)[0].split('.')[0];
        cloudinary.uploader.destroy(`${folder}/${publicId}`, (error, result) => {
          if (error) {
            reject({success:false, message: "Error deleting image from Cloudinary", error: error.message });
          } else {
            resolve({ message: "Image deleted successfully", result, success:true });
          }
        });
      } catch (error) {
        reject({ message: "Error processing the request", error: error.message });
      }
    });
  };