const { verifyToken } = require("../utils/handleJWT");
const {registroPersonal} = require("../models")
const mongoose = require('mongoose');

const authMiddleware = async (req, res, next) =>{
    if(!req.headers.authorization){
        res.status(401).json({message:"NECESITA UNA SESIÓN"})
        return
    }
    const token = req.headers.authorization.split(' ').pop();
    const dataToken = await verifyToken(token)

    if(!dataToken._id){
        res.status(401).json({message:"ERROR_ID"})
        return
    }
    
    const user = await registroPersonal.findById(dataToken._id)
    req.user = user
 
    next()
}
module.exports= authMiddleware