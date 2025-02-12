const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback')

const { createOrder, getCurrentOrder, updateCurrentOrder, getTodaysOrder, getOlderOrders, getAllOrders } = require('../controllers/OrderController');
const { protect } = require('../Utils/Protect');
const { restrictTo } = require('../Utils/RestrictTo');
const { getAll, createOne, updateOne } = require('../controllers/handlerFactory');
const { createFeedback, getMyFeedbacks } = require('../controllers/FeedbackController');
router.get('/', (req, res) => {
    res.send("This is Feedback page");
  });
  

router.get('/getallfeedbacks',
  protect,restrictTo('admin'),
  getAll(Feedback))

router.get('/getmyfeedbacks',protect, getMyFeedbacks)

router.post('/createfeedback',protect,createFeedback)

router.put('/replytofeedback/:id',
    protect, restrictTo('admin'),
    updateOne(Feedback))

// router.get('/gettodaysorders', protect, getTodaysOrder)

// router.get('/getolderorders',protect, getOlderOrders)

// router.put('/updatecurrentorder',
//   protect,restrictTo('admin'),
//   updateCurrentOrder)

module.exports=router