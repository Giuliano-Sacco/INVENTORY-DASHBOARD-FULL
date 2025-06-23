const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido' });
  }
}

module.exports = authMiddleware;



// Solo admins logueados pueden hacer esto:
app.post('/api/products', authMiddleware, async (req, res) => { ... });
app.put('/api/products/:id', authMiddleware, async (req, res) => { ... });
app.delete('/api/products/:id', authMiddleware, async (req, res) => { ... });
app.post('/api/stock/in', authMiddleware, async (req, res) => { ... });
app.post('/api/stock/out', authMiddleware, async (req, res) => { ... });


// src/middleware/auth.js
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ error: 'Token requerido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Podés acceder luego a req.user.id, etc.
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}

module.exports = verifyToken;



