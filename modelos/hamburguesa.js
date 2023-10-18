const mongoose = require("mongoose");

const hamburguesaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  ingredientes: { type: [String], required: true },
  precio: { type: Number, required: true },
});

const Hamburguesa = mongoose.model("Hamburguesa", hamburguesaSchema);

module.exports = { Hamburguesa, hamburguesaSchema };
