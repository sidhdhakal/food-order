const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bc = require('bcryptjs');
const jwtsec = "babishisagoodboy";
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { protect } = require('../Utils/Protect');
const { restrictTo } = require('../Utils/RestrictTo');
const {signup, login, verifyemail} = require('../controllers/AuthController')

router.get('/',(req, res)=>{
  res.send("This is auth page");
})

router.post('/verifyemail', verifyemail )

router.post('/signup',signup)

router.post('/login',login)



  router.get('/getUsers',protect,restrictTo('admin'),async(req, res)=>{
    try{
      let users=await User.find();
      return res.json({success:true, users})
    } catch(e){
     return res.json({success:false, message:e.message}) 
    }
  })

module.exports = router;

router.get('/getUser/:id', protect, restrictTo('admin'), async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.json({ success: true, user });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
});


module.exports = router;