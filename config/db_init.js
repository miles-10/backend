const mongoose = require('mongoose');
require('dotenv').config();


const connectDB = async()=>{
    const conn = await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
    .then(()=>console.log('MongoDB Connected'.green))
}
module.exports = connectDB;