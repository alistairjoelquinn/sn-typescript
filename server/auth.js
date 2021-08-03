let { genSalt, hash, compare } = require('bcryptjs');

module.exports.hash = password => {
    return genSalt().then(salt => {
        return hash(password, salt);
    });
};

module.exports.compare = (password, hash) => {
    return compare(password, hash)
        .then(isMatch => isMatch);
};


