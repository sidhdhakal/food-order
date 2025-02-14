const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  items: [
    {
      itemId:{
        type:String,
        required:false
      },
      name: {
        type: String,
        required: true,
      },
      category:{
        type:String,
        required:false
      },
      price: {
        type: Number,
      },
      qty: {
        type: Number,
      },
      size:{
        type:String,
      }
    },
  ],
  message:{
    type:String,
    require:false
  },
  statusHistory: [
    {
      status: {
        type: String,
        enum: [
          "Order Placed",
          "Order Confirmed",
          "Preparing",
          "Ready for Pickup",
          "Completed",
          "Cancelled",
        ],
      required:false

      },
      time: {
        type: Date,
        required:false
      },
    },
  ],
  currentStatus: {
    status: {
      type: String,
      required:false,
      enum: [
        "Order Placed",
        "Order Confirmed",
        "Preparing",
        "Ready for Pickup",
        "Completed",
        "Cancelled",
      ],
    },
    time: {
      type: Date,
      required:false
    },
  },
  feedback:{
    type:Boolean,
    required:false,
  },
  paymentMethod: {
    type: String,
    enum: ["esewa", "cash"],
    required:false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

orderSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
