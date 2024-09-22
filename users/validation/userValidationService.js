const registerValidation = require("./joi/registerValidation");
const loginValidation = require("./joi/loginValidation");
const editUserValidation = require("./joi/editUserValidation");

const config = require("config");
const validator = config.get("VALIDATOR");

const validateRegistration = (user) => {
    if (validator === "Joi") {
        const { error } = registerValidation(user);
        if (error) return error.details[0].message;
        return "";
    }
};

const validateLogin = (user) => {
    if (validator === "Joi") {
        const { error } = loginValidation(user);
        if (error) return error.details[0].message;
        return "";
    }
};

const validateEditUser = (user) => {
    if (validator === "Joi") {
        const { error } = editUserValidation(user);
        if (error) return error.details[0].message;
        return "";
    }
};

module.exports = { validateRegistration, validateLogin, validateEditUser }
