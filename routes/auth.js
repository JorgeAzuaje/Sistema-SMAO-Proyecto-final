const express = require('express');
const router = express.Router();
const {validatorRegPer, validatorLogPer} = require('../validators/personal')
const authMiddleware = require('../middleware/session');
const checkRol = require('../middleware/rol');
const {regPer, getPer, logPer, deletePer} = require('../controllers/personal')


//Estamos en http://localhost:port/api/auth/login
//Estamos en http://localhost:port/api/auth/register

router.post('/register', validatorRegPer, regPer);
router.get('/', getPer)

router.post('/login', validatorLogPer, logPer);

router.delete('/:_id', authMiddleware, checkRol(["Admin"]), deletePer)


module.exports = router;
