const spicedPg = require('spiced-pg');

const db = spicedPg(process.env.DATABASE_URL || 'postgres:postgres:postgres@localhost:5432/sn-typescript');

module.exports.addNewUser = (first, last, email, passHash) =>
    db.query(
        `INSERT INTO users (first, last, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING first, last, id`,
        [first, last, email, passHash],
    );

module.exports.getUserPassword = (email) =>
    db.query(
        `SELECT password, id FROM users 
        WHERE email = $1`,
        [email],
    );

module.exports.verifyUserByEmail = (email) =>
    db.query(
        `SELECT id, email FROM users
        WHERE email = $1`,
        [email],
    );

module.exports.newPasswordResetCode = (code, email) =>
    db.query(
        `INSERT INTO password_reset_codes (code, email)
        VALUES ($1, $2)`,
        [code, email],
    );

module.exports.passwordResetCodeCheck = (email) =>
    db.query(
        `SELECT * FROM password_reset_codes
        WHERE CURRENT_TIMESTAMP - create_at < INTERVAL '10 minutes' AND email = $1
        ORDER BY id DESC
        LIMIT 1`,
        [email],
    );

module.exports.updatePassword = (email, password) =>
    db.query(
        `UPDATE users SET password = $2
        WHERE email = $1
        RETURNING id`,
        [email, password],
    );

module.exports.getUserDataQuery = (id) =>
    db.query(
        `SELECT id, first, last, image, bio FROM users
        WHERE id = $1`,
        [id],
    );

module.exports.setProfilePic = (id, imageUrl) =>
    db.query(
        `UPDATE users SET image = $2
        WHERE id = $1`,
        [id, imageUrl],
    );

module.exports.updateUserBio = (id, bio) =>
    db.query(
        `UPDATE users SET bio = $2
        WHERE id = $1
        RETURNING bio`,
        [id, bio],
    );

module.exports.recentUserSearch = (id) =>
    db.query(
        `SELECT first, last, id, image FROM users
        WHERE id <> $1
        ORDER BY id DESC
        LIMIT 3`,
        [id],
    );

module.exports.userSearch = (search, current) =>
    db.query(
        `SELECT first, last, id, image FROM users
        WHERE first ILIKE $1 AND users.id <> $2
        OR last ILIKE $1 AND users.id <> $2
        OR concat(first, ' ', last) ILIKE $1 AND users.id <> $2;`,
        [`${search}%`, current],
    );

module.exports.getOtherUserData = (id) =>
    db.query(
        `SELECT first, last, image, bio, id as userId FROM users
        WHERE id = $1`,
        [id],
    );

module.exports.friendshipStatus = (idMe, idYou) =>
    db.query(
        `SELECT sender_id, recipient_id, accepted, id 
        FROM friendships 
        WHERE (recipient_id = $1 AND sender_id = $2)
        OR (recipient_id = $2 AND sender_id = $1)`,
        [idMe, idYou],
    );

module.exports.addFriendQuery = (idMe, idYou) =>
    db.query(
        `INSERT INTO friendships (sender_id, recipient_id)
        VALUES ($1, $2)
        RETURNING sender_id, recipient_id, accepted, id`,
        [idMe, idYou],
    );

module.exports.acceptFriendQuery = (id) =>
    db.query(
        `UPDATE friendships 
        SET accepted = true
        WHERE id = $1 
        RETURNING sender_id, recipient_id, accepted, id`,
        [id],
    );

module.exports.removeFriendQuery = (id) =>
    db.query(
        `DELETE FROM friendships
        WHERE id = $1`,
        [id],
    );

module.exports.getRequestsFriends = (id) =>
    db.query(
        `SELECT first, last, image, accepted, friendships.id as friendship_id, users.id AS id
            FROM friendships
            JOIN users
            ON (accepted = false AND recipient_id = $1 AND sender_id = users.id)
            OR (accepted = true AND recipient_id = $1 AND sender_id = users.id)
            OR (accepted = true AND sender_id = $1 AND recipient_id = users.id)`,
        [id],
    );

module.exports.getLastTenChatMessages = () =>
    db.query(
        `SELECT comment, comments.id AS comment_id, users.id AS id, image, first, comments.created_at AS time FROM comments
        LEFT JOIN users
        ON user_id = users.id
        ORDER BY comments.id DESC
        LIMIT 10`,
    );

module.exports.newChatMessage = (id, comment) =>
    db.query(
        `INSERT INTO comments (user_id, comment)
        VALUES ($1, $2)
        RETURNING id, user_id, comment`,
        [id, comment],
    );

module.exports.getAuthorInfo = () =>
    db.query(
        `SELECT comment, comments.id AS comment_id, users.id AS id, image, first, comments.created_at AS time FROM comments
        LEFT JOIN users
        ON user_id = users.id
        ORDER BY comments.id DESC
        LIMIT 1`,
        [],
    );
