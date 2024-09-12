const Card = require("./mongodb/Card");

const createCard = async (newCard) => {
    try {
        let card = new Card(newCard);
        card = await card.save();
        return card;
    } catch (error) {
        throw new Error("Mongoose " + error.message);
    }
};

const getCards = async () => {
    try {
        let cards = await Card.find();
        return cards;
    } catch (error) {
        throw new Error("Mongoose " + error.message);
    }
};

const getCard = async (cardId) => {
    try {
        let card = await Card.findById(cardId);
        return card;
    } catch (error) {
        throw new Error("Mongoose " + error.message);
    }
};

const getMyCards = async (userId) => {
    try {
        let cards = await Card.find({ user_id: userId });
        return cards;
    } catch (error) {
        throw new Error("Mongoose " + error.message);
    }
};

const updateCard = async (cardId, newCard) => {
    try {
        let card = await Card.findByIdAndUpdate(cardId, newCard, { new: true });
        return card;
    } catch (error) {
        throw new Error("Mongoose " + error.message);
    }
};

const deleteCard = async (cardId) => {
    try {
        let card = await Card.findByIdAndDelete(cardId);
        return card;
    } catch (error) {
        throw new Error("Mongoose " + error.message);
    }
};

const changeBizNumber = async (cardId, newBizNumber) => {
    try {
        let card = await Card.findAndUpdate({ _id: cardId }, { bizNumber: newBizNumber });
        return card;
    } catch (error) {
        throw new Error("Mongoose " + error.message);
    }
};

const likeCard = async (cardId, userId) => {
    try {
        let card = await Card.findById(cardId);
        if (!card)
            throw new Error("A card with this ID cannot be found in the database");
        if (card.likes.includes(userId)) {
            let newLikesArray = card.likes.filter((id) => id != userId);
            card.likes = newLikesArray;
        } else {
            card.likes.push(userId);
        }
        await card.save();
        return card;
    } catch (error) {
        throw new Error("Mongoose " + error.message);
    }
};


module.exports = { createCard, getCards, getCard, getMyCards, updateCard, changeBizNumber, likeCard, deleteCard };
