const mongoose = require("mongoose");
const { DEFAULT_VALIDATION } = require("./moongoseValidators");

const Name = new mongoose.Schema({
    first: DEFAULT_VALIDATION,
    middle: {
        ...DEFAULT_VALIDATION,
        required: false,
        minLength: 0,
    },
    last: DEFAULT_VALIDATION,
});

module.exports = Name;