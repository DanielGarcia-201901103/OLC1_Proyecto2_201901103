const MyError = require('./myerror');
const fs = require('fs');
let tablaErrores = [];

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
        escribirArchivo("../ReportesArchivos/ReporteErrores.html", txtrep);
        limpiarTabla();
    } catch (error) {
        console.error('Error al generar la tabla de errores:', error);
    }
    }

    function escribirArchivo(rutaArchivo, contenido) {
        try {
            // Cambiar permisos para escritura
            fs.chmodSync(rutaArchivo, 0o666); // 0o666 representa permisos de lectura y escritura para todos los usuarios
            // Escribir en el archivo
            fs.writeFileSync(rutaArchivo, contenido);
            console.log('Archivo escrito correctamente.');
          } catch (error) {
            console.error('Error al escribir el archivo:', error);
          }
    }

    function limpiarTabla() {
        tablaErrores = [];
    }

    function openReporteErr(){
        fetch("../ReportesArchivos/ReporteErrores.html").then(response => {
            if (!response.ok) {
                return 'El archivo no existe o no se puede acceder.';
            }
            window.open("../ReportesArchivos/ReporteErrores.html", '_blank');
            return 'Archivo abierto correctamente.';
        }).catch(error => {
            return 'Error al verificar el archivo';
        });
    }
    module.exports = {
        addError,
        generarTabla,
        limpiarTabla,
        openReporteErr
    };