const mongoose = require('mongoose');

// Esquema para el usuario
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

// Exportamos el modelo para usarlo en otros archivos
module.exports = mongoose.model('User', userSchema);
