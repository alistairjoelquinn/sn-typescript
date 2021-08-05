const { getUserDataQuery, setProfilePic } = require('../database/db');

module.exports.getUserData = (req, res) => {
    const { userId } = req.session;
    getUserDataQuery(userId)
        .then(({ rows }) => {
            const responseData = {
                ...rows[0],
                userId: rows[0].id,
            };
            delete responseData.id;
            res.json(responseData);
        })
        .catch(() => res.sendStatus(500));
};

module.exports.uploaderUserImage = (req, res) => {
    const { userId } = req.session;
    const imageUrl = `https://s3.amazonaws.com/alsimageuniverse/${req.file.filename}`;
    setProfilePic(userId, imageUrl)
        .then(() => res.json({ image: imageUrl }))
        .catch(() => res.sendStatus(500));
};
