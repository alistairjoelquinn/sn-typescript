const { hash, compare } = require('../auth');
const { addNewUser, getUserPassword } = require('../database/db');

module.exports.checkLoggedInUser = (req, res) => {
    res.json({
        userId: req.session.userId,
    });
};

module.exports.createNewUser = (req, res) => {
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
};

module.exports.logUserIn = (req, res) => {
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
};
