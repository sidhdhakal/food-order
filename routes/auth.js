const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bc = require('bcryptjs');
const jwtsec = "babishisagoodboy";
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { protect } = require('../Utils/Protect');
const { restrictTo } = require('../Utils/RestrictTo');

router.get('/',(req, res)=>{
  res.send("This is auth page");
})


router.post('/signup', [
  body('password').isLength({ min: 6 }),
  body('email').isEmail()
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return console.log('Validation failed');

  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.json({status:false, message:'User Already Exists!'})
  }
  const salt = await bc.genSalt(10);
  const pass = await bc.hash(req.body.password, salt);
  let newuser = await User.create({
    name: req.body.name,
    password: pass,
    email: req.body.email,
  });

  newuser.save();
  return res.json({ success:true, message:'User Signup Successfully' })
});


router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
  ], async (req, res) => {
    let loginstatus=false;
    const error = validationResult(req);
    if (!error.isEmpty())
      return console.log("validation failed");
  
    const password = req.body.password;
    const email = req.body.email;
    let user = await User.findOne({ email });
    if (!user)
      return res.json({loginstatus})
    const passcmp = await bc.compare(password, user.password);
    if(!passcmp)
    return res.json({loginstatus}) 
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, jwtsec);
  
    loginstatus=true
    return res.json({authtoken, loginstatus, data})
  })


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