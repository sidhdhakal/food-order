const Category = require("../models/Category");
const User = require("../models/User");

exports.addCategory = async (req, res) => {
  try {
    const oldCategory = await User.findOne({ name: req.body.name });
    if (oldCategory)
      return res.status(400).json({
        success: false,
        message: "Category Already Exists",
      });
    const newCategory = await Category.create(req.body);
    if (newCategory) {
      return res.status(200).json({
        success: true,
        message: "Category created successfully",
        doc: newCategory,
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories=await Category.find()
    if(categories){
        return res.status(200).json({
            success: true,
            message: "Category fetched successfully",
            doc: categories,
          });
    }

  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

exports.deleteCategory = async (req, res) => {
    try {
      const category = await Category.findByIdAndDelete(req.body.id); 
      if (category) {
          return res.status(200).json({
              success: true,
              message: "Category Deleted successfully",
              doc: category,
          });
      } else {
          return res.status(404).json({
              success: false,
              message: "Category not found",
          });
      }
  
    } catch (err) {
      console.error(err); 
      res.status(400).json({
        success: false,
        message: "Internal Server Error!",
      });
    }
};


exports.updateCategory = async (req, res) => {
    try {
      const categoryToUpdate = await Category.findOne({ id: req.params.id });
      
      if (!categoryToUpdate) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }
  
      // Check if new name conflicts with existing category (if name is being updated)
      if (req.body.name && req.body.name !== categoryToUpdate.name) {
        const existingCategory = await Category.findOne({ name: req.body.name });
        if (existingCategory) {
          return res.status(400).json({
            success: false,
            message: "Category with this name already exists",
          });
        }
      }
  
      const updatedCategory = await Category.findOneAndUpdate(
        { id: req.params.id },
        {
          ...req.body,
          updatedAt: Date.now()
        },
        { new: true } // Returns the updated document
      );
  
      return res.status(200).json({
        success: true,
        message: "Category updated successfully",
        doc: updatedCategory,
      });
  
    } catch (err) {
      console.error(err); // Log the error for debugging
      return res.status(500).json({
        success: false,
        message: "Internal Server Error!",
      });
    }
  };