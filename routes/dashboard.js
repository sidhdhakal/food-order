const express = require('express');
const router = express.Router();
const { protect } = require('../Utils/Protect');
const { restrictTo } = require('../Utils/RestrictTo');


const { getData } = require('../controllers/DashboardController');


router.get('/', (req, res) => {
    res.send("This is Dashboard page");
  });
  

router.post('/getdata',
  protect,restrictTo('admin'),
  getData)


module.exports=router
