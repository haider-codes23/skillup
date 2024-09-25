const express = require('express');
const Feedback = require('../models/feedback');
const {body, checkSchema, validationResult} = require('express-validator');
const feedbackValidationScehma = require('../express-validation-schemas/feedbackValidationSchema')

const router = express();

// Endpoint for getting all feedbacks
router.get('/', async (req, res) => {
  try {
    const feedback = await Feedback.findAll();
    if (feedback) {
      res.status(201).json(feedback);
    } else {
      res.status(404).send("feedback not found");
    };
  } catch (error) {
      res.status(500).send(error.message);
  };
});

// Endpoint for getting a single feedback
router.get('/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findByPk(req.params.id);
    if (feedback) {
      res.status(200).json(feedback);
    } else {
      res.status(404).send("feedback not found");
    }
  } catch (error) {
      res.status(500).send(error.message);
  };
});

// Endpoint for creating a new feedback
router.post('/', checkSchema(feedbackValidationScehma), async (req, res) => {
  try {
    const result = validationResult(req);
    console.log(result);
    if (!result) return res.status(400).send({error: result.array()});
    const feedback = await Feedback.create({
      rating: req.body.rating,
      comment: req.body.comment,
      submitted_at: new Date()
    });
    if (feedback) {
      res.status(201).json(feedback);
    } else {
      res.status(400).send("feedback not created");
    };
  } catch (error) {
    res.status(500).send(error.message);
  };
});

// Endpoint for updating a single feedback
router.put('/:id', checkSchema(feedbackValidationScehma), async (req, res) => {
  try {
    const result = validationResult(req);
    console.log(result);
    if (!result) return res.status(400).send({error: result.array()});
    const feedback = await Feedback.findByPk(req.params.id);
    if (feedback) {
      await feedback.update({
        rating: req.body.rating,
        comment: req.body.comment,
        submitted_at: new Date()
      });
      res.status(200).json(await Feedback.findByPk(req.params.id));
    } else {
      res.status(404).send("feedback not found");
    };
  } catch (error) {
      res.status(500).send(error.message);
  };
});

// Endpoint for deleting a single feedback
router.delete('/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findByPk(req.params.id);
    if (feedback) {
      await feedback.destroy();
      res.status(204).send("Feedback destroyed");
    } else {
      res.status(404).send("feedback not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  };
});

module.exports = router;