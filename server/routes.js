const express = require('express');

const router = express.Router();

const { checkLoggedInUser, createNewUser, logUserIn } = require('./controllers/authcontroller');

router.get('/user/id.json', checkLoggedInUser);
router.post('/register', createNewUser);
router.post('/login', logUserIn);

module.exports = router;
