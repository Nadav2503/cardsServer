const cors = require("cors");

const corsMiddleWares = cors({
    origin: ["http://127.0.0.1:5500", "https://www.nadavCards.co.il", "http://localhost:5500"],
});

module.exports = corsMiddleWares;