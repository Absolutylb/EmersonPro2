const express = require('express');
const router = express.Router();

const palestrantesRoutes = require('./palestrantes');
const eventosRoutes = require('./eventos');
const participantesRoutes = require('./participantes');

router.use('/eventos', palestrantesRoutes);
router.use('/eventos', eventosRoutes);
router.use('/eventos/participantes', participantesRoutes);

module.exports = router;
