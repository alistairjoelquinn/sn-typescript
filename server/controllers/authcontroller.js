const cryptoRandomString = require('crypto-random-string');

const { hash, compare } = require('../auth');
const { addNewUser, getUserPassword, verifyuserByEmail, newPasswordResetCode } = require('../database/db');
const { sendEmail } = require('../ses');

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

module.exports.checkEmailForReset = (req, res) => {
    const { email } = req.body;
    verifyuserByEmail(email)
        .then(({ rows }) => {
            if (rows[0].id) {
                const secretCode = cryptoRandomString({
                    length: 6,
                });
                newPasswordResetCode(secretCode, email)
                    .then(() => {
                        sendEmail(
                            email,
                            `You have just made a request to change your password, please enter the following code on the commonground reset page in order to proceed: \n\n ${secretCode} \n\n\n Please do not reply to this email.`,
                        )
                            .then(() => {
                                res.sendStatus(200);
                            })
                            .catch((e) => console.log('Error sending the email: ', e));
                    })
                    .catch((e) => console.log('error adding request code to DB: ', e));
            } else {
                console.log('email address did not match anything in DB');
                res.sendStatus(500);
            }
        })
        .catch((err) => {
            console.log('Email address not found: ', err);
            res.sendStatus(500);
        });
};

module.exports.verifyAndResetUsersPassword = (req, res) => {
    const { email, secretCodeTyped, newPassword } = req.body;
    codeCheck(email)
        .then(({ rows }) => {
            if (secretCodeTyped === rows[0].code) {
                hash(newPassword)
                    .then((passHash) => {
                        updatePassword(email, passHash)
                            .then(() => {
                                res.sendStatus(200);
                            })
                            .catch(() => res.sendStatus(500));
                    })
                    .catch(() => res.sendStatus(500));
            } else {
                res.json({ error: 'code not found' });
            }
        })
        .catch((err) => {
            console.log('err: ', err);
            res.sendStatus(500);
        });
};
