const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userId: {
    type: String,
    required: true,
    ref:"User"
  },
  items: [
    {
      itemId:{
        type:String,
        required:false,
        ref:"Food"
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
  paymentDetails:{
    transaction_code:{
      type:String,
      required:false
    },
    status:{
      type:String,
      required:false
    },
    total_amount:{
      type:String,
      required:false
    },
    transaction_uuid:{
      type:String,
      required:false
    },
    product_code:{
      type:String,
      required:false
    },
  },
  feedback:{
    type:Boolean,
    required:false,
  },
  cancelMessage:{
    type:String,
    required:false
  },
  paymentMethod: {
    type: String,
    enum: ["esewa", "cash",'Not Paid'],
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
