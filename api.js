const express = require('express');
const mysql = require('mysql');
const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'inventario'
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado a MySQL');
});

app.use(express.json());

// Ruta para obtener áreas
app.get('/areas', (req, res) => {
    const sql = 'SELECT * FROM areas';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Ruta para agregar área
app.post('/areas', (req, res) => {
    const { code, name, description, status, location } = req.body;
    const sql = 'INSERT INTO areas (code, name, description, status, location) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [code, name, description, status, location], (err, result) => {
        if (err) throw err;
        res.json({ success: true });
    });
});

app.listen(3000, () => console.log('API corriendo en http://localhost:3000'));
