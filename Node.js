const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '24122020', // Cambiar según tu configuración
    database: 'GestionInventario'
});

db.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conexión exitosa a la base de datos GestionInventario');
    }
});

module.exports = db;
