const parser = require("./analizador/gramatica.js");
//const parser = require("./analizador/parser.js");

//con alt + 96 se obtiene la comilla invertida para multilinea
let entrada =`
for(int i = 0; r < 3; i++){
int a = 10;
int b = 20;
}
`;
let resultado = parser.parse(entrada);
//console.log(resultado);



/*
const app = require('./app.js');
const PORT = 4000;
app.listen(PORT);
console.log(`Server on port ${PORT}`);
*/

//continuar con el video de la clase del 4/03
//en el minuto 47:56
//el tema continuaba con los routes y controller