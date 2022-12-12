const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/session');
const checkRol = require('../middleware/rol');

const {getProveedores, postProveedor, postProvee, getProveedor, putProveedor, deleteProveedor} = require('../controllers/proveedores')

/**
 * Rutas CRUD
 */
router.get('/', authMiddleware, checkRol(['Admin']), getProveedores);

router.get('/crearProveedores', authMiddleware, checkRol(['Admin']),postProveedor);

router.post('/', authMiddleware, checkRol(['Admin']),postProvee);

router.get('/:_id', authMiddleware, checkRol(['Admin']),getProveedor);

router.put('/:_id', authMiddleware, checkRol(['Admin']),putProveedor);

router.delete('/:_id', authMiddleware, checkRol(['Admin']),deleteProveedor);

//luis-san
module.exports = router;