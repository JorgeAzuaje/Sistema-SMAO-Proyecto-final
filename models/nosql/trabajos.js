const mongoose = require('mongoose');
const trSchema = new mongoose.Schema(
    {
        id:{
            type: mongoose.Types.ObjectId,
            unique: true
        },
        idEquipo: {
            type: String
        },
        nombreEquipo:{
            type: String
        },
        fechaPlan:{
            type: Date
        },
        fecha_ini: {
            type: Date
        },
        fecha_fin:{
            type: Date
        },
        obsTecnico:{
            type: String
        },
        estado: {
            type:['En mantenimiento','Terminado'],
            default: 'En mantenimiento'    
        }
    },
    {
        versionkey: false,  
        timestamps: true
    }
    );

    module.exports = mongoose.model('trabajos ', trSchema);