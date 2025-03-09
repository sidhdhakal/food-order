const Food = require("../models/Food");
const { optimizeBase64Image } = require("../Utils/optimizeImage");
const { uploadToCloudinary, deleteImageFromCloudinary } = require("../Utils/cloudinary");
const Order = require("../models/Order");

exports.updateFoodTemp=async (req, res)=>{
    await Food.updateMany({raters: 0})
    return res.status(200).json({
      success: true,
      message: "Updated successfully",
    });
}

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
  console.log(req.body)
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


exports.getRecommendedFoods = async (req, res) => {
  try {
    // const orders = await Order.find({ userId: req.user._id });

    // if (orders.length === 0) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "No orders found for this user.",
    //   });
    // }

    // const items = orders.flatMap((order) => order.items);
    // const orderedCategories = [...new Set(items.map(item => item.category))]; // Ensures unique categories

    // const recommendedItems = await Food.find({
    //   category: { $in: orderedCategories },  // Filter by ordered categories
    // })
    //   .limit(10)  // Limit the number of results to 10
    //   .sort({ rating: -1 });  // Optional: Sort by rating (or other field like popularity)

    // if (recommendedItems.length === 0) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "No recommended foods found.",
    //   });
    // }

    // console.log("Recommended items:", recommendedItems);


    const userId = req.user._id;

    // Fetch last 5 orders of the user
    const recentOrders = await Order.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5);

    if (!recentOrders.length) {
      return res.json({ message: "No recent orders found", recommendations: [] });
    }

    // Extract all ordered item IDs
    let recentFoodIds = [];
    recentOrders.forEach((order) => {
      order.items.forEach((item) => {
        if (item.itemId) recentFoodIds.push(item.itemId);
      });
    });

    if (!recentFoodIds.length) {
      return res.json({ message: "No items found in recent orders", recommendations: [] });
    }

    // Find foods that are often ordered together
    const recommendedFoodIds = await Order.aggregate([
      { $match: { "items.itemId": { $in: recentFoodIds }, userId: { $ne: userId } } }, // Ignore the same user's orders
      { $unwind: "$items" }, // Flatten the items array
      { $match: { "items.itemId": { $nin: recentFoodIds } } }, // Exclude already ordered items
      { $group: { _id: "$items.itemId", count: { $sum: 1 } } },
      { $sort: { count: -1 } }, // Sort by most frequently ordered together
      { $limit: 5 }, // Limit recommendations to 5 items
    ]);

    if (!recommendedFoodIds.length) {
      return res.json({ message: "No recommendations found", recommendations: [] });
    }

    const recommendedItems = await Food.find({ _id: { $in: recommendedFoodIds.map((f) => f._id) } });


    return res.status(200).json({
      success: true,
      results:recommendedItems.length,
      doc:recommendedItems,
    });
  } catch (err) {
    console.error("Error fetching recommended foods:", err);
    res.status(400).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};