const camelCase = require('lodash/camelCase');
const mapKeys = require('lodash/mapKeys');
const {
    friendshipStatus,
    addFriendQuery,
    acceptFriendQuery,
    removeFriendQuery,
    getRequestsFriends,
} = require('../database/db');

module.exports.getInitialFrienshipStatus = (req, res) => {
    const { userId } = req.session;
    const { id } = req.params;
    friendshipStatus(userId, id)
        .then(({ rows }) => res.json(rows[0]))
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
        .then(({ rows }) => res.json(rows[0]))
        .catch(() => res.sendStatus(500));
};

module.exports.endFriendship = (req, res) => {
    const { id } = req.params;
    removeFriendQuery(id)
        .then(({ rows }) => res.json(rows[0]))
        .catch(() => res.sendStatus(500));
};

module.exports.getFriendsList = (req, res) => {
    const { userId } = req.session;
    getRequestsFriends(userId)
        .then(({ rows }) => {
            res.json(rows.map((row) => mapKeys(row, (_, key) => camelCase(key))));
        })
        .catch(() => res.sendStatus(500));
};
