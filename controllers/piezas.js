const {registroPiezas} = require('../models');
const { db } = require('../models/nosql/proveedores');
const mongoose = require('mongoose');

/** 
 * Obtener una vista de todas las piezas
 */

const getPiezas = async (req, res) =>{
    const user = req.user // TODO: NOs trae el usuario que hace un req.
    const data = await registroPiezas.find({})
    res.send({data, user})
}

/**
 * Registrar una piezas
 */
const postPieza = async (req, res) =>{
    const user = req.user
    const _id = mongoose.Types.ObjectId();
    const piezas = registroPiezas(req.body);
    piezas
    .save()
    .then((data)=> res.send({data, user}))
    .catch((error=> res.json({message: error})));
};

/**
 * Buscar pieza por ID
 */
const getPieza = async (req, res) =>{
    const user = req.user
    const {_id} = req.params;
    const data = await registroPiezas.findById(_id);

    res.send({data, user});
}

/**
 * Modificar una pieza
 */
const putPieza = async (req, res) => {
    const user = req.user
    const {_id} = req.params;
    const {
    marca,
    tipo,
    modelo,
    descripcion,
    estado
    } = req.body;
    const data = await registroPiezas.updateOne({_id: _id}, {$set: {
        marca,
        tipo,
        modelo,
        descripcion,
        estado
    }});
    res.send({message:'La pieza ha sido actualizado exitosamente', user});
}

/**
 * Eliminar una pieza
 */
const deletePieza = async (req, res) =>{
    const user = req.user
    const {_id} = req.params;
    const data = await registroPiezas.deleteOne({_id: _id});
    res.send({message:'La pieza ha sido eliminado exitosamente', user});
};
module.exports = {getPiezas, postPieza, getPieza, putPieza, deletePieza};