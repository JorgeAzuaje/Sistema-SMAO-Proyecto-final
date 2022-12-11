const mongoose = require('mongoose');
const pSchema = new mongoose.Schema(
    {
        nombre: {
            type: String
        },
        nacionalidad: {
            type: String
        },
        ultSuministro: {
            type: Date
        },
        proxSuministro: {
            type: Date
        }
    },
    {
        versionkey: false,  
        timestamps: true
    }
)

module.exports = mongoose.model('Proveedores', pSchema)