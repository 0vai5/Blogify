const mongoose = require('mongoose');
const connect = mongoose.connect;

const DBConnect = async () => {
    try {
        const connection = await connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error connecting to the database', error);
        process.exit(1);
    }
}

module.exports = DBConnect;
