const mongoose = require('mongoose');

const mongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to database");
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = mongoDB;