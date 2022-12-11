const {check} = require('express-validator');
const validatePer = require("../utils/handleValidator");

const validatorRegPer = [
    check("nombre")
    .exists()
    .notEmpty(),
    check("edad")
    .exists()
    .notEmpty()
    .isInt(),
    check("email")
    .exists()
    .notEmpty()
    .isEmail(),
    check("clave")
    .exists()
    .notEmpty()
    .isLength({min:3, max:25}),
    check("rol")
    .exists()
    .isString()
    .custom(value =>(next)=> {if("Personal" || "Admin" || "Tecnico"){
            next()
            return
    }else{
        err(e)
    }}),
    (req, res, next) => {
        return validatePer(req, res, next)
    }
];

const validatorLogPer = [
    check("email")
    .exists()
    .notEmpty()
    .isEmail(),
    check("clave")
    .exists()
    .notEmpty(),
    (req, res, next) => {
        return validatePer(req, res, next)
    }
];

module.exports = { validatorRegPer, validatorLogPer  }