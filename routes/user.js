const express = require("express");
const User = require("../models/user");
const bcrypt = require('bcrypt');
const {body, checkSchema, validationResult} = require('express-validator');
const userValidationScehma = require('../express-validation-schemas/userValidationSchema')
const authorization = require('../middleware/authorization');

const router = express();

// Create an endpoint for adding a new user
router.post('/', checkSchema(userValidationScehma) ,async (req, res) => {
  
  try {
    const result = validationResult(req);
    console.log(result);
    if (!result) return res.status(400).send({error: result.array()});
    
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      created_at: new Date(),
    });
    res.status(201).json(user);
  } catch(error) {
      res.status(400).send(error.message);
  };
  
});

// Create an endpoint for getting all user
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(201).json(users);
  } catch (error) {
      res.status(500).send(error.message);
  };
});

// Endpoint for getting a single user
router.get('/:id', (req, res) => {
  try {
    const user = User.findByPk(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).send("User not found");
    };
  } catch (error) {
    res.status(500).send("User not found");
  };
});

// Endpoint for updating a user
router.put('/:id', checkSchema(userValidationScehma), async (req, res) => {
  try {
    const result = validationResult(req);
    console.log(result);
    if (!result) return res.status(400).send({error: result.array()});
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.update({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        updated_at: new Date()
      });
      res.status(200).json(await User.findByPk(req.params.id));
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  };
});

// Endpoint for deleteing a User
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.status(204).send("user has been destroyed");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
      res.status(500).send(error.message);
  };
});

module.exports = router;

