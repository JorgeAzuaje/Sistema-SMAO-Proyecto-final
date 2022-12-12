const {modeloTrabajos} = require('../models');
const { db } = require('../models/nosql/equipos');
const mongoose = require('mongoose');

/**
 * Obtener Trabajo by ID
 */
 const getTrabajo = async (req, res) =>{
    const id = req.params._id
    try {
        const trabajosDB = await modeloTrabajos.findOne({ _id:id })
        res.render('detalleTrabajo', {
            trabajo: trabajosDB,
            error: false
        })
    } catch (error) {
        res.render('detalleTrabajo', {
            mensaje:'No se ha encontrado el ID',
            error: true
        })
    }
};

/**
 * Obtener lista de Trabajos disponibles
 */
const getTrabajos = async (req, res) => {
    try {
        const arrayTrabajosDB = await modeloTrabajos.find()
        res.render("trabajos", {
            arrayTrabajos: arrayTrabajosDB
        })
    } catch (error) {
        console.log(Error)
    }
};

/**
 * Obtener Equipo por ID Único en idEquipo
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
const postTrabajos = (req, res) => {
    res.render('crearTrabajo')
}

const postTrabajo = async (req, res ) => {
    const body = req.body
    try {
        const trabajoDB = new modeloTrabajos(body)
        await trabajoDB.save()
        res.redirect('/api/trabajos')
    } catch (error) {
        console.log('error', error)
    }
};

/**
 * Modificar un Trabajo
 */
const putTrabajos = async (req, res) => {
    const id = req.params._id
    const body= req.body

    try {
        const trabajoDB = await modeloTrabajos.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )

        res.json({
            estado: true
        })
        
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Fallo al Editar'
        })
    }
};

/**
 * Eliminar un Trabajo por id
 */
const deleteTrabajos = async (req, res) => {
    const id = req.params._id
    try {
        const trabajosDB = await modeloTrabajos.findByIdAndDelete({ _id:id })
        if(trabajosDB) {
            res.json({
                estado: true,
                mensaje: 'El trabajo ha sido Eliminado'
            })
        } else {
            res.json({
                estado: false,
                mensaje: 'El trabajo no se ha podido Eliminar'
            })
        }
    } catch (error) {
        console.log(error)
    }
};

module.exports = {getTrabajo, getTrabajos, postTrabajos, postTrabajo, putTrabajos, deleteTrabajos, getEquipoTr};