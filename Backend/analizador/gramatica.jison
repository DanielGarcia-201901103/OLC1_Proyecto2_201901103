%{
const {addError} = require("../analisisSem/manejoErrores");
const Dato = require("../interprete/expresion/Dato.js");
const Print = require("../interprete/instruccion/Print.js");
const Aritmetica = require("../interprete/expresion/Aritmetica.js");
const IncrementoDecremento = require("../interprete/expresion/IncrementoDecremento.js");
const IncrementoDecremento2 = require("../interprete/expresion/IncrementoDecremento2.js");
const Relacional = require("../interprete/expresion/Relacional.js");
const Asignacion = require("../interprete/instruccion/Asignacion.js");
const Reasignacion = require("../interprete/instruccion/Reasignacion.js");
const Logico = require("../interprete/expresion/Logicos.js");
const If = require("../interprete/instruccion/If.js");
const Bwhile = require("../interprete/instruccion/Bwhile.js");
const BBreak = require("../interprete/instruccion/BBreak.js");
const Castear = require("../interprete/otrasexpresiones/Castear.js"); 
const Ftolower = require("../interprete/otrasexpresiones/Ftolower.js"); 
const Ftoupper = require("../interprete/otrasexpresiones/Ftoupper.js"); 
const Flength = require("../interprete/otrasexpresiones/Flength.js"); 
const Fround = require("../interprete/otrasexpresiones/Fround.js"); 
const Ftypeof = require("../interprete/otrasexpresiones/Ftypeof.js"); 
const Ftostring = require("../interprete/otrasexpresiones/Ftostring.js"); 
const {addVariables, limpiarlistVariables, getLVariables, concatenarlista , addELSEif, getElSEIF, limpiarElSEIF, addCasos, getCasos, concatenarlistaCasos, limpiarlistCasos} = require("../interprete/instruccion/listId.js");
const Oid = require("../interprete/expresion/Oid.js");
const Bdowhile = require("../interprete/instruccion/Bdowhile.js");
const Continu = require("../interprete/instruccion/Continu.js");
const elseif = require("../interprete/instruccion/elseif.js");
const soloelse = require("../interprete/instruccion/soloelse.js");
const Switchh = require("../interprete/instruccion/Switchh.js");
const Scasos = require("../interprete/instruccion/Scasos.js");
const Sdefault = require("../interprete/instruccion/Sdefault.js");
const BFor = require("../interprete/instruccion/BFor.js"); 
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
//para agregar los errores a la consola de salida, agregarlo a la lista de impresion que se encuentra en print global.obimpresiones desde la clase donde está addError
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

DECLARACIONES: TIPODATO LISTANVARIABLES sigpuntoycoma                     { $$= new Asignacion($2, new Dato("sindato", $1, @1.first_line, @1.first_column), $1, @1.first_line, @1.first_column); limpiarlistVariables();} 
        | TIPODATO LISTANVARIABLES sigigual ASIGNACIONES sigpuntoycoma    { $$= new Asignacion($2, $4, $1, @1.first_line, @1.first_column); limpiarlistVariables();} 
        | LISTANVARIABLES sigigual ASIGNACIONES sigpuntoycoma             { $$= new Reasignacion($1, $3, @1.first_line, @1.first_column); limpiarlistVariables();}  
        | id sigincremento sigpuntoycoma                                  { $$= new IncrementoDecremento($1,new Oid($1, "id", @1.first_line, @1.first_column, "id"),"++", @1.first_line, @1.first_column); } 
        | id sigdecremento sigpuntoycoma                                  { $$= new IncrementoDecremento($1,new Oid($1, "id", @1.first_line, @1.first_column, "id"),"--", @1.first_line, @1.first_column); } 
        | error sigpuntoycoma                                             { addError('Error sintáctico', 'No se reconoce' + $1, this._$.first_line, this._$.first_column);}
;

TIPODATO: resint       {$$="int";} 
        | resdouble    {$$="double";} 
        | resbool      {$$="booleano";} 
        | reschar      {$$= "char";} 
        | resstring    {$$= "string";} 
;

LISTANVARIABLES:  id signocoma LISTANVARIABLES    {  addVariables($1); concatenarlista($3); $$=getLVariables();} 
        |   id   {addVariables($1); $$=getLVariables();} 
;

ASIGNACIONES: EXPRESIONES              {$$=$1;}  
        | OTRASEXPRESIONES             {$$=$1;}
        | error                        { addError('Error sintáctico', 'No se reconoce' + $1, this._$.first_line, this._$.first_column);}
;

EXPRESIONES: OPERACIONES           {$$=$1;} 
        | OPERACIONESRELACIONAL    {$$=$1;} 
        | OPERADORESLOGICOS        {$$=$1;} 
        | id                       {$$= new Oid($1, "id", @1.first_line, @1.first_column, "id"); }
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


CASTEAR: parentesisabre TIPODATO parentesiscierra EXPRESIONES        {$$=new Castear($4,$2, @1.first_line, @1.first_column);} 
;

INCREYDECRE: EXPRESIONES sigincremento                               { $$= new IncrementoDecremento2($1,"++", @1.first_line, @1.first_column, $1.tipoid, $1.id); } 
        | EXPRESIONES sigdecremento                                  { $$= new IncrementoDecremento2($1,"--", @1.first_line, @1.first_column, $1.tipoid, $1.id); } 
;

SENTENCIAS: SENTIF                                                    {$$=$1;} 
        | SENTSWITCH                                                  {$$=$1;} 
        | SENTDOWHILE                                                 {$$=$1;} 
        | SENTWHILE                                                   {$$=$1;}  
        | SENTFOR                                                     {$$=$1;} 
        | error                        { addError('Error sintáctico', 'No se reconoce' + $1, this._$.first_line, this._$.first_column);}
 ;

SENTIF: resif parentesisabre EXPRESIONES parentesiscierra llaveabre CONTENIDOS FINIF    {$$= new If($3, $6, $7 ,@1.first_line, @1.first_column); limpiarElSEIF();} 
;

CONTENIDOS: CONTENIDOS CONTEIF                          { $$ = $1; $$.push($2);} 
        | CONTEIF                                       { $$ = []; $$.push($1);}
; 
CONTEIF: resbreak sigpuntoycoma                                              {$$= new BBreak(@1.first_line, @1.first_column);} 
        | rescontinue sigpuntoycoma                                          {$$= new Continu(@1.first_line, @1.first_column);} 
        | RETORNOS                                                           {$$= $1;} 
        | INSTRUCCION                                                        {$$= $1;} 
;

FINIF: llavecierra                                                                                            {$$=[$1];} 
        | llavecierra reselse resif parentesisabre EXPRESIONES parentesiscierra llaveabre CONTENIDOS FINIF    {addELSEif(new elseif($5, $8, $9 , @1.first_line, @1.first_column)); $$= getElSEIF();} 
        | llavecierra reselse llaveabre CONTENIDOS llavecierra                                                {$$= [new soloelse($4, @1.first_line, @1.first_column)];} 
;

SENTSWITCH: resswitch parentesisabre EXPRESIONES parentesiscierra llaveabre SWCASOS llavecierra    {$$=new Switchh($3, $6, @1.first_line, @1.first_column); limpiarlistCasos();} 
;

SWCASOS: SWCASE                                                               { addCasos($1); $$=getCasos();} 
        | SWCASE SWCASOS                                                      { addCasos($1); concatenarlistaCasos($2); $$=getCasos();}
;

SWCASE: rescase ASIGNACIONES dospuntos CONTENIDOS                             {$$= new Scasos($2, $4, @1.first_line, @1.first_column);} 
        | resdefault dospuntos CONTENIDOS                                     {$$= new Sdefault($3, @1.first_line, @1.first_column);} 
;

SENTWHILE: reswhile parentesisabre EXPRESIONES parentesiscierra llaveabre CONTENIDOSCICLOS llavecierra                                     {$$= new Bwhile($3, $6,  @1.first_line, @1.first_column);} 
;

SENTFOR: resfor parentesisabre DECLARACIONES EXPRESIONES sigpuntoycoma INCREYDECRE parentesiscierra llaveabre CONTENIDOSCICLOS llavecierra {$$= new BFor($3, $4, $6, $9,  @1.first_line, @1.first_column);} 
;

SENTDOWHILE: resdo llaveabre CONTENIDOSCICLOS llavecierra reswhile parentesisabre EXPRESIONES parentesiscierra sigpuntoycoma               {$$= new Bdowhile($3, $7,  @1.first_line, @1.first_column);} 
;

CONTENIDOSCICLOS: CONTENIDOSCICLOS CONTENIDOCICL                              { $$ = $1; $$.push($2);}
        | CONTENIDOCICL                                                       { $$ = []; $$.push($1);}
;
CONTENIDOCICL:resbreak sigpuntoycoma                                          {$$= new BBreak(@1.first_line, @1.first_column);} 
        | rescontinue sigpuntoycoma                                           {$$= new Continu(@1.first_line, @1.first_column);} 
        | RETORNOS                                                            {$$=$1;} 
        | INSTRUCCION                                                         {$$=$1;} 
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

CONTENIDOSMETOD: CONTENIDOSMETOD CONTMETOD                                    { $$ = $1; $$.push($2);} 
        | CONTMETOD                                                           { $$ = []; $$.push($1);}
;
CONTMETOD: resbreak sigpuntoycoma                                             {$$= new BBreak(@1.first_line, @1.first_column);} 
        | rescontinue sigpuntoycoma                                           {$$= new Continu(@1.first_line, @1.first_column);} 
        | INSTRUCCION                                                         {$$=$1;} 
;

LLAMADAS: id SNPARAMETROS                                                     {$$=$1 + " " + $2;} 
;

FCOUT:  rescout menormenor ASIGNACIONES menormenor resendl sigpuntoycoma    {$$= new Print($3, "salto", @1.first_line, @1.first_column) ;} 
        | rescout menormenor ASIGNACIONES sigpuntoycoma                          {$$= new Print($3, "sinsalto", @1.first_line, @1.first_column) ;}      
;

FTOLOWER: restolower parentesisabre ASIGNACIONES parentesiscierra             {$$= new Ftolower($3, @1.first_line, @1.first_column);} 
;

FTOUPPER: restoupper parentesisabre ASIGNACIONES parentesiscierra             {$$= new Ftoupper($3, @1.first_line, @1.first_column);}  
;

FROUND: resround parentesisabre ASIGNACIONES parentesiscierra                 {$$= new Fround($3, @1.first_line, @1.first_column);} 
;

FLENGTH: EXPRESIONES sigpunto reslength parentesisabre parentesiscierra       {$$=new Flength($1, @1.first_line, @1.first_column);} 
;

FTYPEOF: restypeof parentesisabre ASIGNACIONES parentesiscierra               {$$=new Ftypeof($3, @1.first_line, @1.first_column);} 
;

FTOSTRING: restostring parentesisabre ASIGNACIONES parentesiscierra           {$$=new Ftostring($3, @1.first_line, @1.first_column);} 
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



//MANEJAR EL ELSE IGUAL QUE EL ELSE IF PERO A DIFERENCIA QUE NO VA A TENER CONDICION, SINO QUE SIMPLEMENTE INTERPRETA EL CONTENIDO 
// AGREGAR LA EJECUCIÓN DEL ELSE EN EL ELSE IF Y EN EL IF SIMPLE PARA QUE LO EJECUTE SI NO ENCUENTRA OTROS