const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

var corsOptions = {
    origin: '*'
};

app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));

//Routes 
const indexRoutes = require('./routes/index.routes.js');
app.use('/', indexRoutes);

//Si no reconoce la ruta enviá el error
app.use((req, res, next) => {
    res.status(404).json({message: "Not found"});
});

module.exports = app;