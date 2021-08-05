const multer = require('multer');
const uidSafe = require('uid-safe');
const path = require('path');

const diskStorage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, `${__dirname}/uploads`);
    },
    filename(req, file, callback) {
        uidSafe(24).then((uid) => {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

module.exports.uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 3097152,
    },
});
