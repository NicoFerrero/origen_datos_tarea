const mongoose = require("mongoose");
const Hamburguesa = require("./hamburguesa");
const PapasFritas = require("./papasFritas");

const menuSchema = new mongoose.Schema({
  hamburguesa: {
    type: Hamburguesa.hamburguesaSchema,
    required: true,
  },
  papasFritas: {
    type: PapasFritas.papasFritasSchema,
    required: true,
  },
  precioTotal: {
    type: Number,
    required: true,
  },
});

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
