const { friendshipStatus } = require('../database/db');

module.exports.getInitialFrienshipStatus = (req, res) => {
    const { userId } = req.session;
    const { id } = req.params;
    friendshipStatus(userId, id)
        .then(({ rows }) => {
            console.log('rows: ', rows);
            return res.json(rows[0]);
        })
        .catch(() => res.sendStatus(500));
};

module.exports.addFriend = (req, res) => { };

module.exports.acceptFriend = (req, res) => { };

module.exports.endFriendship = (req, res) => { };
