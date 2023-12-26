const mongoose = require('mongoose');
require('dotenv').config();

const connection =async()=>{
    let url = process.env.Port_url;
    await mongoose.connect(url);
    console.log('Connected to Database')
}
module.exports ={connection}