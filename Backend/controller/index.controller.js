const analiza = require('../analizador/gramatica');
const index = (req, res) => {
    res.status(200).json({ message: 'Hello World :)' });
}

const analizar = (req, res) => {
    //obteniendo la información que se envía desde la consola de entrada
    const { texto } = req.body;
    //envia el texto a analizar y devuelve el resultado para poder enviarlo a la consola salida del frontend
    let resultado = analiza.parse(texto);
    res.status(200).json({ message: 'Analizando...', salida: resultado });
}

const erroresT = (req, res)=>{
    //aquí va la logica de errores
    //primero se verifica si hay errores
    //si los errores existen se crea el archivo
    //se abre el archivo y se envía la respuesta 
    //hacia el frontend
}

const simbolosT  =  (req, res)=>{
    //aquí va la logica de tabla simbolos
    //primero se verifica si hay simbolos
    //si los simbolos existen se crea el archivo
    //se abre el archivo y se envía la respuesta
}

const arbol  =  (req, res)=>{
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
    arbol 
};