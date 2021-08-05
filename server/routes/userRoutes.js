const express = require('express');

const router = express.Router();

router.get('/get-data', getUserData);

module.exports = router;
