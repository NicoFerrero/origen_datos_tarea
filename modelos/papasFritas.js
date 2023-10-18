const mongoose = require("mongoose");

const papasFritasSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  tamaño: { type: String, required: true },
  precio: { type: Number, required: true },
});

const PapasFritas = mongoose.model("PapasFritas", papasFritasSchema);

module.exports = { PapasFritas, papasFritasSchema };
