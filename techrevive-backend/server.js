require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

const app = express();
app.use(cors({
  origin: true, // Permite cualquier origen durante desarrollo
  credentials: true
}));


app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Usuario = mongoose.model('Usuario', new mongoose.Schema({
  usuario: String,
  contrasena: String
}));

const Comentario = mongoose.model('Comentario', new mongoose.Schema({
  usuario: String,
  mensaje: String,
  fecha: { type: Date, default: Date.now }
}));

app.post('/api/registro', async (req, res) => {
  const { usuario, contrasena } = req.body;
  const usuarioExistente = await Usuario.findOne({ usuario });
  if (usuarioExistente) return res.status(400).send('Usuario ya existe');
  const hash = await bcrypt.hash(contrasena, 10);
  await Usuario.create({ usuario, contrasena: hash });
  res.sendStatus(200);
});

app.post('/api/login', async (req, res) => {
  const { usuario, contrasena } = req.body;
  const user = await Usuario.findOne({ usuario });
  if (!user) return res.status(401).send('No existe');
  const valido = await bcrypt.compare(contrasena, user.contrasena);
  if (!valido) return res.status(401).send('Contraseña incorrecta');
  res.sendStatus(200);
});

app.post('/api/comentarios', async (req, res) => {
  const { usuario, mensaje } = req.body;
  await Comentario.create({ usuario, mensaje });
  res.sendStatus(200);
});

app.get('/api/comentarios', async (req, res) => {
  const comentarios = await Comentario.find();
  res.json(comentarios);
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Servidor corriendo en ${process.env.FRONTEND_URL || 'http://localhost:5000'}`);
});


const Mensaje = mongoose.model('Mensaje', new mongoose.Schema({
  nombre: String,
  email: String,
  mensaje: String,
  fecha: { type: Date, default: Date.now }
}));

app.post('/api/contacto', async (req, res) => {
  const { nombre, email, mensaje } = req.body;
  await Mensaje.create({ nombre, email, mensaje });
  res.sendStatus(200);  // Mensaje enviado correctamente
});
