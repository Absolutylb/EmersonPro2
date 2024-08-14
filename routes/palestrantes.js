const express = require('express');
const router = express.Router();

router.post('/palestrantes', (req, res) => {
const { nome, expertise } = req.body;

const sql = 'INSERT INTO palestrantes (nome, expertise) VALUES (?, ?)';
db.query(sql, [nome, expertise], (err, result) => {
if (err) {
console.error('Erro ao adicionar palestrante:', err);
res.status(500).json({ error: 'Erro ao adicionar palestrante' });
return;
}
res.status(201).json({ message: 'Palestrante adicionado com sucesso', id: result.insertId });
});
});

router.get('/palestrantes', (req, res) => {
const sql = 'SELECT * FROM palestrantes';
db.query(sql, (err, results) => {
if (err) {
console.error('Erro ao listar palestrantes:', err);
res.status(500).json({ error: 'Erro ao listar palestrantes' });
return;
}
res.json(results);
});
});

module.exports = router;
