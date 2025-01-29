const express = require('express');
const router = express.Router();
const Food = require('../models/Food');  // Make sure to import the Food model
const cloudinary = require('../Utils/CloudinaryConfig');
const multer = require('multer');
const { body, validationResult } = require('express-validator');
const categoryController = require('../controllers/CategoryController')
const { protect } = require('../Utils/Protect');
const { restrictTo } = require('../Utils/RestrictTo');


const storage = multer.memoryStorage();  // Store file in memory (buffer)
const upload = multer({ storage: storage });

router.get('/', (req, res) => {
  res.send("This is Food page");
});

router.get('/category',categoryController.getCategories)
router.post('/category/addcategory',
  // protect,restrictTo('admin'),
  categoryController.addCategory)
router.put('/category/updatecategory/:id',
  // protect,restrictTo('admin'),
  categoryController.updateCategory)
router.delete('/category/deletecategory/:id',
  // protect,restrictTo('admin'),
  categoryController.deleteCategory)

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




router.post('/createFood', upload.single('image'), [
  // Validate incoming data
  body('name').notEmpty().withMessage('Name is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('category').notEmpty().withMessage('Category is required'),
], async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    let imageUrl = '';
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.buffer, {
        folder: 'foodMate_foods', // Optional: specify a folder in Cloudinary
        public_id: `food_${Date.now()}`, // Use a timestamp to avoid duplicate public IDs
        resource_type: 'image', // The type of the file (image)
      });
      imageUrl = result.secure_url; // The URL of the uploaded image in Cloudinary
    }

    // Collect food data from req.body (form-data)
    const foodData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      available: req.body.available === 'true', // Convert string "true"/"false" to boolean
      image: imageUrl, // Add the image URL to the food data
    };

    // Create a new Food document with the food data
    const newFood = new Food(foodData);

    // Save the food item to the database
    await newFood.save();

    // Respond with success
    return res.status(201).json({
      success: true,
      message: 'Food item created successfully!',
      food: newFood,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ success: false, message: e.message });
  }
});

module.exports = router;
