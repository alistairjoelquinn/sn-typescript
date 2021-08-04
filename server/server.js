const express = require('express');

const app = express();
const compression = require('compression');
const path = require('path');
const cookieSession = require('cookie-session');
const { hash, compare } = require('./auth');
const { addNewUser, getUserPassword } = require('./database/db');

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90,
    sameSite: true,
});

app.use(compression());
app.use(cookieSessionMiddleware);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'client', 'public')));

app.get('/user/id.json', (req, res) => {
    res.json({
        userId: req.session.userId,
    });
});

app.post('/register', (req, res) => {
    const { first, last, email, password } = req.body;
    hash(password)
        .then((passHash) => {
            addNewUser(first, last, email, passHash)
                .then(({ rows }) => {
                    req.session.userId = rows[0].id;
                    res.json({ success: true });
                })
                .catch((err) => {
                    console.log(err);
                    res.json({ success: false });
                });
        })
        .catch((err) => {
            console.log(err);
            res.json({ success: false });
        });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    getUserPassword(email)
        .then(({ rows }) => {
            compare(password, rows[0].password)
                .then((valid) => {
                    if (valid === true) {
                        req.session.userId = rows[0].id;
                        res.json({ success: true });
                    } else {
                        res.redirect(500, '/login');
                    }
                })
                .catch(() => res.redirect(500, '/login'));
        })
        .catch(() => res.redirect(500, '/login'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

app.listen(process.env.PORT || 3001, () => {
    console.log("I'm listening.");
});
