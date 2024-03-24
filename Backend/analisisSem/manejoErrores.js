const MyError = require('./myerror');
const fs = require('fs');
let tablaErrores = [];
const urlReporte = '../Backend/analisisSem/ReportesArchivos/ReporteErrores.html';

function addError(tipo, descripcion, linea, columna) {
    let verror = new MyError(tipo, descripcion, linea, columna);
    tablaErrores.push(verror);
}

function generarTabla() {
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
        <h2> *************** Tabla de Errores ***************</h2>
        <table style="width:100%">
        <tr>
        <th>#</th>
        <th>Tipo</th>
        <th>Descripción</th>
        <th>Linea</th>
        <th>Columna</th>
        </tr>\n
    
    `;
        let contador = 1;
        let agregartxt = "";
        if (!tablaErrores || tablaErrores.length === 0) {
            console.log('La lista está vacía.');
        } else {
            for (let i = 0; i < tablaErrores.length; i++) {
                let temporalcontador = String(contador);
                let temporallinea = String(tablaErrores[i].getLinea());
                let temporalcolumna = String(tablaErrores[i].getColumna()) ;
                let temporaltipo = String(tablaErrores[i].getTipo());
                let temporaldescripcion = String(tablaErrores[i].getDescripcion());
                agregartxt += `
        <tr> 
        <td>` + temporalcontador + `</td> 
        <td>` + temporaltipo + `</td>
        <td>` + temporaldescripcion + `</td>
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
        limpiarTabla();
    } catch (error) {
        console.error('Error al generar la tabla de errores:', error);
    }
    }
    
    function escribirArchivo(contenido) {
        fs.writeFile(urlReporte, contenido, (error)=>{
            if (error) {
                console.error('Error al escribir el archivo:', error);
            }
            console.log('Archivo escrito correctamente.');
        });
    }

    function limpiarTabla() {
        tablaErrores = [];
    }
//https://www.youtube.com/watch?v=jmHkMwmzcSI
//https://www.youtube.com/watch?v=Qm0GlyS_qU8
//https://www.w3schools.com/nodejs/ref_fs.asp
    function openReporteErr(){
        import('open').then((open) => {
            // Abrir el archivo en el navegador
            open.default(urlReporte)
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
        addError,
        generarTabla,
        limpiarTabla,
        openReporteErr
    };