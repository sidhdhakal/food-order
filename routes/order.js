const express = require('express');
const router = express.Router();
const Order = require('../models/Order')

const { createOrder, getCurrentOrder, updateCurrentOrder, getTodaysOrder, getOlderOrders, getAllOrders } = require('../controllers/OrderController');
const { protect } = require('../Utils/Protect');
const { restrictTo } = require('../Utils/RestrictTo');
router.get('/', (req, res) => {
    res.send("This is Order page");
  });
  

router.get('/getallorders',
  protect,restrictTo('admin'),

  getAllOrders)

router.post('/createorder',protect,createOrder)

router.get('/getcurrentorder',protect, getCurrentOrder)

router.get('/gettodaysorders', protect, getTodaysOrder)

router.get('/getolderorders',protect, getOlderOrders)

router.put('/updatecurrentorder',
  protect,restrictTo('admin'),
  updateCurrentOrder)

module.exports=router