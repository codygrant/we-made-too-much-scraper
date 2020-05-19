const mongoose = require('mongoose');
const uri = process.env.DB_URI;

const connect = async () => {
    try {
        await mongoose.connect(uri,
            { useNewUrlParser: true }
        );
        console.log('Database connected successfully');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = { connect };