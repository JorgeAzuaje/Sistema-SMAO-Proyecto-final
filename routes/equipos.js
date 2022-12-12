const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/session');
const checkRol = require('../middleware/rol');
const {getEquipos, getEquipo, postEquipos, postEquipo, putEquipos, deleteEquipos, getTrabajoEq} = require('../controllers/equipos')

//Creamos la ruta CRUD

router.get('/', authMiddleware, checkRol(["Admin", "Personal", "Tecnico"]), getEquipos); //Agregado usuario teccnico

router.get('/:_id', authMiddleware, checkRol(["Admin", "Personal", "Tecnico"]), getEquipo);

router.get('/trabajoRel/:id_Trabajo', authMiddleware, checkRol(["Admin", "Personal", "Tecnico"]), getTrabajoEq);

router.get('/crearEquipo', authMiddleware, checkRol(["Admin","Tecnico"]), postEquipos);

router.post('/', authMiddleware, checkRol(["Admin","Tecnico"]), postEquipo);

router.put('/:_id', authMiddleware, checkRol(["Admin","Tecnico"]), putEquipos);

router.delete('/:_id', authMiddleware, checkRol(["Admin"]), deleteEquipos)



module.exports = router;