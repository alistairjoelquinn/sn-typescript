const express = require('express');

const {
    getUserData,
    uploaderUserImage,
    setUserBio,
    getRecentUsers,
    searchForUsers,
    getOtherUser,
    getInitialFrienshipStatus,
} = require('../controllers/userController');
const { uploader } = require('../upload');
const s3 = require('../s3');

const router = express.Router();

router.get('/get-data', getUserData);
router.post('/upload', uploader.single('image'), s3.upload, uploaderUserImage);
router.post('/set-bio', setUserBio);
router.get('/recent-users', getRecentUsers);
router.get('/user-search/:q', searchForUsers);
router.get('/other-user/:id', getOtherUser);
router.get('/get-initial-status/:id', getInitialFrienshipStatus);

module.exports = router;
