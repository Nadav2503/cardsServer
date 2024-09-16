const express = require("express");

const { registerUser, getUser, getUsers, loginUser } = require("../models/usersAccessDataService");
const auth = require("../../auth/authService");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        let user = await registerUser(req.body);
        res.send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post("/login", async (req, res) => {
    try {
        let { email, password } = req.body;
        const token = await loginUser(email, password);
        res.send(token);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userInfo = req.user;
        if (userInfo._id !== id && !userInfo.isAdmin) {
            return res.status(403).send("Forbidden: You are not allowed to access this user");
        }
        let user = await getUser(id);
        res.send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        if (!userInfo.isAdmin) {
            return res.status(403).send("Forbidden: Only admin can access all users");
        }
        let users = await getUsers();
        res.send(users);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;