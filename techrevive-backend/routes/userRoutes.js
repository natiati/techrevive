const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  const newUser = new User({ username, email, password });
  try {
    await newUser.save();
    res.status(201).send('Usuario registrado');
  } catch (err) {
    res.status(400).send('Error al registrar el usuario');
  }
});

// Ruta para el inicio de sesión de un usuario
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(400).send('Credenciales incorrectas');
    }
    res.status(200).send('Inicio de sesión exitoso');
  } catch (err) {
    res.status(500).send('Error en el servidor');
  }
});

// Exportar las rutas para usarlas en el servidor principal
module.exports = router;
