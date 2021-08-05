const express = require('express');

const { getUserData, uploaderUserImage } = require('../controllers/userController');
const { uploader } = require('../upload');
const s3 = require('../s3');

const router = express.Router();

router.get('/get-data', getUserData);
router.post('/upload', uploader.single('image'), s3.upload, uploaderUserImage);

module.exports = router;
