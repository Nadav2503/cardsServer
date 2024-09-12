const express = require("express");
const connectToDb = require("./DB/dbService");
const router = require("./router/router");
const app = express();
const PORT = 8181;

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
    console.log("app is listening to port " + PORT);
    connectToDb();
});