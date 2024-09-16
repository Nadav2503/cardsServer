const _ = require("lodash");
const Card = require("../models/mongodb/Card");

const generateBizNumber = async () => {
    let cardsCount = await Card.find().countDocuments();
    if (cardsCount === 9_000_000) {
        throw new Error("you reached to the maximum cards count in your system");
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
        throw new Error("Mongoose " + error.message);
    }
};

module.exports = { generateBizNumber };
