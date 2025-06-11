const bcrypt = require("bcrypt");

const hashing = async (password, saltRounds = 10) => {
    return await bcrypt.hash(password, saltRounds);
};

const hashValidation = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

module.exports = { hashing, hashValidation };
