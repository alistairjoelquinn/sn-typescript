const express = require('express');

const {
    getInitialFrienshipStatus,
    addFriend,
    acceptFriend,
    endFriendship,
    getFriendsList,
} = require('../controllers/friendshipController');

const router = express.Router();

router.get('/get-initial-status/:id', getInitialFrienshipStatus);
router.post('/add-friend/:id', addFriend);
router.post('/accept-friend/:id', acceptFriend);
router.post('/end-friendship/:id', endFriendship);
router.get('/friends-list', getFriendsList);

module.exports = router;
