const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://michalmakowka420:nGPiV0J8VpxvuSwg@cluster0.ytq0c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log("MongoDB connected");
    } catch (err) {
        console.error(err.message);
        process.exit(1)
    }
};

module.exports = connectDB;