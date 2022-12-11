/**
 * Acá va un array con los roles.
 * @param {*} rol 
 * @returns 
 */
const checkRol = (roles) =>(req, res, next) =>{
    const { user } = req
    const rolesByUser = user.rol 

    const valueRol = roles.some((rolSingle)=> rolesByUser.includes(rolSingle))
    if(!valueRol){
        res.status(403).json({message: "PERMISOS INSUFICIENTES"})
        return
    }

    next()

}

module.exports = checkRol