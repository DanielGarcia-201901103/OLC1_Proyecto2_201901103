const parser = require("./analizador/gramatica.js");
//const parser = require("./analizador/parser.js");

//con alt + 96 se obtiene la comilla invertida para multilinea
let entrada =`
//comentario de una linea
int edad = 18;
bool banderaEdad = edad > 17 ? true : false;

// Ejemplo de encapsulamiento de sentencias
if(1==1){
int a = 10;
int b = 20;
}

/*
  aqui medio
*/
int numero;
int var1, var2, var3;
std::string cadena = "hola";
char var4 = 'a';
bool flag = true;
double a, b, c = 5.5;


// Ejemplos
int edad = 18;
// Ejemplos
int edad = (int) 18.6; // toma el valor entero de 18
char letra = (char) 70; // toma el valor 'F' ya que el 70 en ascii es F
double numero = (double) 16; // toma el valor de 16.0

edad++; // tiene el valor de 19
edad--; // tiene el valor de 18
/*
  aqui termina
*/
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