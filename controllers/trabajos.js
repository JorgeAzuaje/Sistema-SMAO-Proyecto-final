const {modeloTrabajos} = require('../models');
const { db } = require('../models/nosql/equipos');
const mongoose = require('mongoose');

/**
 * Obtener Trabajo by ID
 */
 const getTrabajo = async (req, res) =>{
    const user = req.user
    const {_id} = req.params;
    const data = await modeloTrabajos.findById(_id);
  
    res.send({data, user});
};

/**
 * Obtener lista de Trabajos disponibles
 */
const getTrabajos = async (req, res) =>{
    const user = req.user
    const data = await modeloTrabajos.find({});
    res.send({data, user});
    
};

/**
 * Trabajo por id de equipo
 */

 const getEquipoTr = async (req, res) =>{
    const user = req.user
    const {idEquipo} = req.params;
    const data = await modeloTrabajos.findOne({idEquipo: idEquipo});
    res.send({data, user});
};

/**
 * Crear un Trabajo nuevo
 */
const postTrabajos = (req, res) =>{
    const user = req.user
    const _id = mongoose.Types.ObjectId();
    const trabajos = modeloTrabajos(req.body);
    trabajos
    .save()
    .then((data)=> res.send({data, user}))
    .catch((error=> res.json({message: error})));
};

/**
 * Modificar un Trabajo
 */
const putTrabajos = async (req, res) =>{
    const user = req.user
    const {_id} = req.params;
    const {
    idEquipo,
    nombreEquipo,
    fechaPlan,
    fecha_ini,
    fecha_fin,
    obsTecnico,
    estado
    } = req.body;
    const data = await modeloTrabajos.updateOne({_id: _id}, {$set: {
        idEquipo,
        nombreEquipo,
        fechaPlan,
        fecha_ini,
        fecha_fin,
        obsTecnico,
        estado}});
    res.send({data, user});
};

/**
 * Eliminar un Trabajo por id
 */
const deleteTrabajos = async (req, res) =>{
    const user = req.user
    const {_id} = req.params;
    const data = await modeloTrabajos.remove({_id: _id});
    res.send({message:'El trabajo ha sido eliminado exitosamente'}, {user});
};

module.exports = {getTrabajo, getTrabajos, postTrabajos, putTrabajos, deleteTrabajos, getEquipoTr};