const models = {
    modeloEquipos: require('./nosql/equipos'),
    modeloTrabajos: require('./nosql/trabajos'),
    registroPersonal: require('./nosql/personal'),
    registroPiezas : require('./nosql/piezas'),
    modeloProveedores : require('./nosql/proveedores')
};

module.exports = models