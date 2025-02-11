const Food = require("../models/Food");
const { optimizeBase64Image } = require("../Utils/optimizeImage");
const { uploadToCloudinary, deleteImageFromCloudinary } = require("../Utils/cloudinary");

exports.getFoods = async(req, res)=>{
  try{

    const doc=await Food.find({available:true})
    res.status(200).json({
      success: true,
      results: doc.length,
      message:'Data Fetched Successfully',
      doc
    });
  } catch (err) {
    console.log(err)
    res.status(400).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
}

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


exports.updateFood = async (req, res) => {
  try {
    const foodToUpdate = await Food.findById(req.params.id);
    if (!foodToUpdate) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    if (req.body.name && req.body.name !== foodToUpdate.name) {
      const existingFood = await Food.findOne({ name: req.body.name });
      if (existingFood) {
        return res.status(400).json({
          success: false,
          message: "Food with this name already exists",
        });
      }
    }
    let url=''

    if(!req.body.image.startsWith('https://res.cloudinary.com/'))
    {
      await deleteImageFromCloudinary(foodToUpdate.image)
      url=await uploadToCloudinary(req.body.image)
    }
    else{
      url=req.body.image
    }

    const updatedFood = await Food.findOneAndUpdate(
      { _id: req.params.id },
      {
        ...req.body,
        image:url,
        updatedAt: Date.now()
      },
      { new: true } 
    );


    if(updatedFood){
      return res.status(200).json({
        success: true,
        message: "Food updated successfully",
        doc: updatedFood,
      });
    }

    return res.status(400).json({
      success: false,
      message: "Failed to update food",
      doc: updatedFood,
    });

  } catch (err) {
    console.error(err); 
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

exports.deleteFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id); 
    if (food) {
      const result = await deleteImageFromCloudinary(food.image, 'Food')
      if(result.success)
        return res.status(200).json({
            success: true,
            message: "Food Deleted successfully",
            doc: food,
        });

        return res.status(400).json({
          success: true,
          message: "Failed to Delete Image From Cloudinary",
          doc: food,
      });

    } else {
        return res.status(404).json({
            success: false,
            message: "food not found",
        });
    }

  } catch (err) {
    console.error(err); 
    res.status(400).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};
