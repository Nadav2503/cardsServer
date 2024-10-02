const mongoose = require("mongoose");
const { DEFAULT_VALIDATION, URL } = require("./moongoseValidators");


const Image = new mongoose.Schema({
    url: URL,
    alt: URL,
});

module.exports = Image;