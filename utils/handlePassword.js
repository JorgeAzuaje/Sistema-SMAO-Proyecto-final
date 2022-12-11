const bcryptjs = require('bcrypt')

/**
 * contraseña sin encriptar
 * @param {*} clavePlana 
 */

const encrypt = async (clavePlana)=> {
    const hash = await bcryptjs.hash(clavePlana, 10)
    return hash;
}

/**
 * * Se pasa contraseña encriptada y sin encriptar
 * @param {*} clavePlana
 * @param {*} hashPassword 
 */

const compare = async (clavePlana, hashPassword)=> {
    return await bcryptjs.compare(clavePlana, hashPassword)
}

module.exports = {encrypt, compare}