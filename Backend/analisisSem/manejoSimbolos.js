const Simbolo = require('./simbolos');
const fs = require('fs');
let tablaSimbolos = [];
const urlReporteS = '../Backend/analisisSem/ReportesArchivos/ReporteSimbolos.html';

function addSimbolo(id, tipo, tipodato, entorno, linea, columna) {
    let vsimbolo = new Simbolos(id, tipo, tipodato, entorno, linea, columna);
    tablaSimbolos.push(vsimbolo);
}

function generarTablaS() {
    try {
        let txtrep = `
    <!DOCTYPE html>
    <html>
    <style>
    body{
        background: #FFEFBA;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #FFFFFF, #FFEFBA);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #FFFFFF, #FFEFBA); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }
    table, th, td {
        border:1px solid black;
    }
    th{
        background-color: #a2ab58;
    }
    </style>
    <body>
        <h2> *************** Tabla de Simbolos ***************</h2>
        <table style="width:100%">
        <tr>
        <th>#</th>
        <th>ID</th>
        <th>Tipo</th>
        <th>Tipo Dato</th>
        <th>Entorno</th>
        <th>Linea</th>
        <th>Columna</th>
        </tr>\n
    
    `;
        let contador = 1;
        let agregartxt = "";
        if (!tablaSimbolos || tablaSimbolos.length === 0) {
            console.log('La lista está vacía.');
        } else {
            for (let i = 0; i < tablaSimbolos.length; i++) {
                let temporalcontador = String(contador);
                let temporallinea = String(tablaSimbolos[i].getLinea());
                let temporalcolumna = String(tablaSimbolos[i].getColumna()) ;
                let temporaltipo = String(tablaSimbolos[i].getTipo());
                let temporaltipodato = String(tablaSimbolos[i].getTipoDato());
                let temporalEntorno = String(tablaSimbolos[i].getEntorno());
                let temporalid = String(tablaSimbolos[i].getId());
                agregartxt += `
        <tr> 
        <td>` + temporalcontador + `</td> 
        <td>` + temporalid + `</td>
        <td>` + temporaltipo + `</td>
        <td>` + temporaltipodato + `</td>
        <td>` + temporalEntorno + `</td>
        <td>` + temporallinea + `</td>
        <td>` + temporalcolumna + `</td>
        </tr>\n
            `;
                contador++;
            }
        }

        txtrep = txtrep + agregartxt + `
    </table>
    </body>
    </html>`;
        //escribir archivo 
        escribirArchivo(txtrep);
        limpiarTablaS();
    } catch (error) {
        console.error('Error al generar la tabla de errores:', error);
    }
    }
    
    function escribirArchivo(contenido) {
        fs.writeFile(urlReporteS, contenido, (error)=>{
            if (error) {
                console.error('Error al escribir el archivo:', error);
            }
            console.log('Archivo escrito correctamente.');
        });
    }

    function limpiarTablaS() {
        tablaSimbolos = [];
    }

    function openReporteS(){
        import('open').then((open) => {
            // Abrir el archivo en el navegador
            open.default(urlReporteS)
            .then(() => {
                console.log('Archivo abierto en el navegador');
            })
            .catch((err) => {
                console.error('Error al abrir el archivo:', err);
            });
        }).catch((err) => {
            console.error('Error al importar el módulo:', err);
        });
    }

    module.exports = {
        addSimbolo,
        generarTablaS,
        limpiarTablaS,
        openReporteS
    };