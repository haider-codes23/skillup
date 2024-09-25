const express = require("express");
const Enrollment = require("../models/enrollment");
const {body, checkSchema, validationResult, check} = require('express-validator');
const enrollemntValidationScehma = require('../express-validation-schemas/enrollmentValidationSchema');


const router = express();

// Endpoint for getting all enrollments
router.get("/", async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll();
    if (enrollments) {
      res.status(201).json(enrollments);
    } else {
      res.status(400).send("No Enrollments created yet");
    }
  } catch (error) { 
      res.status(500).send(error.message);
  };
});

// Endpoint for getting a single enrollment
router.get('/:id', async (req, res) => {
  try {
    const enrollment = await Enrollment.findByPk(req.params.id);
    if (enrollment) {
      res.status(200).json(enrollment);
    } else {
      res.status(400).send("Enrollment not found");
    };
  } catch (error) {
      res.status(500).send(error.message);
  };
});

// Endpoint for creating an Enrollment
router.post("/", checkSchema(enrollemntValidationScehma), async (req, res) => {
  try {
    const result = validationResult(req);
    console.log(result);
    if (!result) return res.status(400).send({error: result.array()});
    const enrollment = await Enrollment.create({
      enrollment_date: new Date(),
      progress: req.body.progress,
      is_complete: req.body.is_complete
    });
    if (enrollment) {
      res.status(200).json(enrollment);
    } else {
      res.status(400).send("Cannot create Enrollment")
    }
  } catch (error) {
    res.status(500).send(error.message)
  };
});

//Endpoint for getting a updating a single enrollment
router.put("/:id", checkSchema(enrollemntValidationScehma), async (req, res) => {
  try {
    const result = validationResult(req);
    console.log(result);
    if (!result) return res.status(400).send({error: result.array()});
    const enrollment = await Enrollment.findByPk(req.param.id);
    if (enrollment) {
      Enrollment.update({
        enrollment_date: new Date(),
        progress: req.body.progress,
        is_complete: req.body.is_complete
      });
      res.status(200).json(await Enrollment.findByPk(req.params.id));
    } else {
      res.status(404).send("Enrollment not found");
    };
  } catch (error) {
    res.status(500).send(error.message);
  };
});

// Endpoint for deleting an enrollemnt
router.delete('/:id', async (req, res) => {
  try {
    const enrollment = await Enrollment.findByPk(req.params.id);
    if (enrollment) {
       await enrollment.destroy();
       res.status(204).send("Enrollment has been destroyed");
    } else {
      res.status(404).send("Enrollment not found");
    }
  } catch (error) {
      res.status(500).send(error.message);
  };
});

module.exports = router;