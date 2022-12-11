const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/session');
const checkRol = require('../middleware/rol');
const {getTrabajos, getTrabajo, postTrabajos, putTrabajos, deleteTrabajos, getEquipoTr} = require('../controllers/trabajos')

//Creamos la ruta CRUD

router.get('/:_id', authMiddleware, checkRol(["Admin", "Personal", "Tecnico"]), getTrabajo);
router.get('/equipoRel/:idEquipo', authMiddleware, checkRol(["Admin", "Personal", "Tecnico"]), getEquipoTr);
router.get('/', authMiddleware, checkRol(["Admin", "Personal", "Tecnico"]), getTrabajos); 


router.post('/', authMiddleware, checkRol(["Admin", "Tecnico"]), postTrabajos);

router.put('/:_id', authMiddleware, checkRol(["Admin", "Tecnico"]), putTrabajos);

router.delete('/:_id', authMiddleware, checkRol(["Admin"]), deleteTrabajos);



module.exports = router;