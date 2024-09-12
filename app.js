const express = require("express");
const connectToDb = require("./DB/dbService");
const router = require("./router/router");
const corsMiddleWares = require("./middlewares/cors");
const app = express();
const PORT = 8181;

app.use(corsMiddleWares);
app.use(express.json());

app.use((req, res, next) => {
    console.log(
        `Request URL: ${req.url} | Method: ${req.method} | Time: ${new Date()}`
    );
    next();
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send("internal error of the server");
});

app.use(router);

app.listen(PORT, () => {
    console.log("app is listening to port " + PORT);
    connectToDb();
});