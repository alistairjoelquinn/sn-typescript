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
