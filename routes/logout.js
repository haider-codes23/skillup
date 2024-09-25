const express = require('express');

const router = express();



router.post('/', async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({error: "Failed to logout"});
      }
      res.json({
        message: "Logout successfull"
      });
    });

  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

module.exports = router;