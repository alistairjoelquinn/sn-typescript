const express = require('express');
const { getUserData } = require('../controllers/userController');

const router = express.Router();

router.get('/get-data', getUserData);

module.exports = router;
