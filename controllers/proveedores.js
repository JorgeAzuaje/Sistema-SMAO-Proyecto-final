const {modeloProveedores} = require('../models');
const mongoose = require('mongoose');

/** 
 * Obtener una vista de todos los proveedores
 */

const getProveedores = async (req, res) =>{
    const user = req.user // TODO: NOs trae el usuario que hace un req.
    const data = await modeloProveedores.find({})
    res.send({data, user})
}

/**
 * Registrar un proveedor
 */
const postProveedor = async (req, res) =>{
    const user = req.user
    const _id = mongoose.Types.ObjectId();
    const proveedor = modeloProveedores(req.body);
    proveedor
    .save()
    .then((data)=> res.send({data, user}))
    .catch((error=> res.json({message: error})));
};

/**
 * Buscar proveedor por ID
 */
const getProveedor= async (req, res) =>{
    const user = req.user
    const {_id} = req.params;
    const data = await modeloProveedores.findById(_id);

    res.send({data, user});
}

/**
 * Modificar un proveedor
 */
const putProveedor = async (req, res) => {
    const user = req.user
    const {_id} = req.params;
    const {
    nombre,
    nacionalidad,
    ultSuministro,
    proxSuministro
    } = req.body;
    const data = await modeloProveedores.updateOne({_id: _id}, {$set: {
        nombre,
        nacionalidad,
        ultSuministro,
        proxSuministro
    }});
    res.send({message:'El proveedor ha sido actualizado exitosamente', user});
}

/**
 * Eliminar un proveedor
 */
const deleteProveedor = async (req, res) =>{
    const user = req.user
    const {_id} = req.params;
    const data = await modeloProveedores.deleteOne({_id: _id});
    res.send({message:'El proveedor ha sido eliminado exitosamente', user});
};

//luis-san
module.exports = {getProveedores, postProveedor, getProveedor, putProveedor, deleteProveedor};

