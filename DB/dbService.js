const connectToLocalDb = require("./mongodb/connectToMongodbLocally");
const connectToAtlaslDb = require("./mongodb/connectToAtlas");

const ENVIRONMENT = "development";

const connectToDb = async () => {
    if (ENVIRONMENT === "development") {
        await connectToLocalDb();
    }
    if (ENVIRONMENT === "production") {
        await connectToAtlaslDb();
    }
};

module.exports = connectToDb;