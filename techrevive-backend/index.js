const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Bienvenido a TechRevive API');
});

// Simulación: obtener diagnóstico
app.get('/api/diagnostico', (req, res) => {
  res.json({
    estado: 'Óptimo',
    bateria: 'Buena',
    almacenamiento: '70% libre',
    temperatura: 'Normal',
  });
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
