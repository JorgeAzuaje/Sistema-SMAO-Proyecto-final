const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/session');
const checkRol = require('../middleware/rol');

const {getPiezas, postPiezas, postPieza, getPieza, putPieza, deletePieza} = require('../controllers/piezas')

/**
 * rutas CRUD
 */

router.get('/',authMiddleware, checkRol(["Admin", "Personal", "Tecnico"]), getPiezas);

router.get('/crearPieza', authMiddleware, checkRol(["Admin","Tecnico"]), postPiezas);

router.post('/', authMiddleware, checkRol(["Admin","Tecnico"]), postPieza);

router.get('/:_id',authMiddleware, checkRol(["Admin", "Personal", "Tecnico"]), getPieza);

router.put('/:_id', authMiddleware, checkRol(["Admin", "Tecnico"]), putPieza);

router.delete('/:_id', authMiddleware, checkRol(["Admin", "Tecnico"]), deletePieza)

//luis-san
module.exports = router;
