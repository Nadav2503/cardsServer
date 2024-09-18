const _ = require("lodash");
const Card = require("../models/mongodb/Card");
const { createError } = require("../../utils/handleErrors");

const generateBizNumber = async () => {
    let cardsCount = await Card.find().countDocuments();
    if (cardsCount === 9_000_000) {
        const error = new Error(
            "you reached to the maximum cards count in your system"
        );
        error.status = 409;
        return createError("Mongoose", error)
    }

    // while
    // let random = _.random(1_000_000, 9_999_999);
    // while (await isBizNumberExist(random)) {
    //     random = _.random(1_000_000, 9_999_999);
    // };

    // recursive
    // let random = _.random(1_000_000, 9_999_999);
    // if (await isBizNumberExist(random)) return generateBizNumber() 

    // do while
    let random;
    do {
        random = _.random(1_000_000, 9_999_999);
    }
    while (await isBizNumberExist(random));
    return random;
};

const isBizNumberExist = async (bizNumber) => {
    try {
        const cardWithThisBizNumber = await Card.findOne({ bizNumber });
        return Boolean(cardWithThisBizNumber);
    } catch (error) {
        error.status = 500;
        return createError("Mongoose", error);
    }
};

module.exports = { generateBizNumber };
