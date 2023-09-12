require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");


const router = require('./router/index');
const app = express();
app.use(express.json())
app.use(cookieParser())

app.use('/api',router)


const PORT = process.env.PORT;

const start = async ()=>{
    try{
        await mongoose.connect(process.env.DB_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        app.listen(5000,()=>{
            console.log("SERVER START ON PORT ",PORT)
        })
    }catch(e){
            console.log(e,'=====')
    }
}

start()