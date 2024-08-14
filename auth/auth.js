const express = require('express');


function basicAuth(req, res, next) {
const auth = { login: 'admin', password: '1234' }; // Login e senha básicos

const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

if (login && password && login === auth.login && password === auth.password) {
return next();
}

res.set('WWW-Authenticate', 'Basic realm="401"');
res.status(401).json({ message: 'Autenticação necessária' });
}

module.exports = basicAuth;
