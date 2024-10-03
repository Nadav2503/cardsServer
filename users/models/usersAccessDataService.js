const config = require("config");
const DB = config.get("DB");
const _ = require("lodash");
const { generateAuthToken } = require("../../auth/providers/jwt");
const User = require("./mongodb/User");
const { createError } = require("../../utils/handleErrors");
const { comparePasswords, generatUserPassword } = require("../helpers/bcrypt");

const registerUser = async (newUser) => {
    if (DB == "mongodb") {
        try {
            newUser.password = generatUserPassword(newUser.password);
            let user = new User(newUser);
            user = await user.save();
            user = _.pick(user, ['_id', 'email', 'name']);
            return user;
        } catch (error) {
            return createError("Mongoose ", error);
        }
    }
    const error = new Error("there is no other db for this requests");
    error.status = 500;
    return createError("DB", error);
};

const getUser = async (userId) => {
    if (DB == "mongodb") {
        try {
            let user = await User.findById(userId);
            return user;
        } catch (error) {
            return createError("Mongoose ", error);
        }
    }
    const error = new Error("there is no other db for this requests");
    error.status = 500;
    return createError("DB", error);
};

const getUsers = async () => {
    if (DB == "mongodb") {
        try {
            let users = await User.find();
            return users;
        } catch (error) {
            return createError("Mongoose ", error);
        }
    }
    const error = new Error("there is no other db for this requests");
    error.status = 500;
    return createError("DB", error);
};

const loginUser = async (email, password) => {
    if (DB == "mongodb") {
        try {
            const userFromDb = await User.findOne({ email });
            if (!userFromDb) {
                const error = new Error("Invalid email or password");
                error.status = 401;
                return createError("Authentication", error);
            }
            if (!comparePasswords(password, userFromDb.password)) {
                const error = new Error("Invalid email or password");
                error.status = 401;
                return createError("Authentication", error);
            }
            const token = generateAuthToken(userFromDb);
            return token;
        } catch (error) {
            return createError("Mongoose ", error);
        }
    }
    const error = new Error("there is no other db for this requests");
    error.status = 500;
    return createError("DB", error);
};

const updateUser = async (userId, updatedData) => {
    if (DB == "mongodb") {
        try {
            const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });
            return user;
        } catch (error) {
            return createError("Mongoose ", error);
        }
    }
    const error = new Error("there is no other db for this requests");
    error.status = 500;
    return createError("DB", error);
};

const deleteUser = async (userId) => {
    if (DB == "mongodb") {
        try {
            let user = await User.findByIdAndDelete(userId);
            return user;
        } catch (error) {
            return createError("Mongoose ", error);
        }
    }
    const error = new Error("there is no other db for this requests");
    error.status = 500;
    return createError("DB", error);
};

const changeIsBusiness = async (userId, newIsBusiness) => {
    if (DB == "mongodb") {
        try {
            let user = await User.findByIdAndUpdate({ _id: userId }, { isBusiness: newIsBusiness });
            return user;
        } catch (error) {
            return createError("Mongoose ", error);
        }
    }
    const error = new Error("there is no other db for this requests");
    error.status = 500;
    return createError("DB", error);
};

module.exports = { registerUser, getUsers, getUser, loginUser, updateUser, deleteUser, changeIsBusiness };
