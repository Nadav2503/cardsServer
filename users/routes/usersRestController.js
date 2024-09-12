const express = require("express");

const { registerUser, getUser, getUsers } = require("../models/usersAccessDataService");

const router = express.Router();

router.post("/users", async (req, res) => {
    try {
        let user = await registerUser(req.body);
        res.send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let user = await getUser(id);
        res.send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/users", async (req, res) => {
    try {
        let users = await getUsers();
        res.send(users);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;