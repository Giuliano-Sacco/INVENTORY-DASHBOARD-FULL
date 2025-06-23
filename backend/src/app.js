const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');



const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Inventory Dashboard API 🚀');
});

// Listar productos con async/await
app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Crear producto
app.post('/api/products', async (req, res) => {
  try {
    const { name, description, quantity } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'El nombre del producto es obligatorio' });
    }

    const [result] = await db.query(
      'INSERT INTO products (name, description, quantity) VALUES (?, ?, ?)',
      [name, description || null, quantity || 0]
    );

    res.status(201).json({
      message: 'Producto creado correctamente',
      productId: result.insertId,
    });
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});


app.put('/api/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, description, quantity } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'El nombre del producto es obligatorio' });
    }

    const [result] = await db.query(
      'UPDATE products SET name = ?, description = ?, quantity = ? WHERE id = ?',
      [name, description || null, quantity || 0, productId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({ message: 'Producto actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;

    const [result] = await db.query(
      'DELETE FROM products WHERE id = ?',
      [productId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/stock/in', async (req, res) => {
  try {
    const { product_id, quantity } = req.body;

    if (!product_id || !quantity) {
      return res.status(400).json({ error: 'Se requiere product_id y quantity' });
    }

    // Registrar movimiento
    await db.query(
      'INSERT INTO stock_movements (product_id, type, quantity) VALUES (?, "in", ?)',
      [product_id, quantity]
    );

    // Actualizar stock del producto
    await db.query(
      'UPDATE products SET quantity = quantity + ? WHERE id = ?',
      [quantity, product_id]
    );

    res.status(201).json({ message: 'Entrada de stock registrada' });
  } catch (error) {
    console.error('Error en entrada de stock:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/stock/out', async (req, res) => {
  try {
    const { product_id, quantity } = req.body;

    if (!product_id || !quantity) {
      return res.status(400).json({ error: 'Se requiere product_id y quantity' });
    }

    // Verificar si hay stock suficiente
    const [rows] = await db.query('SELECT quantity FROM products WHERE id = ?', [product_id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    if (rows[0].quantity < quantity) {
      return res.status(400).json({ error: 'Stock insuficiente' });
    }

    // Registrar movimiento
    await db.query(
      'INSERT INTO stock_movements (product_id, type, quantity) VALUES (?, "out", ?)',
      [product_id, quantity]
    );

    // Actualizar stock del producto
    await db.query(
      'UPDATE products SET quantity = quantity - ? WHERE id = ?',
      [quantity, product_id]
    );

    res.status(201).json({ message: 'Salida de stock registrada' });
  } catch (error) {
    console.error('Error en salida de stock:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/login', async (req, res) => {
  console.log("===> Body recibido:", req.body);

  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  try {
    const [rows] = await db.query('SELECT * FROM admins WHERE username = ?', [username]);
    console.log("===> Resultado query:", rows);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const admin = rows[0];
    console.log("===> Password recibido:", password);
    console.log("===> Hash en DB:", admin.password);

    const match = await bcrypt.compare(password, admin.password);
    console.log("===> Resultado de bcrypt.compare:", match);

    if (!match) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: admin.id, username: admin.username }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });

    res.json({ token });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ error: err.message });
  }
});


app.post('/api/admin/login', async (req, res) => {
  console.log('Body recibido:', req.body);  // <--- esto

  const { username, password } = req.body;
  // resto del código...
});




