// ################### ANALIZADOR LEXICO #######################
%lex
%options case-insensitive 

// ---------> Expresiones Regulares
entero  [0-9]+;
commulti \/\*[^\/\*]*[^\*\/]*\*\/;  //no sirve
comulinea "//".  ;              //no sirve
cadena \"[^\"]*\";
caracter \'[^\']\';
decimales [0-9]+(\.[0-9]+)?\b;  //no sirve

%%
// -----> Reglas Lexicas

{entero}                 { return 'ENTERO'; } 
{cadena}			     { return 'CADENAT'; }
"+"                      { return 'MAS'; }
"-"                	     { return 'MENOS'; }
"*"                      { return 'POR'; }
"/"                      { return 'DIVIDIDO'; }
"%"                      { return 'MODULO'; }
"="                      { return 'SIGUAL'; }
"!"                      { return 'SADMIRACION'; }
"<"                      { return 'SMENOR'; }
">"                      { return 'SMAYOR'; }
"?"                      { return 'SINTERROGACION'; }
":"                      { return 'DOSPUNTOS'; }
"|"                      { return 'COMPOR'; }
"&"                      { return 'COMPAND'; }
"("                      { return 'PARENTESISABRE'; }
")"                      { return 'PARENTESISCIERRA'; }
"{"                      { return 'LLAVEABRE'; }
"}"                      { return 'LLAVECIERRA'; }
";"                      { return 'PUNTOYCOMA'; }
"["                      { return 'CORCHETEABRE'; }
"]"                      { return 'CORCHETECIERRA'; }
"\""                     { return 'COMILLADOBLE'; } 
","                      { return 'COMA'; }
"."                      { return 'PUNTO'; }
"'"                      { return 'COMILLASIMPLE'; }


// -----> Espacios en Blanco
[ \s\r\n\t]             {/* Espacios se ignoran */}
{commulti}				 {/**/}
{comulinea}              {/**/}

// -----> FIN DE CADENA Y ERRORES
<<EOF>>               return 'EOF';
.  { console.error('Error léxico: \"' + yytext + '\", linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column);  }


/lex
// ################## ANALIZADOR SINTACTICO ######################
// -------> Precedencia

//%left 'MAS' 'MENOS'
//%left 'POR' 'DIVIDIDO'
//%left UMENOS

// -------> Simbolo Inicial
%start inicio


%% // ------> Gramatica

inicio
	: codigo EOF {$$=$1; return $$;}
;

codigo
	: codigo instruccion { $$ = $2;}
	| instruccion { $$ = $1;}
;
instruccion
	: ENTERO   {console.log($1); $$ = $1;}
	| ENTERO PUNTO ENTERO {console.log($1+$2+$3); $$ = $1;}
	| ENTERO MAS ENTERO	{console.log($1+ " "+ $2 + " " +$3); $$ = $1;}
	| CADENAT   {console.log($1); $$ = $1;}
	| error 	{console.error('Error sintáctico: ' + yytext + ',  linea: ' + this._$.first_line + ', columna: ' + this._$.first_column);}
;
//video https://www.youtube.com/watch?v=YcUUTyJ2DiE
//conferencia
//https://drive.google.com/file/d/1kiTbuTNiIu5q12Lol7CIWp8bFmxv4sKQ/view
//https://github.com/JoseMore99/Conferencia-AST          