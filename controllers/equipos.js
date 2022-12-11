const {modeloEquipos} = require('../models');
const { db } = require('../models/nosql/trabajos');
const mongoose = require('mongoose');

/**
 * Obtener equipo by ID
 *
 */
const getEquipo = async (req, res) =>{
    const user = req.user
    const {_id} = req.params;
    const data = await modeloEquipos.findById(_id);

    res.send({data, user});
}; 

/**
 * Obtener lista de equipos disponibles
 */
const getEquipos = async (req, res) =>{
    const user = req.user
    const data = await modeloEquipos.find({});
    res.send({data, user});
    
};

/**
 * Obtener trabajo relacionado al equipo a través de su id
 */

 const getTrabajoEq = async (req, res) =>{
    const user = req.user
    const {id_Trabajo} = req.params;
    const data = await modeloEquipos.findOne({id_Trabajo:id_Trabajo});
    res.send({data, user});
};

/**
 * Crear un equipo nuevo
 */
const postEquipos = (req, res) =>{
    const user = req.user
    const _id = mongoose.Types.ObjectId();
    const equipos = modeloEquipos(req.body);
    equipos
    .save()
    .then((data)=> res.send({data, user}))
    .catch((error=> res.json({message: error})));
};

/**
 * Modificar un equipo
 */
const putEquipos = async (req, res) =>{
    const user = req.user
    const {_id} = req.params;
    const {
        nombre,
    descripcion,
    serial,
    fecha_ini,
    fecha_ult,
    fecha_man,
    id_Trabajo,
    estado
    } = req.body;
    const data = await modeloEquipos.updateOne({_id: _id}, {$set: {nombre,
        descripcion,
        serial,
        fecha_ini,
        fecha_ult,
        fecha_man,
        id_Trabajo,
        estado}});
    res.send({data, user});
};

/**
 * Eliminar un equipo por id
 */
const deleteEquipos = async (req, res) =>{
    const user = req.user
    const {_id} = req.params;
    const data = await modeloEquipos.remove({_id: _id});
    res.send({message:'El trabajo ha sido eliminado exitosamente', user});
};

module.exports = {getEquipo, getEquipos, postEquipos, putEquipos, deleteEquipos, getTrabajoEq};