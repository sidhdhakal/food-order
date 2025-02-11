const Order = require("../models/Order");
const User = require("../models/User");
exports.createOrder = async (req, res) => {
  try {
    const user = await User.findById( req.user._id );
    console.log(user)
    if (!user || !user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Please verify your account via email to place an order.",
      });
    }

    
    const currentOrders = await Order.find({
      "statusHistory.4": { $exists: false },
      userId: user._id,
      'currentStatus.status':{$ne:'Cancelled'}
    }).sort({ createdAt: -1 });

    if(currentOrders.length>=2){
      return res.status(400).json({
        success: false,
        message: "You have 2 active orders. Complete or cancel one to create a new order.",
      });
    }
    const updatedItems = req.body.items.map(
      ({ itemId, image, ...rest }) => rest
    );

    const orderData = {
      userId: user._id,
      items: updatedItems,
      message:req.body.message,
      paymentMethod: req.body.paymentMethod,
      currentStatus: { status: "Order Placed", time: Date.now() },
    };
    console.log(orderData);
    const newOrder = await Order.create(orderData);
    if (newOrder) {
      return res.status(200).json({
        success: true,
        message: "Order created successfully",
        doc: newOrder,
        user:user
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

exports.updateCurrentOrder = async (req, res) => {
    console.log(req.body);
    try {
      const order = await Order.findById(req.body._id);
  
      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found!",
        });
      }
  
      console.log(order);
  
      let updatedStatusHistory = [
        ...order.statusHistory,
        {
          status: order.currentStatus.status, // Previous status
          time: order.currentStatus.time, // Previous time
        },
      ];
  
      if (req.body.status === "Completed") {
        updatedStatusHistory = [
          ...updatedStatusHistory,
          {
            status: req.body.status,
            time: Date.now(),
          },
        ];
      }
  
      let updatedOrder = await Order.findByIdAndUpdate(
        order.id,
        {
          currentStatus: {
            status: req.body.status,
            time: Date.now(),
          },
          statusHistory: updatedStatusHistory,
        },
        { new: true }
      );
  
      if (!updatedOrder) {
        return res.status(400).json({
          success: false,
          message: "Failed to update order!",
        });
      }
  
      const user = await User.findById(order.userId).select("name email image");
  
      updatedOrder = {
        ...updatedOrder.toObject(), // Convert Mongoose document to plain object
        user: user || { name: "Unknown", email: "", image: "" },
      };
  
      console.log("updatedOrder", updatedOrder);
  
      res.status(200).json({
        success: true,
        message: "Order status updated successfully!",
        order: updatedOrder,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        success: false,
        message: "Internal Server Error!",
      });
    }
  };
  

exports.getCurrentOrder = async (req, res) => {
  try {
    const user = await User.findById( req.user._id );

    if (!user) {
      return res.status(404).json({
        success: true,
        message: "User Not Found",
      });
    }
    const order = await Order.find({
      "statusHistory.4": { $exists: false },
      userId: user._id,
      'currentStatus.status':{$ne:'Cancelled'}
    }).sort({ createdAt: -1 });

    if (order) {
      return res.status(200).json({
        success: true,
        message: "Got Current Order",
        doc: order,
      });
    }
    return res.status(400).json({
      success: true,
      message: "No Current Order",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};


exports.getTodaysOrder = async (req, res) => {
    console.log('Todays ORder')
    try {
      const user = await User.findById( req.user._id );

      if (!user) {
        return res.status(404).json({
          success: true,
          message: "User Not Found",
        });
      }
  
      const startOfDay = new Date(Date.now());
      startOfDay.setHours(0, 0, 0, 0);  // Set to midnight
  
      const endOfDay = new Date(Date.now());
      endOfDay.setHours(23, 59, 59, 999); // Set to last moment of the day
  
      const orders = await Order.find({
        'currentStatus.status': { $in: ['Completed', 'Cancelled'] },
        userId: user._id,
        createdAt: { $gte: startOfDay, $lte: endOfDay },
      }).sort({ createdAt: -1 });  // Sort by creation date in descending order
      
      
      
      if (orders.length > 0) {
        return res.status(200).json({
          success: true,
          message: "Got Today's Orders",
          doc: orders,
        });
      }
  
      return res.status(400).json({
        success: true,
        message: "No Orders Found for Today",
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        success: false,
        message: "Internal Server Error!",
      });
    }
  };
  
  
  exports.getOlderOrders = async (req, res) => {
    try {
      const user = await User.findById( req.user._id );

      if (!user) {
        return res.status(404).json({
          success: true,
          message: "User Not Found",
        });
      }
  
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);  // Set time to 00:00:00.000 for today
  
      const orders = await Order.find({
        // "statusHistory.4": { $exists: false },
        userId: user._id,
        createdAt: { $lt: startOfDay },  // Get orders created before the start of today
      }).sort({ createdAt: -1 });
  
      if (orders.length > 0) {
        return res.status(200).json({
          success: true,
          message: "Got Older Orders",
          doc: orders,
        });
      }
  
      return res.status(200).json({
        success: true,
        message: "No Older Orders Found",
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        success: false,
        message: "Internal Server Error!",
      });
    }
  };
  

  exports.getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find().sort({createdAt:-1});
  
      if (!orders || orders.length === 0) {
        return res.status(400).json({
          success: true,
          message: "No Orders Found",
        });
      }
  
      const ordersWithUserDetails = await Promise.all(
        orders.map(async (order) => {
          const user = await User.findById(order.userId).select("name email image");
          return {
            ...order._doc, // Spread existing order data
            user: user ? user : { name: "Unknown", email: "", image: "" }, // Handle cases where user is missing
          };
        })
      );
      return res.status(200).json({
        success: true,
        message: "Fetched All Orders",
        doc: ordersWithUserDetails,
      });
  
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Internal Server Error!",
      });
    }
  };
  