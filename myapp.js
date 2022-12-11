require('dotenv').config();
const dbConnect = require('./config/mongo');
const express = require('express');
const cors= require('cors');
const nodemon = require('nodemon');
const app = express();

app.use(cors())
app.use(express.json()); 
//RUTAS

app.use("/api", require('./routes'));


const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Your server is listening on ${port}`);
});

dbConnect();