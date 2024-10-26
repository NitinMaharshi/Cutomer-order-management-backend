const mongoose = require('mongoose');

module.exports.connectDatabase = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.MONGODB_URL).then(() => {
        console.log('MongoDB connection successful!!')
    }).catch((err) => {
        console.log('Error in MongoDB connection', err)
    })
    
    mongoose.set('debug', true)
}