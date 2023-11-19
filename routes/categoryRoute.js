const categoryRoute = require('express').Router();
const Category = require('../models/categoryModel');


// Create a category
categoryRoute.post('/', async (req, res) => {
    try {
      const { name, description } = req.body;
      const newCategory = new Category({ name, description });
      await newCategory.save();
      res.status(201).json({ message: 'Category created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  
// Get all categories
categoryRoute.get('/', async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Get a single category by ID
  categoryRoute.get('/:id', async (req, res) => {
    try {
      const categoryId = req.params.id;
      const category = await Category.findById(categoryId);
  
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
  
      res.status(200).json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Update a category by ID
  categoryRoute.put('/:id', async (req, res) => {
    try {
      const categoryId = req.params.id;
      const { name, description } = req.body;
  
      const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        { name, description },
        { new: true } // Return the updated document
      );
  
      if (!updatedCategory) {
        return res.status(404).json({ error: 'Category not found' });
      }
  
      res.status(200).json(updatedCategory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Delete a category by ID
  categoryRoute.delete('/:id', async (req, res) => {
    try {
      const categoryId = req.params.id;
      const deletedCategory = await Category.findByIdAndDelete(categoryId);
  
      if (!deletedCategory) {
        return res.status(404).json({ error: 'Category not found' });
      }
  
      res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
module.exports = categoryRoute;
