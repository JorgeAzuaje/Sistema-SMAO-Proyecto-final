const mongoose = require('mongoose');
const eqSchema = new mongoose.Schema(
    {
        id:{
            type: mongoose.Types.ObjectId,
            unique: true
        },
        nombre: {
            type: String
        },
        descripcion:{
            type: String
        },
        serial:{
            type: String
        },
        fecha_ini: {
            type: Date
        },
        fecha_ult:{
            type: Date
        },
        fecha_man:{
            type: Date
        },
        id_Trabajo: {
            type: String
        },
        estado: {
            type:['Reparado', 'Mantenimiento', 'Dañado'],
            default: 'Dañado'    
        }
    },
    {
        versionkey: false,  
        timestamps: true
    }
    );

    module.exports = mongoose.model('equipos', eqSchema);