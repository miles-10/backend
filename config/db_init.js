const mongoose = require('mongoose');
require('dotenv').config();

const dbname = process.env.MONGODB_DB;
const username = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASSWORD;



const connectDB = async()=>{
    const conn = await mongoose.connect(`mongodb+srv://nitesh:Life15good.@cluster0.hpmdu.mongodb.net/?retryWrites=true&w=majority`,{
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
    .then(()=>console.log('MongoDB Connected'.green))
}
module.exports = connectDB;