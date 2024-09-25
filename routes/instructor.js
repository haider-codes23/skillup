const express = require('express');
const Instructor = require('../models/instructor');
const {body, checkSchema, validationResult} = require('express-validator');
const instructorValidationScehma = require('../express-validation-schemas/instructorValidationSchema');


const router = express();

// Endpoint for getting all instructors
router.get('/', async (req, res) => {
  try {
    const instructor = await Instructor.findAll();
    if (instructor) {
      res.status(201).json(instructor);
    } else {
      res.status(404).send("instructor not found");
    };
  } catch (error) {
      res.status(500).send(error.message);
  };
});

// Endpoint for getting a single instructor
router.get('/:id', async (req, res) => {
  try {
    const instructor = await Instructor.findByPk(req.params.id);
    if (instructor) {
      res.status(200).json(instructor);
    } else {
      res.status(404).send("instructor not found");
    }
  } catch (error) {
      res.status(500).send(error.message);
  };
});

// Endpoint for creating a new instructor
router.post('/', checkSchema(instructorValidationScehma), async (req, res) => {
  try {
    const result = validationResult(req);
    console.log(result);
    if (!result) return res.status(400).send({error: result.array()});

    const instructor = await Instructor.create({
      bio: req.body.bio,
      rating: req.body.rating
    });
    if (instructor) {
      res.status(201).json(instructor);
    } else {
      res.status(400).send("instructor not created");
    };
  } catch (error) {
    res.status(500).send(error.message);
  };
});

// Endpoint for updating a single instructor
router.put('/:id', checkSchema(instructorValidationScehma), async (req, res) => {
  try {
    const result = validationResult(req);
    console.log(result);
    if (!result) return res.status(400).send({error: result.array()});
    
    const instructors = await Instructors.findByPk(req.params.id);
    if (instructors) {
      await instructors.update({
        bio: req.body.bio,
        rating: req.body.rating
      });
      res.status(200).json(await Instructors.findByPk(req.params.id));
    } else {
      res.status(404).send("instructors not found");
    };
  } catch (error) {
      res.status(500).send(error.message);
  };
});

// Endpoint for deleting a single instructor
router.delete('/:id', async (req, res) => {
  try {
    const instructor = await Instructor.findByPk(req.params.id);
    if (instructor) {
      await instructor.destroy();
      res.status(204). send("instructor destroyed");
    } else {
      res.status(404).send("instructor not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  };
});

module.exports = router;