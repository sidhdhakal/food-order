const express = require('express');
const router = express.Router();
const Food = require('../models/Food');  
const categoryController = require('../controllers/CategoryController')
const { protect } = require('../Utils/Protect');
const { restrictTo } = require('../Utils/RestrictTo');
const { getAll,  updateOne, createOne } = require('../controllers/handlerFactory');
const Category = require('../models/Category');
const {createFood,updateFoodTemp, updateFood, deleteFood, getFoods, getRecommendedFoods} =require('../controllers/foodController')


router.get('/', (req, res) => {
  res.send("This is Food page");
});

//category
router.get('/category',getAll(Category))
router.post('/category/addcategory',
  protect,restrictTo('admin'),
  createOne(Category))
router.put('/category/updatecategory/:id',
  protect,restrictTo('admin'),
  updateOne(Category))
router.delete('/category/deletecategory/:id',
  protect,restrictTo('admin'),
  categoryController.deleteCategory)


router.get('/getfoods',getFoods)
router.post('/up', updateFoodTemp)
router.get('/adminfoods', getAll(Food))

router.post('/createfood',
  protect,restrictTo('admin'),
  createFood)

router.put('/updatefoodavailability/:id', 
  protect,restrictTo('admin'),
  updateOne(Food))

router.put('/updateFood/:id',
  protect,restrictTo('admin'),
  updateFood)

router.delete('/deletefood/:id',
  protect,restrictTo('admin'),
  deleteFood)

router.get('/getrecommendedfoods',
  protect,
  getRecommendedFoods
)

module.exports = router;
