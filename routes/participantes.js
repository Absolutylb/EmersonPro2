const express = require('express');
const router = express.Router();
const basicAuth = require('../auth/auth');

router.post('/registrar', basicAuth, (req, res) => {
const { nome, email } = req.body;

const sql = 'INSERT INTO participantes (nome, email) VALUES (?, ?)';
req.db.query(sql, [nome, email], (err, result) => {
if (err) {
console.error('Erro ao registrar participante:', err);
res.status(500).json({ error: 'Erro ao registrar participante' });
return;
}
res.status(201).json({ message: 'Participante registrado com sucesso', participanteId: result.insertId });
});
});

router.post('/inscrever', basicAuth, (req, res) => {
const { participanteId, eventoId } = req.body;

const sql = 'INSERT INTO eventos_participantes (eventoId, participanteId) VALUES (?, ?)';
req.db.query(sql, [eventoId, participanteId], (err, result) => {
if (err) {
console.error('Erro ao inscrever participante:', err);
res.status(500).json({ error: 'Erro ao inscrever participante' });
return;
}
res.status(201).json({ message: 'Participante inscrito com sucesso' });
});
});

module.exports = router;
