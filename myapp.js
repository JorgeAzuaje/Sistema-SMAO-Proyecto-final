require('dotenv').config();
const dbConnect = require('./config/mongo');
const express = require('express');
const cors= require('cors');
const nodemon = require('nodemon');
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')

app.use(cors())
app.use(express.json());
app.use(express.static(__dirname + "/public")) 
//RUTAS

app.use("/", require('./routes'));
app.use("/api", require('./routes'));

app.use((req, res, next) => {
    res.status(404).render("404", {
        titulo:"404",
        descripcion:"No se ha encontrado la URL"
    })
})

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Your server is listening on ${port}`);
});

dbConnect();