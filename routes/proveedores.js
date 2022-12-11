const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/session');
const checkRol = require('../middleware/rol');

const {getProveedores, postProveedor, getProveedor, putProveedor, deleteProveedor} = require('../controllers/proveedores')

/**
 * Rutas CRUD
 */
router.get('/', authMiddleware, checkRol(['Admin']), getProveedores);
router.get('/:_id', authMiddleware, checkRol(['Admin']), getProveedor);

router.post('/', authMiddleware, checkRol(['Admin']), postProveedor);

router.put('/:_id', authMiddleware, checkRol(['Admin']), putProveedor);

router.delete('/:_id', authMiddleware, checkRol(['Admin']), deleteProveedor);

//luis-san
module.exports = router;