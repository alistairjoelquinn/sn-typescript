const { genSalt, hash, compare } = require('bcryptjs');

module.exports.hash = (password) => genSalt().then((salt) => hash(password, salt));

module.exports.compare = (password, hashed) => compare(password, hashed).then((isMatch) => isMatch);
