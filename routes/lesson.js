const express = require('express');
const Lesson = require('../models/lesson');
const {body, checkSchema, validationResult} = require('express-validator');
const lessonValidationScehma = require('../express-validation-schemas/lessonValidationSchema');


const router = express();

// Endpoint for getting all lessons
router.get('/', async (req, res) => {
  try {
    const lessons = await Lesson.findAll();
    if (lessons) {
      res.status(201).json(lessons);
    } else {
      res.status(404).send("Lessons not found");
    };
  } catch (error) {
      res.status(500).send(error.message);
  };
});

// Endpoint for getting a single Lesson
router.get('/:id', async (req, res) => {
  try {
    const lesson = await Lesson.findByPk(req.params.id);
    if (lesson) {
      res.status(200).json(lesson);
    } else {
      res.status(404).send("Lesson not found");
    }
  } catch (error) {
      res.status(500).send(error.message);
  };
});

// Endpoint for creating a lesson
router.post('/', checkSchema(lessonValidationScehma), async (req, res) => {
  try {
    const result = validationResult(req);
    console.log(result);
    if (!result) return res.status(400).send({error: result.array()});
    const lesson = await Lesson.create({
      title: req.body.title,
      content: req.body.content,
      duration: req.body.duration,
      order: req.body.order,
      created_at: new Date(),
      //updated_at: new Date()
    });
    if (lesson) {
      res.status(201).json(lesson);
    } else {
      res.status(400).send("Lesson not created");
    };
  } catch (error) {
    res.status(500).send(error.message);
  };
});

// Endpoint for updating a lesson
router.put('/:id', checkSchema(lessonValidationScehma), async (req, res) => {
  try {
    const result = validationResult(req);
    console.log(result);
    if (!result) return res.status(400).send({error: result.array()});
    const lesson = await Lesson.findByPk(req.params.id);
    if (lesson) {
      await lesson.update({
        title: req.body.title,
        content: req.body.content,
        duration: req.body.duration,
        order: req.body.order,
        updated_at: new Date()
      });
      res.status(200).json(await Lesson.findByPk(req.params.id));
    } else {
      res.status(404).send("lesson not found");
    };
  } catch (error) {
      res.status(500).send(error.message);
  };
});

// Endpoint for deleting a lesson
router.delete('/:id', async (req, res) => {
  try {
    const lesson = await Lesson.findByPk(req.params.id);
    if (lesson) {
      await lesson.destroy();
      res.status(204).send("lesson destroyed");
    } else {
      res.status(404).send("Lesson not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  };
});

module.exports = router;