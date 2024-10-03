const express = require("express");
const { registerUser, getUser, getUsers, loginUser, updateUser, deleteUser, changeIsBusiness } = require("../models/usersAccessDataService");
const auth = require("../../auth/authService");
const { handleError } = require("../../utils/handleErrors");
const {
    validateRegistration,
    validateLogin,
    validateEditUser,
} = require("../validation/userValidationService");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const error = validateRegistration(req.body);
        if (error) return handleError(res, 400, `Joi Error: ${error}`);
        let user = await registerUser(req.body);
        res.send(user);
    } catch (error) {
        return handleError(res, 400, error.message);
    }
});

router.post("/login", async (req, res) => {
    try {
        const error = validateLogin(req.body);
        if (error) return handleError(res, 400, `Joi Error: ${error}`);
        let { email, password } = req.body;
        const token = await loginUser(email, password);
        res.send(token);
    } catch (error) {
        return handleError(res, 400, error.message)
    }
});

router.get("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userInfo = req.user;
        if (userInfo._id !== id && !userInfo.isAdmin) {
            return handleError(res, 403, "You are not allowed to access this user")
        }
        let user = await getUser(id);
        res.send(user);
    } catch (error) {
        return handleError(res, 400, error.message)
    }
});

router.put("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUserData = req.body;
        const userInfo = req.user;

        if (userInfo._id !== id && !userInfo.isAdmin) {
            return handleError(res, 403, "You are not allowed to edit this user profile");
        }

        const errorMessage = validateEditUser(updatedUserData);
        if (errorMessage) {
            return handleError(res, 400, "Validation error: " + errorMessage);
        }

        let updatedUser = await updateUser(id, updatedUserData);
        res.send(updatedUser);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

router.get("/", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        if (!userInfo.isAdmin) {
            return handleError(res, 403, "You are not allowed to see all the users")
        }
        let users = await getUsers();
        res.send(users);
    } catch (error) {
        return handleError(res, 400, error.message)
    }
});

router.delete("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userInfo = req.user;
        if (!userInfo.isAdmin) {
            return handleError(res, 403, "Only admin can delete users");
        }
        let user = await deleteUser(id);
        res.send(user);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

router.patch("/isBusiness/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { isBuisness } = req.body;
        const userInfo = req.user;
        if (!userInfo.isAdmin) {
            return handleError(res, 403, "Only admin can change isBusiness status");
        }
        let user = await changeIsBusiness(id, isBuisness);
        res.send(user);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

module.exports = router;