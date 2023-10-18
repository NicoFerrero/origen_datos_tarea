const express = require("express");
const app = express();
const http = require("http").createServer(app);
const PORT = 5000;
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const PapasFritas = require("./modelos/papasFritas");
const Hamburguesa = require("./modelos/hamburguesa");
const Menu = require("./modelos/menu");

dotenv.config();

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.grd52sg.mongodb.net/`;

app.use(express.json());

collection = null;

mongoose
  .connect(uri, { dbName: process.env.MONGO_DB_NAME })
  .then(() => {
    console.log("Connected");
  })
  .catch((error) => {
    console.log("Error connecting to database: ", error);
  });

http.listen(PORT, () => {
  console.log(`listening to ${PORT}`);
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.get("/burgers/:offset/:limit", async (req, res) => {
  let { limit = 5, offset = 0 } = req.params;
  if (limit < 0 || offset < 0) {
    res.status(404).json({
      err: "El limite u offset de la paginacion no pueden ser menores que 0",
    });
    return;
  }
  try {
    const result = await Hamburguesa.Hamburguesa.find()
      .skip(offset)
      .limit(limit);
    res.json({ burgers: result });
  } catch (error) {
    res.status(500).json({ err: error });
  }
});

app.get("/frech-fries/:offset/:limit", async (req, res) => {
  let { limit = 5, offset = 0 } = req.params;
  if (limit < 0 || offset < 0) {
    res.status(404).json({
      err: "El limite u offset de la paginacion no pueden ser menores que 0",
    });
    return;
  }
  try {
    const result = await PapasFritas.PapasFritas.find()
      .skip(offset)
      .limit(limit);
    res.json({ frenchFries: result });
  } catch (error) {
    res.status(500).json({ err: error });
  }
});

app.post("/menu", async (req, res) => {
  let { hamburguesa, papasFritas } = req.body;
  try {
    const h = await Hamburguesa.Hamburguesa.findOne({
      nombre: hamburguesa,
    }).select("nombre precio ingredientes");
    if (!h) {
      res.status(404).json({ err: "La hamburguesa seleccionada no exite" });
      return;
    }
    const pf = await PapasFritas.PapasFritas.findOne({
      nombre: papasFritas,
    }).select("nombre precio tamaño");
    if (!pf) {
      res.status(404).json({ err: "Las papas fritas seleccionadas no exiten" });
      return;
    }
    const m = new Menu({
      hamburguesa: {
        nombre: h.nombre,
        ingredientes: h.ingredientes,
        precio: h.precio,
      },
      papasFritas: {
        nombre: pf.nombre,
        tamaño: pf.tamaño,
        precio: pf.precio,
      },
      precioTotal: h.precio + pf.precio,
    });
    const menu = await m.save();
    res.json({ menu: menu });
  } catch (error) {
    res.status(500).json({ err: error });
  }
});
