const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const { hash } = require('./auth');
const { newUser } = require("./database/db");
const cookieSession = require('cookie-session');
const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(compression());
app.use(cookieSessionMiddleware);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get('/user/id.json', function (req, res) {
    res.json({
        userId: req.session.userId
    });
});

app.post('/register', (req, res) => {
    const { first, last, email, password } = req.body;
    hash(password).then((passHash) => {
        newUser(first, last, email, passHash).then(({ rows }) => {
            req.session.userId = rows[0].id;
            res.json({ success: true });
        }).catch((err) => {
            console.log(err);
            res.json({ success: false });
        });
    }).catch((err) => {
        console.log(err);
        res.json({ success: false });
    });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
