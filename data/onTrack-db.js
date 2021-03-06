// Mongoose Connection
// Mongoose dependencies
// =============================================================================
const mongoose = require("mongoose");

assert = require("assert");
mongoose.Promise = global.Promise;
// Connect to DB
// =============================================================================
mongoose.connect(
    process.env.MONGODB_URI || process.env.url,
    { useNewUrlParser: true },
    (err, db) => {
        assert.equal(null, err);
        console.log("connected successfully to database");
        // db.close(); turn on for testing
    }
);

mongoose.connection.on("error", console.error.bind(console, "MongoDB connection Error"));
mongoose.set("debug", true);

module.exports = mongoose.connection;
