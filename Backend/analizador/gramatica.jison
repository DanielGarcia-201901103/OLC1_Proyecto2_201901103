%{
const {addError} = require("../analisisSem/manejoErrores");
const Dato = require("../interprete/expresion/Dato.js");
const Print = require("../interprete/instruccion/Print.js");
const Aritmetica = require("../interprete/expresion/Aritmetica.js");
const Relacional = require("../interprete/expresion/Relacional.js");
const Asignacion = require("../interprete/instruccion/Asignacion.js");
const Reasignacion = require("../interprete/instruccion/Reasignacion.js");
const Logico = require("../interprete/expresion/Logicos.js");
const If = require("../interprete/instruccion/If.js");
%}

%lex

%options case-insensitive

%%

\s+                 //espacios en blanco
"//".*		//comentario simple	
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]  //comentario vlineas


"++"                return 'sigincremento';
"--"                return 'sigdecremento';
"+"                 return 'mas';
"-"                 return 'menos';
"/"                 return 'dividir';
"*"                 return 'por';
"%"                 return 'modulo';
"!="                return 'negacionigual';
"!"                 return 'notlogico';
"("                 return 'parentesisabre';
")"                 return 'parentesiscierra';
"{"                 return 'llaveabre';
"}"                 return 'llavecierra';
"["                 return 'corcheteabre';
"]"                 return 'corchetecierra';
","                 return 'signocoma';
";"                 return 'sigpuntoycoma';
"=="                return 'igualigual';
"="                 return 'sigigual';
"."                 return 'sigpunto';
"?"                 return 'siginterrogacion';
":"                 return 'dospuntos';
"<="                return 'menorigual';
">="                return 'mayorigual';
"<<"                return 'menormenor';
"<"                 return 'menorque';
">"                 return 'mayorque';
"||"                return 'orlogico';
"&&"                return 'andlogico';
"int"               return 'resint';
"double"            return 'resdouble';
"bool"              return 'resbool';
"char"              return 'reschar';
"std::string"       return 'resstring';
"pow"               return 'respotencia';
"new"               return 'resnew';
"if"                return 'resif';
"else"              return 'reselse';
"switch"            return 'resswitch';
"case"              return 'rescase';
"default"           return 'resdefault';
"while"             return 'reswhile';
"for"               return 'resfor';
"do"                return 'resdo';
"break"             return 'resbreak';
"continue"          return 'rescontinue';
"return"            return 'resreturn';
"void"              return 'resvoid';
"cout"              return 'rescout';
"endl"              return 'resendl';
"tolower"           return 'restolower';
"toupper"           return 'restoupper';
"round"             return 'resround';
"length"            return 'reslength';
"typeof"            return 'restypeof';
"std::tostring"     return 'restostring';
"c_str"             return 'rescstr';
"execute"           return 'resexecute';


("true"|"false")\b      return 'bool';
[0-9]+[.][0-9]+\b       return 'decimal';
[0-9]+\b                return 'numero';
([a-zA-Z])[a-zA-Z0-9_]*	return 'id';
\'[^\']\'               { yytext = yytext.substr(1,yyleng-2); return 'caracter';}
\"[^\"]*\"		{ yytext = yytext.substr(1,yyleng-2); return 'cadena'; }

<<EOF>>             return 'EOF';

. {addError('Error léxico', 'Caracter no reconocido\" ' + yytext +' \" ', yylloc.first_line, yylloc.first_column); console.error('Error léxico: \"' + yytext + '\", linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column);}
/lex

%left 'orlogico'
%left 'andlogico'
%right 'notlogico'
%left 'negacionigual' 'igualigual'
%left 'menorigual' 'mayorigual' 'mayorque' 'menorque'
%left 'mas', 'menos'
%left 'dividir', 'por','modulo' 
%left 'pow'
%right Umenos 

%start INI

%%

INI: CODIGO EOF                          {$$ = $1; return $$;}
;

CODIGO: CODIGO INSTRUCCION               { $$ = $1; $$.push($2);}
        |INSTRUCCION                     { $$ = []; $$.push($1);}
;

INSTRUCCION: DECLARACIONES            {console.log($1);$$=$1;}
        | SENTENCIAS                  {console.log($1); $$=$1;}  
        | FUNCIONES                   {console.log($1); $$=$1;}    
        | METODOS                     {console.log($1); $$=$1;}    
        | LLAMADAS sigpuntoycoma      {console.log($1); $$=$1;}    
        | FCOUT                       {console.log($1); $$=$1;}    
        | FEXECUTE                    {console.log($1); $$=$1;} 
;

DECLARACIONES: TIPODATO LISTANVARIABLES sigpuntoycoma                     { $$= new Asignacion($2, new Dato("sindato", $1, @1.first_line, @1.first_column), $1, @1.first_line, @1.first_column);} 
        | TIPODATO LISTANVARIABLES sigigual ASIGNACIONES sigpuntoycoma    { $$= new Asignacion($2, $4, $1, @1.first_line, @1.first_column);} 
        | LISTANVARIABLES sigigual ASIGNACIONES sigpuntoycoma             { $$= new Reasignacion($1, $3, @1.first_line, @1.first_column);}  
        | id sigincremento sigpuntoycoma                                  { $$= $1 + " "+ $2 + " "+ $3;} 
        | id sigdecremento sigpuntoycoma                                  { $$= $1 + " "+ $2 + " "+ $3;} 
        | error sigpuntoycoma                                             { addError('Error sintáctico', 'No se reconoce' + $1, this._$.first_line, this._$.first_column);}
;

TIPODATO: resint       {$$="int";} 
        | resdouble    {$$="double";} 
        | resbool      {$$="booleano";} 
        | reschar      {$$= "char";} 
        | resstring    {$$= "string";} 
;

LISTANVARIABLES: id                       {$$ = []; $$.push($1);} 
        | id signocoma LISTANVARIABLES    {$$ = $1; $$.push($2);} 
;

ASIGNACIONES: EXPRESIONES              {$$=$1;}  
        | OTRASEXPRESIONES             {$$=$1;}
        | error                        { addError('Error sintáctico', 'No se reconoce' + $1, this._$.first_line, this._$.first_column);}
;

EXPRESIONES: OPERACIONES           {$$=$1;} 
        | OPERACIONESRELACIONAL    {$$=$1;} 
        | OPERADORESLOGICOS        {$$=$1;} 
        | id                       {$$= new Dato($1, "id", @1.first_line, @1.first_column); }
        | caracter                 {$$= new Dato($1, "char", @1.first_line, @1.first_column);} 
        | cadena                   {$$= new Dato($1, "string", @1.first_line, @1.first_column);} 
        | bool                     {$$= new Dato($1, "booleano", @1.first_line, @1.first_column);} 
        | decimal                  {$$= new Dato($1, "double", @1.first_line, @1.first_column);} 
        | numero                   {$$= new Dato($1, "int", @1.first_line, @1.first_column);} 
;
OTRASEXPRESIONES: CASTEAR          {$$=$1;} 
        | OPERADORTERNARIO         {$$=$1;}  
        | INCREYDECRE              {$$=$1;}  
        | LLAMADAS                 {$$=$1;} 
        | FTOLOWER                 {$$=$1;}  
        | FTOUPPER                 {$$=$1;}  
        | FROUND                   {$$=$1;} 
        | FLENGTH                  {$$=$1;}  
        | FTYPEOF                  {$$=$1;}  
        | FTOSTRING                {$$=$1;} 
        | FCSTR                    {$$=$1;} 
; 

OPERACIONES: menos EXPRESIONES %prec Umenos                                              {$$= new Aritmetica($2, $2 , $1 + "unario", @1.first_line, @1.first_column );} 
        | EXPRESIONES mas EXPRESIONES                                                    {$$= new Aritmetica($1,$3,$2, @1.first_line, @1.first_column) ;} 
        | EXPRESIONES menos EXPRESIONES                                                  {$$= new Aritmetica($1,$3,$2, @1.first_line, @1.first_column) ;} 
        | EXPRESIONES por EXPRESIONES                                                    {$$= new Aritmetica($1,$3,$2, @1.first_line, @1.first_column) ;} 
        | EXPRESIONES dividir EXPRESIONES                                                {$$= new Aritmetica($1,$3,$2, @1.first_line, @1.first_column) ;} 
        | respotencia parentesisabre EXPRESIONES signocoma EXPRESIONES parentesiscierra  {$$= new Aritmetica($3,$5,$1, @1.first_line, @1.first_column) ;} 
        | EXPRESIONES modulo EXPRESIONES                                                 {$$= new Aritmetica($1,$3,$2, @1.first_line, @1.first_column) ;} 
        | AGRUPACION                                                                     {$$= $1;} 
;

OPERACIONESRELACIONAL: EXPRESIONES igualigual EXPRESIONES   {$$= new Relacional($1,$3,$2, @1.first_line, @1.first_column);} 
        | EXPRESIONES negacionigual EXPRESIONES             {$$= new Relacional($1,$3,$2, @1.first_line, @1.first_column);}  
        | EXPRESIONES menorigual EXPRESIONES                {$$= new Relacional($1,$3,$2, @1.first_line, @1.first_column);}  
        | EXPRESIONES menorque EXPRESIONES                  {$$= new Relacional($1,$3,$2, @1.first_line, @1.first_column);} 
        | EXPRESIONES mayorigual EXPRESIONES                {$$= new Relacional($1,$3,$2, @1.first_line, @1.first_column);} 
        | EXPRESIONES mayorque EXPRESIONES                  {$$= new Relacional($1,$3,$2, @1.first_line, @1.first_column);} 
;

OPERADORESLOGICOS:  notlogico EXPRESIONES      {$$= new Logico($2, $2 ,$1, @1.first_line, @1.first_column);} 
        | EXPRESIONES andlogico EXPRESIONES    {$$= new Logico($1, $3 ,$2, @1.first_line, @1.first_column);} 
        | EXPRESIONES orlogico EXPRESIONES     {$$= new Logico($1, $3 ,$2, @1.first_line, @1.first_column);} 
;

OPERADORTERNARIO: OPERACIONESRELACIONAL siginterrogacion ASIGNACIONES dospuntos ASIGNACIONES    {$$=$1 +" "+ $2 +" "+ $3 +$4 + " " + $5;} 
;


AGRUPACION: parentesisabre EXPRESIONES parentesiscierra              {$$= $2;} 
;


CASTEAR: parentesisabre TIPODATO parentesiscierra EXPRESIONES        {$$=$1 + " " + $2 + " " + $3 + " " + $4;} 
;

INCREYDECRE: EXPRESIONES sigincremento                               {$$=$1 + $2;} 
        | EXPRESIONES sigdecremento                                  {$$=$1 + $2;} 
;

SENTENCIAS: SENTIF                                                    {$$=$1;} 
        | SENTSWITCH                                                  {$$=$1;} 
        | SENTWHILE                                                   {$$=$1;}  
        | SENTFOR                                                     {$$=$1;} 
        | SENTDOWHILE                                                 {$$=$1;} 
        | error                        { addError('Error sintáctico', 'No se reconoce' + $1, this._$.first_line, this._$.first_column);}
 ;

SENTIF: resif parentesisabre EXPRESIONES parentesiscierra llaveabre CONTENIDOS FINIF    {$$=new If($3,$6, @1.first_line, @1.first_column);} 
;

CONTENIDOS: resbreak sigpuntoycoma                                           {$$=$1 + $2;} 
        | rescontinue sigpuntoycoma                                          {$$=$1 + $2;} 
        | RETORNOS                                                           {$$=$1;} 
        | CODIGO                                                             {$$=$1;} 
;

FINIF: llavecierra                                                           {$$=$1;} 
        | llavecierra reselse SENTIF                                         {$$=$1 + $2 +" " +$3;} 
        | llavecierra reselse llaveabre CONTENIDOS llavecierra               {$$=$1 + $2 +$3 +" " + $4 + " " + $5;} 
;

SENTSWITCH: resswitch parentesisabre EXPRESIONES parentesiscierra llaveabre SWCASOS llavecierra    {$$=$1 +" "+$2 + " " + $3 + " " +$4+" "+$5+" "+$6+" " + $7;} 
;

SWCASOS: SWCASE                                                               {$$=$1;} 
        | SWCASE SWCASOS                                                      {$$=$1 + " " +$2;} 
;

SWCASE: rescase ASIGNACIONES dospuntos CONTENIDOS                             {$$=$1 + " " + $2 + " " + $3 + " " + $4;} 
        | resdefault dospuntos CONTENIDOS                                     {$$=$1+ " " + $2 +" " + $3;} 
;

SENTWHILE: reswhile parentesisabre EXPRESIONES parentesiscierra llaveabre CONTENIDOSCICLOS llavecierra                                     {$$=$1 + " "+ $2 + $3+$4+" "+$5+" "+ $6+ " " +$7;} 
;

SENTFOR: resfor parentesisabre DECLARACIONES EXPRESIONES sigpuntoycoma INCREYDECRE parentesiscierra llaveabre CONTENIDOSCICLOS llavecierra {$$=$1+$2+" "+$3+" "+$4+" "+$5+" "+$6+" "+$7+" " +$8+$9+" "+$10;} 
;

SENTDOWHILE: resdo llaveabre CONTENIDOSCICLOS llavecierra reswhile parentesisabre EXPRESIONES parentesiscierra sigpuntoycoma               {$$=$1 + $2 +" "+ $3 + " " + $4 + $5 + $6 + " " + $7 + " " + $8 + $9 ;} 
;

CONTENIDOSCICLOS: resbreak sigpuntoycoma                                      {$$=$1 + $2;} 
        | rescontinue sigpuntoycoma                                           {$$=$1 + $2;} 
        | RETORNOS                                                            {$$=$1;} 
        | CODIGO                                                              {$$=$1;} 
;

RETORNOS: resreturn sigpuntoycoma                                             {$$=$1 + $2;} 
        | resreturn ASIGNACIONES sigpuntoycoma                                {$$=$1 + " " + $2 + " "+ $3;} 
;

FUNCIONES: TIPODATO id SNPARAMETROS llaveabre CONTENIDOSCICLOS llavecierra    {$$=$1 + " "+ $2 + " " + $3 +$4 + " " + $5 + $6;} 
;

SNPARAMETROS: parentesisabre PARAMETROS parentesiscierra                      {$$=$1 + " " + $2 + " " + $3;} 
        | parentesisabre  parentesiscierra                                    {$$=$1 + $2;} 
;

PARAMETROS: TIPODATO EXPRESIONES                                              {$$=$1+ $2;} 
        | TIPODATO EXPRESIONES signocoma PARAMETROS                           {$$=$1 + " " +  $2 +" " + $3 + " "  +  $4;} 
;

METODOS: resvoid id SNPARAMETROS llaveabre CONTENIDOSMETOD llavecierra        {$$=$1 + " " + $2 + " "+$3 + $4 + " " + $5+ " " + $6;} 
;

CONTENIDOSMETOD: resbreak sigpuntoycoma                                       {$$=$1 + $2;} 
        | rescontinue sigpuntoycoma                                           {$$=$1 + $2;} 
        | CODIGO                                                              {$$=$1;} 
;

LLAMADAS: id SNPARAMETROS                                                     {$$=$1 + " " + $2;} 
;

FCOUT:  rescout menormenor ASIGNACIONES menormenor resendl sigpuntoycoma    {$$= new Print($3, "salto", @1.first_line, @1.first_column) ;} 
        | rescout menormenor ASIGNACIONES sigpuntoycoma                          {$$= new Print($3, "sinsalto", @1.first_line, @1.first_column) ;}      
;

FTOLOWER: restolower parentesisabre ASIGNACIONES parentesiscierra             {$$=$1 + " " + $2 + " " + $3 + " " + $4;} 
;

FTOUPPER: restoupper parentesisabre ASIGNACIONES parentesiscierra             {$$=$1 + " " + $2 + " " + $3 + " " + $4;}  
;

FROUND: resround parentesisabre ASIGNACIONES parentesiscierra                 {$$=$1 + " " + $2 + " " + $3 + " " + $4;} 
;

FLENGTH: EXPRESIONES sigpunto reslength parentesisabre parentesiscierra       {$$=$1 + " " + $2 + " " + $3 + " " + $4 + $5;} 
;

FTYPEOF: restypeof parentesisabre ASIGNACIONES parentesiscierra               {$$=$1 + " " + $2 + " " + $3 + " " + $4;} 
;

FTOSTRING: restostring parentesisabre ASIGNACIONES parentesiscierra           {$$=$1 + " " + $2 + " " + $3 + " " + $4;} 
;

FCSTR: EXPRESIONES sigpunto rescstr parentesisabre parentesiscierra           {$$=$1 + " " + $2 + " " + $3 + " " + $4 + $5;} 
;

FEXECUTE: resexecute id SNPARAMETROS sigpuntoycoma                            {$$=$1 + " " + $2 + " " + $3 + " " + $4;} 
;

//la siguiente linea es la que maneja los errores sintacticos
// | error 	{console.error('Error sintáctico: ' + yytext + ',  linea: ' + this._$.first_line + ', columna: ' + this._$.first_column);}

//FALTA AGREGAR ASIGNACIONES DE VECTORES YA QUE SE ME OLVIDO AGREGARLO A LA GRAMATICA
//cuando toda la gramatica ya no contenga errores, entonces actualizar el bnf
//https://drive.google.com/drive/u/0/search?q=laboratorio%20compiladores

//video https://www.youtube.com/watch?v=YcUUTyJ2DiE
//conferencia
//https://drive.google.com/file/d/1kiTbuTNiIu5q12Lol7CIWp8bFmxv4sKQ/view
//https://github.com/JoseMore99/Conferencia-AST          

//clase del año pasado https://www.youtube.com/watch?v=Cr-faHppq4M   
// me quedé en el minuto 1:20:00