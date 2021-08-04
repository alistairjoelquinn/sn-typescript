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

module.exports.verifyuserByEmail = (email) =>
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

module.exports.codeCheck = (email) =>
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
