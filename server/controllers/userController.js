const { getUserDataQuery } = require('../database/db');

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
