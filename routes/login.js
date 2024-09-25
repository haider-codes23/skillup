const express = require('express');
const User = require('../models/user');
const bcrypt = require("bcrypt");
const {checkSchema, validationResult, check} = require('express-validator');
const userValidationScehma = require('../express-validation-schemas/userValidationSchema')



const router = express();



router.post('/', checkSchema(userValidationScehma), async (req, res) => {
  try {
    // first we validate the user name, email and password in the body of the request
    const result = validationResult(req);
    console.log(result);
    if (!result) return res.status(400).send({error: result.array()});
  
    let user = await User.findOne({ where: {email: req.body.email} });
    if (!user) return res.status(400).send("Invalid email");
  
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("Invalid Pasword");
    req.session.user = user;
    res.json(req.session);

  } catch (error) {
    res.status(500).json({error: error.message});
  }
});



module.exports = router;