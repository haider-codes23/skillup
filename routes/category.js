const express = require('express');
const Category = require('../models/category');
const {body, checkSchema, validationResult} = require('express-validator');
const categoryValidationScehma = require('../express-validation-schemas/categoriesValidationSchema');
const {adminAuthorization} = require('../middleware/authorization');

const router = express();

// Endpoint for getting all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll();
    if (categories) {
      res.status(201).json(categories);
    } else {
      res.status(404).send("categories not found");
    };
  } catch (error) {
      res.status(500).send(error.message);
  };
});

// Endpoint for getting a single category
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).send("category not found");
    }
  } catch (error) {
      res.status(500).send(error.message);
  };
});

// Endpoint for creating a new category
router.post('/', adminAuthorization ,checkSchema(categoryValidationScehma), async (req, res) => {
  try {
    console.log(req.session.user);
    const result = validationResult(req);
    console.log(result);
    if (!result) return res.status(400).send({error: result.array()});

    const category = await Category.create({
      name: req.body.name,
      description: req.body.description
    });
    if (category) {
      res.status(201).json(category);
    } else {
      res.status(400).send("category not created");
    };
  } catch (error) {
    res.status(500).send(error.message);
  };
});

// Endpoint for updating a single category
router.put('/:id', checkSchema(categoryValidationScehma), async (req, res) => {
  try {
    const result = validationResult(req);
    console.log(result);
    if (!result) return res.status(400).send({error: result.array()});

    const category = await Category.findByPk(req.params.id);
    if (category) {
      await category.update({
        name: req.body.name,
        description: req.body.descriptio
      });
      res.status(200).json(await Category.findByPk(req.params.id));
    } else {
      res.status(404).send("category not found");
    };
  } catch (error) {
      res.status(500).send(error.message);
  };
});

// Endpoint for deleting a single category
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (category) {
      await category.destroy();
      res.status(204).send("category destroyed");
    } else {
      res.status(404).send("category not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  };
});

module.exports = router;