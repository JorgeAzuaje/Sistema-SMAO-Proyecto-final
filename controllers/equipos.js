const {modeloEquipos} = require('../models');
const { db } = require('../models/nosql/trabajos');
const mongoose = require('mongoose');

/**
 * Obtener equipo by ID
 */
const getEquipo =  async (req, res) =>{
    const id = req.params._id
    try {
        const equiposDB = await modeloEquipos.findOne({ _id:id })
        res.render('detalleEquipo', {
            equipos: equiposDB,
            error: false
        })
    } catch (error) {
        res.render('detalleEquipo', {
            mensaje:'No se ha encontrado el ID',
            error: true
        })
    }
};

/**
 * Obtener lista de equipos disponibles
 */
const getEquipos = async (req, res) => {
    try {
        const arrayEquiposDB = await modeloEquipos.find()
        res.render("equipos", {
            arrayEquipos: arrayEquiposDB
        })
    } catch (error) {
        console.log(Error)
    }
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
const postEquipos = (req, res) => {
    res.render('crearEquipo')
}

const postEquipo = async (req, res ) => {
    const body = req.body
    try {
        const equipoDB = new modeloEquipos(body)
        await equipoDB.save()
        res.redirect('/api/equipos')
    } catch (error) {
        console.log('error', error)
    }
};

/**
 * Modificar un equipo
 */
const putEquipos = async (req, res) => {
    const id = req.params._id
    const body= req.body

    try {
        const equipoDB = await modeloEquipos.findByIdAndUpdate(
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
 * Eliminar un equipo por id
 */
const deleteEquipos = async (req, res) => {
    const id = req.params._id
    try {
        const equiposDB = await modeloEquipos.findByIdAndDelete({ _id:id })
        if(equiposDB) {
            res.json({
                estado: true,
                mensaje: 'El equipo ha sido Eliminado'
            })
        } else {
            res.json({
                estado: false,
                mensaje: 'El equipo no se ha podido Eliminar'
            })
        }
    } catch (error) {
        console.log(error)
    }
};

module.exports = {getEquipo, getEquipos, postEquipos, postEquipo, putEquipos, deleteEquipos, getTrabajoEq};