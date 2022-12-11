const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
/**
 * Se pasa el objeto del usuario/personal
 * @param {*} personal 
 */
const firmaToken = async (personal) => {
    const sign = await jwt.sign(
    {
        _id: personal._id,
        rol: personal.rol
    },
    JWT_SECRET
    )
    return sign
}
/**
 * Acá va el token de sesión JWT
 * @param {*} tokenJwt 
 * @returns 
 */
const verifyToken = async (tokenJwt) => {
    try{
        return jwt.verify(tokenJwt, JWT_SECRET)
    }catch(e) {
        return null
    }

}

module.exports = {firmaToken, verifyToken}