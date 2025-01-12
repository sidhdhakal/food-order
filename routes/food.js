const express = require('express');
const router = express.Router();
const Food = require('../models/Food');  // Make sure to import the Food model
const cloudinary = require('../Utils/Cloudinary');
const multer = require('multer');
const { body, validationResult } = require('express-validator');

// Multer setup to handle file uploads
const storage = multer.memoryStorage();  // Store file in memory (buffer)
const upload = multer({ storage: storage });

router.get('/', (req, res) => {
  res.send("This is Food page");
});

router.post('/temp',  (req, res) => {
    console.log(req.body); // Log form data
  
    const imagePath = req.body.image; // Get the uploaded image path
    
    // Upload image to Cloudinary
    cloudinary.uploader.upload(imagePath, { resource_type: 'auto' }, (error, result) => {
      if (error) {
        console.log(error.message)
        return res.status(500).json({ error: error.message });
      }
  
      // Send the Cloudinary response back to the client
      res.status(200).json({
        message: 'Image uploaded successfully',
        url: result.secure_url, // URL of the uploaded image
      });
    });
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
    // Handle image upload to Cloudinary if an image is provided
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
