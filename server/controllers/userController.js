const { getUserDataQuery, setProfilePic, updateUserBio } = require('../database/db');

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

module.exports.setUserBio = (req, res) => {
    const { bio } = req.body;
    const { userId } = req.session;
    updateUserBio(userId, bio)
        .then(({ rows }) => res.json(rows[0]))
        .catch(() => res.sendStatus(500));
};
