const mongoose = require('mongoose');
const piSchema = new mongoose.Schema(
    {
        marca: {
            type: String
        },
        tipo: {
            type: String
        },
        modelo: {
            type: String
        },
        descripcion: {
            type: String
        },
        estado: {
           type: ['Usado','Nuevo'],
           default: 'Nuevo'
        }
    },
    {
        versionkey: false,  
        timestamps: true
    }
)

//luis-san
module.exports = mongoose.model("piezas", piSchema)