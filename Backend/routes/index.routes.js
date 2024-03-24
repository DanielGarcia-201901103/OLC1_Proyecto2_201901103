const express = require('express');
const router = express.Router();

const indexController = require('../controller/index.controller');

router.get("/", indexController.index);
router.post("/analizar", indexController.analizar);
router.get("/erroresT", indexController.erroresT);
router.get("/simbolos", indexController.simbolosT);
router.get("/arbol", indexController.arbol);
// falta el abrir archivo, crear archivo y guardar archivo
//router.post();
//router.put();
//router.delete();

module.exports = router;