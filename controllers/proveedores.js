const {modeloProveedores} = require('../models');
const mongoose = require('mongoose');

/**
 *  Obtener una vista de todos los proveedores
 */

const getProveedores = async (req, res) => {
    try {
        const arrayProveedoresDB = await modeloProveedores.find()
        res.render("proveedores", {
            arrayProveedores: arrayProveedoresDB
        })
    } catch (error) {
        console.log(Error)
    }
};

/**Registrar un proveedor
 * 
 */
const postProveedor = (req, res) => {
    res.render('crearProveedores')
}

const postProvee = async (req, res ) => {
    const body = req.body
    try {
        const proveedoresDB = new modeloProveedores(body)
        await proveedoresDB.save()
        res.redirect('/api/proveedores')
    } catch (error) {
        console.log('error', error)
    }
};

/**
 * Buscar proveedor por ID
 */
const getProveedor = async (req, res) =>{
    const id = req.params._id
    try {
        const proveedoresDB = await modeloProveedores.findOne({ _id:id })
        res.render('detalleProveedores', {
            proveedores: proveedoresDB,
            error: false
        })
    } catch (error) {
        res.render('detalleProveedores', {
            mensaje:'No se ha encontrado el ID',
            error: true
        })
    }
};

/** 
 * Modificar un proveedor
 */
const putProveedor = async (req, res) => {
    const id = req.params._id
    const body= req.body

    try {
        const proveedoresDB = await modeloProveedores.findByIdAndUpdate(
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
 * Eliminar un proveedor
 */
const deleteProveedor = async (req, res) => {
    const id = req.params._id
    try {
        const proveedoresDB = await modeloProveedores.findByIdAndDelete({ _id:id })
        if(proveedoresDB) {
            res.json({
                estado: true,
                mensaje: 'El Proveedor ha sido Eliminado'
            })
        } else {
            res.json({
                estado: false,
                mensaje: 'El Proveedor no se ha podido Eliminar'
            })
        }
    } catch (error) {
        console.log(error)
    }
};

//luis-san


module.exports = {getProveedores, postProveedor, postProvee, getProveedor, putProveedor, deleteProveedor};