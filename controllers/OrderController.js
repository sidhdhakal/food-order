const Order = require("../models/Order");
const User = require("../models/User");
exports.createOrder = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Not a valid User",
      });
    }

    const updatedItems = req.body.items.map(
      ({ itemId, image, ...rest }) => rest
    );

    const orderData = {
      userId: user._id,
      items: updatedItems,
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
  try {
    // Find the order by its ID
    const order = await Order.findById(req.params.id);

    // If order doesn't exist
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    let updatedStatusHistory = [
      ...order.statusHistory,
      {
        status: order.currentStatus.status, // Previous status
        time: order.currentStatus.time, // Previous time
      },
    ];

    if(req.body.status=='Completed'){
        updatedStatusHistory = [
            ...order.statusHistory,{
                status: req.body.status,
                time: Date.now(),
              }
          ];
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        currentStatus: {
          status: req.body.status,
          time: Date.now(),
        },
        statusHistory: updatedStatusHistory,
      },
      { new: true }
    );

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
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        success: true,
        message: "User Not Found",
      });
    }
    const order = await Order.find({
      "statusHistory.4": { $exists: false },
      userId: user._id,
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
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({
          success: true,
          message: "User Not Found",
        });
      }
  
      // Get current time for today at 00:00:00.000
      const startOfDay = new Date(Date.now());
      startOfDay.setHours(0, 0, 0, 0);  // Set to midnight
  
      // Get current time for today at 23:59:59.999
      const endOfDay = new Date(Date.now());
      endOfDay.setHours(23, 59, 59, 999); // Set to last moment of the day
  
      // Find orders created today
      const orders = await Order.find({
        // "statusHistory.4": { $exists: false }, 
        userId: user._id,
        // createdAt: { $gte: startOfDay, $lte: endOfDay },
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
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({
          success: true,
          message: "User Not Found",
        });
      }
  
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);  // Set time to 00:00:00.000 for today
  
      const orders = await Order.find({
        "statusHistory.4": { $exists: false },
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
  
      return res.status(400).json({
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
  