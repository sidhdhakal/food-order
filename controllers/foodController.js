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
    const userId = req.user._id;
    
    // Fetch user's orders
    const userOrders = await Order.find({ userId }).sort({ createdAt: -1 });

    if (userOrders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this user."
      });
    }

    // Extract user's preferences
    const userPreferences = extractUserPreferences(userOrders);
    
    // Use different recommendation strategies based on the amount of data available
    let recommendedItems;
    
    if (userOrders.length >= 5) {
      // If user has many orders, use collaborative filtering
      recommendedItems = await getCollaborativeFilteringRecommendations(userId, userPreferences);
    } else {
      // For new users with few orders, use content-based filtering
      recommendedItems = await getContentBasedRecommendations(userPreferences);
    }
    
    // If we still don't have enough recommendations, add popular items
    if (recommendedItems.length < 5) {
      const popularItems = await getPopularItems(userPreferences.orderedItemIds);
      recommendedItems = [...recommendedItems, ...popularItems.slice(0, 10 - recommendedItems.length)];
    }

    if (recommendedItems.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No recommended foods found."
      });
    }

    return res.status(200).json({
      success: true,
      results: recommendedItems.length,
      doc: recommendedItems
    });
  } catch (err) {
    console.error("Error fetching recommended foods:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!"
    });
  }
};

// Helper function to extract user preferences from orders
function extractUserPreferences(orders) {
  const categoryFrequency = {};
  const orderedItemIds = new Set();
  const recentCategories = [];
  
  // Process orders from newest to oldest (they're already sorted)
  orders.forEach(order => {
    order.items.forEach(item => {
      // Track ordered item IDs
      if (item.itemId) {
        orderedItemIds.add(item.itemId);
      }
      
      // Track category frequency
      if (item.category) {
        categoryFrequency[item.category] = (categoryFrequency[item.category] || 0) + 1;
        
        // Keep track of recent categories (avoid duplicates in the most recent order)
        if (recentCategories.length < 3 && !recentCategories.includes(item.category)) {
          recentCategories.push(item.category);
        }
      }
    });
  });
  
  // Sort categories by frequency
  const sortedCategories = Object.entries(categoryFrequency)
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0]);
  
  return {
    orderedItemIds: Array.from(orderedItemIds),
    favoriteCategories: sortedCategories,
    recentCategories
  };
}

// Collaborative filtering: Find foods that users with similar tastes ordered
async function getCollaborativeFilteringRecommendations(userId, userPreferences) {
  try {
    // Find users who ordered similar items
    const similarUserOrders = await Order.find({
      userId: { $ne: userId },
      "items.category": { $in: userPreferences.favoriteCategories.slice(0, 3) }
    }).limit(50);
    
    // Extract item IDs from similar users that current user hasn't ordered
    const potentialRecommendationIds = new Set();
    const itemScores = {};
    
    similarUserOrders.forEach(order => {
      order.items.forEach(item => {
        if (item.itemId && !userPreferences.orderedItemIds.includes(item.itemId)) {
          potentialRecommendationIds.add(item.itemId);
          
          // Score items higher if they're in user's favorite categories
          const categoryScore = userPreferences.favoriteCategories.includes(item.category) ? 2 : 1;
          itemScores[item.itemId] = (itemScores[item.itemId] || 0) + categoryScore;
        }
      });
    });
    
    // Sort by score and convert to array
    const recommendationIds = Array.from(potentialRecommendationIds)
      .sort((a, b) => (itemScores[b] || 0) - (itemScores[a] || 0))
      .slice(0, 10);
    
    // Fetch the actual food items
    if (recommendationIds.length > 0) {
      return await Food.find({ _id: { $in: recommendationIds } }).limit(10);
    }
    
    return [];
  } catch (error) {
    console.error("Error in collaborative filtering:", error);
    return [];
  }
}

// Content-based approach for users with fewer orders
async function getContentBasedRecommendations(userPreferences) {
  try {
    // Get foods in user's favorite categories that they haven't ordered yet
    const recommendations = await Food.find({
      category: { $in: userPreferences.favoriteCategories.slice(0, 3) },
      _id: { $nin: userPreferences.orderedItemIds }
    })
    .sort({ rating: -1 })
    .limit(10);
    
    return recommendations;
  } catch (error) {
    console.error("Error in content-based recommendations:", error);
    return [];
  }
}

// Get generally popular items as fallback
async function getPopularItems(excludeIds) {
  try {
    // Aggregate to find most frequently ordered items
    const popularItemsAggregation = await Order.aggregate([
      { $unwind: "$items" },
      { $match: { "items.itemId": { $exists: true, $ne: null, $nin: excludeIds } } },
      { $group: { _id: "$items.itemId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);
    
    const popularItemIds = popularItemsAggregation.map(item => item._id);
    
    if (popularItemIds.length > 0) {
      return await Food.find({ _id: { $in: popularItemIds } });
    }
    
    // If aggregation didn't work, fall back to highest-rated items
    return await Food.find({ _id: { $nin: excludeIds } })
      .sort({ rating: -1 })
      .limit(10);
  } catch (error) {
    console.error("Error getting popular items:", error);
    return [];
  }
}