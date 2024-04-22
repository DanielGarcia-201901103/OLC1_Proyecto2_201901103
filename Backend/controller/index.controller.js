const analiza = require('../analizador/gramatica');
const { openReporteErr, generarTabla, limpiarTabla } = require('../analisisSem/manejoErrores');
const { generarTablaS, limpiarTablaS, openReporteS } = require('../analisisSem/manejoSimbolos');
const { generarAST, escribirArchivoDot } = require('../analisisSem/manejoAST');
const Entorno = require('../analisisSem/Entorno');
require('../interprete/instruccion/print');

const index = (req, res) => {
    res.status(200).json({ message: 'Hello World :)' });
}

const analizar = (req, res) => {
    try {
        limpiarTabla();
        limpiarTablaS();
        //obteniendo la información que se envía desde la consola de entrada
        const { texto } = req.body;
        //envia el texto a analizar y devuelve el resultado para poder enviarlo a la consola salida del frontend
        let resultado = analiza.parse(texto);
        let cadena = "graph {\nordering=\"out\"\n"
        let entornoglobal = new Entorno('GLOBAL', null);
        resultado.forEach(instruccion => {
            instruccion.interpretar(entornoglobal);
            cadena = cadena + instruccion.getAst().cadena;
        })
        cadena = cadena +"\n}"
        escribirArchivoDot(cadena)
        generarAST();
        res.status(200).json({ message: 'Analizando...', salida: obimpresiones });
        obimpresiones = [];
        
    } catch (e) { 
        console.log(e) 
    }

}

const erroresT = (req, res) => {
    //aquí va la logica de errores
    //primero se verifica si hay errores
    //si los errores existen se crea el archivo
    //se abre el archivo y se envía la respuesta 
    //hacia el frontend
    generarTabla();
    console.log('Generando tabla de errores...');
    let respuesta = openReporteErr();
    console.log('Respuesta:', respuesta);
    res.status(200).json({ message: 'Analizando...', salida: respuesta });
}

const simbolosT = (req, res) => {
    //aquí va la logica de tabla simbolos
    //primero se verifica si hay simbolos
    //si los simbolos existen se crea el archivo
    //se abre el archivo y se envía la respuesta
    generarTablaS();
    console.log('Generando tabla de simbolos...');
    let respuesta = openReporteS();
    console.log('Respuesta:', respuesta);
    res.status(200).json({ message: 'Analizando...', salida: respuesta });
}

const arbol = (req, res) => {
    //aquí va la logica de la creación del arbol
    //verificar si se creó el archivo del arbol .dot
    //si el archivo existe se abre y se envía la respuesta 
    //hacia el frontend
}

//falta abrir, guardar y crear archivo
module.exports = {
    index,
    analizar,
    erroresT,
    simbolosT,
    arbol,

};