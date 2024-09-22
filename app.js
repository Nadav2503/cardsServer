const express = require("express");
const chalk = require("chalk");
require("dotenv").config();
const connectToDb = require("./DB/dbService");
const router = require("./router/router");
const corsMiddleWares = require("./middlewares/cors");
const { handleError } = require("./utils/handleErrors");
const loggerMiddleware = require("./logger/loggerService");

const app = express();
const PORT = 8181;

app.use(corsMiddleWares);
app.use(express.json());

app.use(loggerMiddleware());

app.use(express.static("./public"));

app.get("/", (req, res) => {
    const myPassword = process.env.MY_PASSWORD;
    res.send(myPassword);
});

app.use(router);

app.use((err, req, res, next) => {
    const message = err || "internal error of the server"
    return handleError(res, 500, message);
});

app.listen(PORT, () => {
    console.log(chalk.yellow("app is listening to port" + PORT));
    connectToDb();
});