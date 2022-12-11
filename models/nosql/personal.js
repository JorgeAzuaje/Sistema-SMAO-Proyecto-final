const mongoose = require('mongoose');
const perSchema = new mongoose.Schema({
    nombre:{
        type: String
    },
    edad: {
        type: Number
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
    },
    clave:{
        type: String,
        select: false
    },
    rol:{
        type: ["Personal", "Admin", "Tecnico"], //Agregado usuario teccnico
        default: "Personal"
    }
}, {
    timestamps: true,
    versionkey: false
})

module.exports = mongoose.model("Trabajadores", perSchema);