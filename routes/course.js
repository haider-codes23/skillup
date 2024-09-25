const express = require('express');
const Course = require('../models/course');
const {body, checkSchema, validationResult} = require('express-validator');
const coursesValidationScehma = require('../express-validation-schemas/coursesValidationScehma');



const router = express();

//Endpoint for getting all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.findAll();
    if (!courses) res.status(404).send("There are no Courses in the Database");
    res.status(200).json(courses);
  } catch (error) {
      res.status(500).send(error.message);
  };
});

//Endpoint for getting a single Course
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (course) {
      res.status(200).json(course);
    } else {
      res.status(404).send("Course not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  };
});

// Endpoint for creating a new Course
router.post('/', checkSchema(coursesValidationScehma) ,async (req, res) => {
  try {
    const result = validationResult(req);
    console.log(result);
    if (!result) return res.status(400).send({error: result.array()});
    const course = await Course.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      created_at: new Date()
    });
    res.status(200).json(course);
  } catch (error) {
    res.status(400).send(error.message);
  };
});

// Endpoint for updating a course
router.put('/:id', checkSchema(coursesValidationScehma) ,async (req, res) => {
  try {
    const result = validationResult(req);
    console.log(result);
    if (!result) return res.status(400).send({error: result.array()});
    const course = await Course.findByPk(req.params.id);
    if(course) {
      await course.update({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        updated_at: new Date()
      });
      res.status(200).json(await Course.findByPk(req.params.id));
    } else {
      res.status(400).send("Course not found");
    };
  } catch (error) {
      res.status(500).send(error.message);
  };
});

// Endpoint for deleting a course
router.delete('/:id', async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (course) {
      course.destroy();
      res.status(204).send("Course has been destroyed");
    } else {
      res.status(404).send("Course not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  };
});



module.exports = router;