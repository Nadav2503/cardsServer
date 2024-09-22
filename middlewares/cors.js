const cors = require("cors");

const corsMiddleWares = cors({
    origin: [
        "http://127.0.0.1:5500",
        "https://www.nadavCards.co.il",
        "http://localhost:5500",
        "http://localhost:3000",
        "http://localhost:5173",
    ],
});

module.exports = corsMiddleWares;