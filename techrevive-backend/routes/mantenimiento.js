const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const mantenimientoData = {
    estado: "Análisis completo en tiempo real",
    diagnosticoRapido: [
      "CPU funcionando a 87% de eficiencia",
      "Proceso sospechoso detectado y finalizado",
      "Archivos temporales eliminados (326 MB)",
      "RAM optimizada automáticamente"
    ],
    solucionIA: "La IA detectó procesos inactivos que consumían recursos. Se ejecutó una limpieza profunda y optimización del sistema.",
    recomendacionesPersonalizadas: [
      "Evita abrir más de 3 aplicaciones en segundo plano.",
      "Activa el modo ahorro de batería si la temperatura supera 40°C.",
      "Realiza mantenimiento automatizado cada 48 horas."
    ],
    impactoFinal: "Mejora del 35% en velocidad, 20% menos consumo de batería, 15% más almacenamiento disponible.",
    tiempoReal: new Date().toLocaleTimeString()
  };

  res.json(mantenimientoData);
});

module.exports = router;
