const express = require('express');
const router = express.Router();
const Food = require('../models/Food');  // Make sure to import the Food model
const cloudinary = require('../Utils/CloudinaryConfig');
const multer = require('multer');
const { body, validationResult } = require('express-validator');
const categoryController = require('../controllers/CategoryController')
const { protect } = require('../Utils/Protect');
const { restrictTo } = require('../Utils/RestrictTo');
const { getAll, deleteOne, updateOne, createOne } = require('../controllers/handlerFactory');
const Category = require('../models/Category');
const {createFood} =require('../controllers/foodController')


const storage = multer.memoryStorage();  // Store file in memory (buffer)
const upload = multer({ storage: storage });

router.get('/', (req, res) => {
  res.send("This is Food page");
});

//category
router.get('/category',getAll(Category))
router.post('/category/addcategory',
  // protect,restrictTo('admin'),
  createOne(Category))
router.put('/category/updatecategory/:id',
  // protect,restrictTo('admin'),
  updateOne(Category))
router.delete('/category/deletecategory/:id',
  // protect,restrictTo('admin'),
  categoryController.deleteCategory)


  router.get('/getfoods',getAll(Food))

router.post('/createfood',createFood)

router.put('/updatefoodavailability/:id', updateOne(Food))

router.post('/uploadphoto', (req, res) => {

  const iamge = req.body.image; // Get the uploaded image path

  cloudinary.uploader.upload(iamge, { resource_type: 'auto', folder: 'Foods' }, (error, result) => {
    if (error) {
      console.log(error.message)
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json({
      message: 'Image uploaded successfully',
      url: result.secure_url, // URL of the uploaded image
    });
  });

});

router.post('/deletephoto', async (req, res) => {

  const imageUrl = req.body.imageUrl; // Get the uploaded image path

  try {
    const publicId = imageUrl.split('/').slice(-1)[0].split('.')[0];
    
    await cloudinary.uploader.destroy(publicId);

    res.status(200).json({ message: "Image deleted successfully" });

  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    
    res.status(500).json({ message: "Error deleting image from Cloudinary", error: error.message });
  }
});


module.exports = router;
