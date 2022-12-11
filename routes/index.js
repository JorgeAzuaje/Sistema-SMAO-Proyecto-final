const express = require ('express');
const fs = require('fs');
const router = express.Router();

const PATH_ROUTES = __dirname; //Ruta absoluta de los archivos
//FUNCIÓN PARA REMOVER EXTENSIONES =
const removeExtension = (fileName) => {
    return fileName.split('.').shift();
}

//Nos da un array del cual tenemos que quitar las extensiones
const a = fs.readdirSync(PATH_ROUTES).filter(file => {
    const name = removeExtension(file)
    if(name !== 'index'){
        router.use(`/${name}`, require(`./${file}`));
    }
})

module.exports = router;