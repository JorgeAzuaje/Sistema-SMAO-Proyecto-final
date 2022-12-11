const { validationResult } = require("express-validator");

const validatePer = (req, res, next)=> { 
    try {
        validationResult(req).throw() //Si existe err pasa al catch
        return next()//Esta parte indica que siga hacía el controlador
    } catch (err) {
        res.status(403) //mandamos un error 403
        res.send({ errors: err.array() })//y un array con los err
    }
}

module.exports = validatePer
 