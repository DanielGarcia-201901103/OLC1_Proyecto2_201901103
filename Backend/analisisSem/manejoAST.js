
// <ruta_bin>/dot -Tsvg <ruta_archivo> -o <ruta_generada>
//https://drive.google.com/drive/u/0/search?q=laboratorio%20compiladores%201%202023
let dot = "C:/Program Files/Graphviz/bin/dot"
let entrada = "../Backend/analisisSem/ReportesArchivos/grafo.dot"
let salida = "../Backend/analisisSem/ReportesArchivos/ast.svg"

const { exec } = require("child_process");
const fs = require('fs');

function generarAST(){
    let comando = `dot.exe -Tsvg ${entrada} -o ${salida}`
    exec(comando, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error al ejecutar el comando: ${error.message}`);
          return;
        }
        console.log(`El archivo ${salida} se ha generado correctamente.`);
      });
}

function escribirArchivoDot(data){
    fs.mkdirSync('../Backend/analisisSem/ReportesArchivos/',{recursive:true});//Creamos la carpeta
    fs.appendFile(entrada, data, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log("Archivo creado")
        }
    });
}

//escribirArchivoDot(cadena)
//generarAST();
module.exports = {generarAST, escribirArchivoDot};