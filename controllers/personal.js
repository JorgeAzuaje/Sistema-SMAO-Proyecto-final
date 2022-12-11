const {registroPersonal} = require('../models');
const mongoose = require('mongoose');
const {encrypt, compare} = require('../utils/handlePassword')
const {firmaToken} = require('../utils/handleJWT')
const {matchedData} = require('express-validator')


/**
 * Registrar personal
 * @param {*} req 
 * @param {*} res 
 */

 const regPer = async (req, res) =>{
    const _id = mongoose.Types.ObjectId();
    req = req.body;
    const email = req.email

    if(await registroPersonal.findOne({email: email})){
        res.status(409).json({message: 'USUARIO DUPLICADO'})
        return
    }
    
    const passwordHash = await encrypt(req.clave)
    const body = {...req, clave: passwordHash}
    const personal = await registroPersonal.create(body);

    personal.set('clave', undefined, {strict:false})

    const personalUser = { 
        token: await firmaToken(personal),  
        user: personal
    }

    res.send({personalUser})    
    

   
};

/**
 * Hacer log in
 * @param {*} req 
 * @param {*} res 
 */

const logPer = async (req, res) => {
    req = req.body;
    const personal = await registroPersonal.findOne({email:req.email})
    .select('clave nombre rol email')
    if(!personal){
        res.status(404).json({message: "usuario no encontrado"})
        return
    }

const hashPassword = personal.get('clave');
const check = await compare(req.clave, hashPassword)
if(!check){
    res.status(401).json({message:"Clave incorrecta"})
    return
}

personal.set('clave', undefined, {strict:false})

const data = {
    token: await firmaToken(personal),
    personal
}

res.send({data})
}

/**
 * Ver personal
 * @param {*} req 
 * @param {*} res 
 */

const getPer = async (req, res) => {
    const data = await registroPersonal.find({})
    res.send({data})
}

/**
 * Pasar id de usuario/personal
 * @param {*} req 
 * @param {*} res 
 */

const deletePer = async (req, res) =>{
    const {_id} = req.params;
    const data = await registroPersonal.deleteOne({_id: _id});
    res.send({message:'Personal eliminado exitosamente'});
}

module.exports = {regPer, getPer, logPer, deletePer};
