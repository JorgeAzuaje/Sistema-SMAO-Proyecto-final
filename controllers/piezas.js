const {registroPiezas} = require('../models');
const { db } = require('../models/nosql/proveedores');
const mongoose = require('mongoose');

/ 
 * Obtener una vista de todas las piezas
 */

const getPiezas =  async (req, res) => {
    try {
        const arrayPiezasDB = await registroPiezas.find()
        res.render("piezas", {
            arrayPiezas: arrayPiezasDB
        })
    } catch (error) {
        console.log(Error)
    }
};

/
 * Registrar una piezas
 */
const postPiezas = (req, res) => {
    res.render('crearPieza')
}

const postPieza = async (req, res ) => {
    const body = req.body
    try {
        const piezaDB = new registroPiezas(body)
        await piezaDB.save()
        res.redirect('/api/piezas')
    } catch (error) {
        console.log('error', error)
    }
};

/
 * Buscar pieza por ID
 */
const getPieza = async (req, res) =>{
    const id = req.params._id
    try {
        const piezasDB = await registroPiezas.findOne({ _id:id })
        res.render('detallePieza', {
            piezas: piezasDB,
            error: false
        })
    } catch (error) {
        res.render('detallePieza', {
            mensaje:'No se ha encontrado el ID',
            error: true
        })
    }
};

/
 * Modificar una pieza
 */
const putPieza = async (req, res) => {
    const id = req.params._id
    const body= req.body

    try {
        const piezaDB = await registroPiezas.findByIdAndUpdate(
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
 * Eliminar una pieza
 */
const deletePieza = async (req, res) => {
    const id = req.params._id
    try {
        const piezasDB = await registroPiezas.findByIdAndDelete({ _id:id })
        if(piezasDB) {
            res.json({
                estado: true,
                mensaje: 'La pieza ha sido Eliminado'
            })
        } else {
            res.json({
                estado: false,
                mensaje: 'La pieza no se ha podido Eliminar'
            })
        }
    } catch (error) {
        console.log(error)
    }
};

module.exports = {getPiezas, postPiezas, postPieza, getPieza, putPieza, deletePieza};
