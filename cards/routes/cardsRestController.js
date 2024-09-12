const express = require("express");
const {
    createCard,
    getCards,
    getCard,
    getMyCards,
    updateCard,
    deleteCard,
    likeCard,
    changeBizNumber,
} = require("../models/cardsAccessDataService");
const auth = require("../../auth/authService");
const router = express.Router();

router.post("/", auth, async (req, res) => {

    try {
        const userInfo = req.user;
        if (!userInfo.isBusiness) {
            return res.status(403).send("Only business user can create new card");
        }
        let card = await createCard(req.body);
        res.send(card);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/", async (req, res) => {
    try {
        let cards = await getCards();
        res.send(cards);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/my-cards", auth, async (req, res) => {
    try {
        const { id } = req.body;
        let card = await getMyCards(id);
        res.send(card);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let card = await getCard(id);
        res.send(card);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.put("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const newCard = req.body;
        let card = await updateCard(id, newCard);
        res.send(card);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        let card = await deleteCard(id);
        res.send(card);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.patch("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        let card = await likeCard(id, userId);
        res.send(card);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.patch("/biz-number/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { bizNumber } = req.body;
        let card = await changeBizNumber(id, bizNumber);
        res.send(card);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;

