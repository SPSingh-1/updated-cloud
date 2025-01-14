//copy from mongoees
const mongoose = require('mongoose')


const mongoURI="mongodb://localhost:27017/notebook?readPreference=primary&appName=MongoDB%25Compass&directConnection=true&ssl=false"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });
}

module.exports = connectToMongo;