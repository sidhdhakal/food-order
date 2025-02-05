const Food = require("../models/Food");
const { optimizeBase64Image } = require("../Utils/optimizeImage");
const { uploadToCloudinary, deleteImageFromCloudinary } = require("../Utils/cloudinary");


exports.createFood = async (req, res) => {
  try {
    const oldCategory = await Food.findOne({ name: req.body.name });
    if (oldCategory)
      return res.status(400).json({
        success: false,
        message: "Food with that name Already Exists",
      });
    const optimizedUrl = await optimizeBase64Image(req.body.image);

    const url = await uploadToCloudinary(optimizedUrl, "Food");

    const newCategory = await Food.create({ ...req.body, image: url });
    if (newCategory) {
      return res.status(200).json({
        success: true,
        message: "Food Created successfully",
        doc: newCategory,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};
