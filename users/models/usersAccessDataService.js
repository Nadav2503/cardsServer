const User = require("./mongodb/User");

const registerUser = async (newUser) => {
    try {
        let user = new User(newUser);
        user = await user.save();
        return user;
    } catch (error) {
        throw new Error("Mongoose " + error.message);
    }
};

const getUser = async (userId) => {
    try {
        let user = await User.findById(userId);
        return user;
    } catch (error) {
        throw new Error("Mongoose " + error.message);
    }
};

const getUsers = async () => {
    try {
        let users = await User.find();
        return users;
    } catch (error) {
        throw new Error("Mongoose " + error.message);
    }
};

module.exports = { registerUser, getUsers, getUser };