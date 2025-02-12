const Feedback = require("../models/Feedback");
const Food = require("../models/Food");
const Order = require("../models/Order");
const User = require("../models/User");
const { decryptData } = require('../Utils/decryptData');
exports.createFeedback = async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      if (!user || !user.isVerified) {
        return res.status(400).json({
          success: false,
          message: "Please verify your account via email to place an order.",
        });
      }
      const decryptedData=JSON.parse(decryptData(req.body.data))
      const feedbackData = {
        userId: user._id,
        ...decryptedData
      };

      await Promise.all(feedbackData.ratings.map(async (item) => {
        const food = await Food.findById(item.itemId);
          const newRating = (food.rating  + item.rating) / (food.raters + 1);
          await Food.findByIdAndUpdate(item.itemId, {
            rating: newRating,
            raters: food.raters + 1
          });
      }));

      await Order.findByIdAndUpdate(feedbackData.orderId,{
        feedback:true
      })
      
      const newOrder = await Feedback.create(feedbackData);
      if (newOrder) {
        return res.status(200).json({
          success: true,
          message: "Feedback created successfully",
          doc: newOrder,
          user: user
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

  exports.getMyFeedbacks = async (req, res) => {
    try {
      const doc = await Feedback.find({ userId: req.user._id });
  
      const feedbackWithOrders = await Promise.all(
        doc.map(async (item) => {
          const order = await Order.findById(item.orderId);
          return {
            ...item.toObject(),  
            items:order.items,
          };
        })
      );
  
      res.status(200).json({
        success: true,
        results: feedbackWithOrders.length,
        message: 'Data Fetched Successfully',
        doc: feedbackWithOrders, 
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        success: false,
        message: "Internal Server Error!",
      });
    }
  };
  