const express = require('express');

const router = express.Router();

const {
    checkLoggedInUser,
    createNewUser,
    logUserIn,
    checkEmailForReset,
    verifyAndResetUsersPassword,
    logUserOut,
} = require('../controllers/authcontroller');

router.get('/user/id.json', checkLoggedInUser);
router.post('/register', createNewUser);
router.post('/login', logUserIn);
router.get('/logout', logUserOut);
router.post('/password-reset/email-check', checkEmailForReset);
router.post('/password-reset/verify-code', verifyAndResetUsersPassword);

module.exports = router;
