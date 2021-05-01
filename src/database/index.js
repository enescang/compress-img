import mongoose from 'mongoose';

const connectMongodb = (databaseName) => {
    mongoose.connect(process.env.MONGO_DB + databaseName, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    });
};

const DB = (databaseName) => {
    connectMongodb(databaseName);
    return mongoose.connection;
};

module.exports = DB;