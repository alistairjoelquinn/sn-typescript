const { friendshipStatus, addFriendQuery, acceptFriendQuery, removeFriendQuery } = require('../database/db');

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

module.exports.addFriend = (req, res) => {
    const { userId } = req.session;
    const { id } = req.params;
    addFriendQuery(userId, id)
        .then(({ rows }) => res.json(rows[0]))
        .catch(() => res.sendStatus(500));
};

module.exports.acceptFriend = (req, res) => {
    const { id } = req.params;
    acceptFriendQuery(id)
        .then(({ rows }) => res.json(rows))
        .catch(() => res.sendStatus(500));
};

module.exports.endFriendship = (req, res) => {
    const { id } = req.params;
    removeFriendQuery(id)
        .then(({ rows }) => res.json(rows[0]))
        .catch(() => res.sendStatus(500));
};
