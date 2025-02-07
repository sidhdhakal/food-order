const express = require('express');
const router = express.Router();
const Order = require('../models/Order')
const { getAll,  } = require('../controllers/handlerFactory');
const { createOrder, getCurrentOrder, updateCurrentOrder, getTodaysOrder, getOlderOrders } = require('../controllers/OrderController');

router.get('/', (req, res) => {
    res.send("This is Order page");
  });
  

router.get('/getorders',getAll(Order))

router.post('/createorder',createOrder)

router.post('/getcurrentorder',getCurrentOrder)

router.post('/gettodaysorders', getTodaysOrder)

router.post('/getolderorders', getOlderOrders)

router.put('/updatecurrentorder/:id',updateCurrentOrder)

module.exports=router