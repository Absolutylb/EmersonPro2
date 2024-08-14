const express = require('express');
const mysql = require('mysql');
const routes = require('./routes');

const app = express();
app.use(express.json());

const db = mysql.createConnection({
host: 'localhost',      
user: 'root',            
password: 'Sen@iDev77!.',   
database: 'eventosdb'    
});


db.connect((err) => {
if (err) {
console.error('Erro ao conectar ao MySQL:', err);
return;
}
console.log('Conectado ao MySQL');
});

app.use((req, res, next) => {
req.db = db;
next();
});

app.use(routes);

app.listen(3000, () => {
console.log('Servidor rodando na porta 3000');
});
