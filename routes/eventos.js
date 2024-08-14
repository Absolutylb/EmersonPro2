const express = require('express');
const router = express.Router();
const basicAuth = require('../auth/auth');

router.post('/criar', basicAuth, (req, res) => {
const { titulo, data, palestrantesId } = req.body;

const sql = 'INSERT INTO eventos (titulo, data) VALUES (?, ?)';
req.db.query(sql, [titulo, data], (err, result) => {
if (err) {
console.error('Erro ao criar evento:', err);
res.status(500).json({ error: 'Erro ao criar evento' });
return;
}

const eventoId = result.insertId;

const sqlPalestrante = 'INSERT INTO eventos_palestrantes (eventoId, palestranteId) VALUES ?';
const values = palestrantesId.map(id => [eventoId, id]);
req.db.query(sqlPalestrante, [values], (err) => {
if (err) {
console.error('Erro ao associar palestrantes:', err);
res.status(500).json({ error: 'Erro ao associar palestrantes' });
return;
}
res.status(201).json({ message: 'Evento criado com sucesso', eventoId });
});
});
});

router.get('/agenda', basicAuth, (req, res) => {
const sql = `
SELECT e.id, e.titulo, e.data, p.id AS palestranteId, p.nome, p.expertise
FROM eventos e
JOIN eventos_palestrantes ep ON e.id = ep.eventoId
JOIN palestrantes p ON ep.palestranteId = p.id
ORDER BY e.data
`;

req.db.query(sql, (err, results) => {
if (err) {
console.error('Erro ao listar eventos:', err);
res.status(500).json({ error: 'Erro ao listar eventos' });
return;
}
res.json(results);
});
});

module.exports = router;
