%{
//const {Aritmetica,tipoArit} = require('./expresion/Aritmetica')
//const {Relacional,TipoRel} = require('./expresion/relaciones')
//const {tipo} = require('./expresion/retorno')
//const {Variable} = require('./expresion/variable')
//const {Nativo,tipoNat} = require('./expresion/nativo')
//const {Declarar} = require('./instrucciones/declarar')
//const {Print} = require('./instrucciones/print')
//const {Bloque} = require('./instrucciones/bloque')
//const {If} = require('./instrucciones/If')
%}

%lex

%options case-insensitive

%%

[ \s\r\n\t]                //espacios en blanco
"//".*		//comentario simple	

"+"                 return 'mas';
"-"                 return 'menos';
"/"                 return 'dividir';
"*"                 return 'por';
"%"                 return 'modulo';
"!"                 return 'notlogico';
"("                 return 'parentesisabre';
")"                 return 'parentesiscierra';
"{"                 return 'llaveabre';
"}"                 return 'llavecierra';
"["                 return 'corcheteabre';
"]"                 return 'corchetecierra';
","                 return 'signocoma';
";"                 return 'sigpuntoycoma';
"="                 return 'sigigual';
"."                 return 'sigpunto';
"?"                 return 'siginterrogacion';
":"                 return 'dospuntos';
"=="                return 'igualigual';
"!="                return 'negacionigual';
"<"                 return 'menorque';
">"                 return 'mayorque';
"<="                return 'menorigual';
">="                return 'mayorigual';
"||"                return 'orlogico';
"&&"                return 'andlogico';
"++"                return 'sigincremento';
"--"                return 'sigdecremento';
"<<"                return 'menormenor';
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
[0-9]+[.][0-9]+\b    return 'decimal';
[0-9]+\b                return 'numero';
([a-zA-Z])[a-zA-Z0-9_]*	return 'id';
\'[^\']\'               return 'caracter';
\"[^\"]*\"				{ yytext = yytext.substr(1,yyleng-2); return 'cadena'; }

<<EOF>>             return 'EOF';
.                   {console.log(yylloc.first_line, yylloc.first_columm, 'Lexico', yytext)}
/lex

%left 'orlogico'
%left 'andlogico'
%left 'notlogico'
%left 'negacionigual' 'igualigual'
%left 'menorigual' 'mayorigual' 'mayorque' 'menorque'
%left 'mas', 'menos'
%left 'dividir', 'por','modulo' 
%left 'pow'
%left Umenos 

%start INI

%%

INI: CODIGO EOF                              {return $1;}
;

CODIGO: CODIGO INSTRUCCION                   { $$ = $2;}
            |INSTRUCCION                     { $$ = $1;}
;

INSTRUCCION: DECLARACIONES            {console.log($1);$$=$1;}
        | SENTENCIAS                  {console.log($1);$$=$1;}  
        | FUNCIONES                   {console.log($1);$$=$1;}    
        | METODOS                     {console.log($1);$$=$1;}    
        | LLAMADAS sigpuntoycoma      {console.log($1);$$=$1;}    
        | FCOUT                       {console.log($1);$$=$1;}    
        | FEXECUTE                    {console.log($1);$$=$1;} 
;

DECLARACIONES: TIPODATO LISTANVARIABLES sigpuntoycoma            {console.log($1);$$=$1;} 
        | TIPODATO LISTANVARIABLES sigigual ASIGNACIONES sigpuntoycoma    {console.log($1);$$=$1;} 
        | LISTANVARIABLES sigigual ASIGNACIONES sigpuntoycoma {console.log($1);$$=$1;} 
;
 
TIPODATO: resint       {console.log($1);$$=$1;} 
        | resdouble    {console.log($1);$$=$1;} 
        | resbool    {console.log($1);$$=$1;} 
        | reschar    {console.log($1);$$=$1;} 
        | resstring    {console.log($1);$$=$1;} 
;

LISTANVARIABLES: id    {console.log($1);$$=$1;} 
        | id signocoma LISTANVARIABLES    {console.log($1);$$=$1;} 
;

ASIGNACIONES: EXPRESIONES 
        | OTRASEXPRESIONES
;

EXPRESIONES: OPERACIONES    {console.log($1);$$=$1;} 
        | OPERACIONESRELACIONAL    {console.log($1);$$=$1;} 
        | OPERADORESLOGICOS    {console.log($1);$$=$1;} 
        | id    {console.log($1);$$=$1;} 
        | caracter    {console.log($1);$$=$1;} 
        | cadena    {console.log($1);$$=$1;} 
        | bool    {console.log($1);$$=$1;} 
        | decimal    {console.log($1);$$=$1;} 
        | numero    {console.log($1);$$=$1;} 
;
OTRASEXPRESIONES: AGRUPACION    {console.log($1);$$=$1;} 
        | OPERADORTERNARIO    {console.log($1);$$=$1;} 
        | CASTEAR    {console.log($1);$$=$1;}
        | INCREYDECRE    {console.log($1);$$=$1;}  
        | LLAMADAS    {console.log($1);$$=$1;} 
        | FTOLOWER    {console.log($1);$$=$1;} 
        | FTOUPPER    {console.log($1);$$=$1;} 
        | FROUND    {console.log($1);$$=$1;} 
        | FLENGTH    {console.log($1);$$=$1;} 
        | FTYPEOF    {console.log($1);$$=$1;} 
        | FTOSTRING    {console.log($1);$$=$1;} 
        | FCSTR    {console.log($1);$$=$1;} 
; 

OPERACIONES: menos EXPRESIONES %prec Umenos    {console.log($1);$$=$1;} 
        | EXPRESIONES mas EXPRESIONES    {console.log($1);$$=$1;} 
        | EXPRESIONES menos EXPRESIONES    {console.log($1);$$=$1;} 
        | EXPRESIONES por EXPRESIONES    {console.log($1);$$=$1;} 
        | EXPRESIONES dividir EXPRESIONES    {console.log($1);$$=$1;} 
        | respotencia parentesisabre EXPRESIONES signocoma EXPRESIONES parentesiscierra    {console.log($1);$$=$1;} 
        | EXPRESIONES modulo EXPRESIONES    {console.log($1);$$=$1;} 
;

OPERACIONESRELACIONAL: EXPRESIONES igualigual EXPRESIONES    {console.log($1);$$=$1;} 
        | EXPRESIONES negacionigual EXPRESIONES    {console.log($1);$$=$1;} 
        | EXPRESIONES menorigual EXPRESIONES    {console.log($1);$$=$1;} 
        | EXPRESIONES menorque EXPRESIONES    {console.log($1);$$=$1;} 
        | EXPRESIONES mayorigual EXPRESIONES    {console.log($1);$$=$1;} 
        | EXPRESIONES mayorque EXPRESIONES    {console.log($1);$$=$1;} 
;

OPERADORESLOGICOS:  notlogico EXPRESIONES    {console.log($1);$$=$1;} 
        | EXPRESIONES andlogico EXPRESIONES    {console.log($1);$$=$1;} 
        | EXPRESIONES orlogico EXPRESIONES    {console.log($1);$$=$1;} 
;

OPERADORTERNARIO: OPERACIONESRELACIONAL siginterrogacion ASIGNACIONES dospuntos ASIGNACIONES    {console.log($1);$$=$1;} 
;


AGRUPACION: parentesisabre EXPRESIONES parentesiscierra    {console.log($1);$$=$1;} 
;


CASTEAR: parentesisabre TIPODATO parentesiscierra ASIGNACIONES    {console.log($1);$$=$1;} 
;

INCREYDECRE: EXPRESIONES sigincremento    {console.log($1);$$=$1;} 
        | EXPRESIONES sigdecremento    {console.log($1);$$=$1;} 
;

SENTENCIAS: SENTIF    {console.log($1);$$=$1;} 
        | SENTSWITCH    {console.log($1);$$=$1;} 
        | SENTWHILE    {console.log($1);$$=$1;} 
        | SENTFOR    {console.log($1);$$=$1;} 
        | SENTDOWHILE    {console.log($1);$$=$1;} 
;

SENTIF: resif parentesisabre EXPRESIONES parentesiscierra llaveabre CONTENIDOS FINIF    {console.log($1);$$=$1;} 
;

CONTENIDOS: resbreak sigpuntoycoma    {console.log($1);$$=$1;} 
        | RETORNOS    {console.log($1);$$=$1;} 
        | CODIGO    {console.log($1);$$=$1;} 
;

FINIF: llavecierra    {console.log($1);$$=$1;} 
        | llavecierra reselse SENTIF    {console.log($1);$$=$1;} 
        | llavecierra reselse llaveabre CONTENIDOS llavecierra     {console.log($1);$$=$1;} 
;

SENTSWITCH: resswitch parentesisabre CONDICIONALIF parentesiscierra llaveabre SWCASOS llavecierra    {console.log($1);$$=$1;} 
;

SWCASOS: SWCASE    {console.log($1);$$=$1;} 
        | SWCASE SWCASOS    {console.log($1);$$=$1;} 
;

SWCASE: rescase ASIGNACIONES dospuntos CONTENIDOS    {console.log($1);$$=$1;} 
        | resdefault dospuntos CONTENIDOS    {console.log($1);$$=$1;} 
;

SENTWHILE: reswhile parentesisabre CONDICIONALIF parentesiscierra llaveabre CONTENIDOSCICLOS llavecierra    {console.log($1);$$=$1;} 
;

SENTFOR: resfor parentesisabre DECLARACIONES sigpuntoycoma CONDICIONALIF sigpuntoycoma INCREYDECRE parentesiscierra llaveabre CONTENIDOSCICLOS llavecierra    {console.log($1);$$=$1;} 
;

SENTDOWHILE: resdo llaveabre CONTENIDOSCICLOS llavecierra reswhile parentesisabre CONDICIONALIF parentesiscierra sigpuntoycoma    {console.log($1);$$=$1;} 
;

CONTENIDOSCICLOS: resbreak sigpuntoycoma    {console.log($1);$$=$1;} 
        | rescontinue sigpuntoycoma    {console.log($1);$$=$1;} 
        | RETORNOS    {console.log($1);$$=$1;} 
        | CODIGO    {console.log($1);$$=$1;} 
;

RETORNOS: resreturn sigpuntoycoma    {console.log($1);$$=$1;} 
        | resreturn ASIGNACIONES sigpuntoycoma    {console.log($1);$$=$1;} 
;

FUNCIONES: TIPODATO id SNPARAMETROS llaveabre CONTENIDOSCICLOS llavecierra    {console.log($1);$$=$1;} 
;


SNPARAMETROS: parentesisabre PARAMETROS parentesiscierra    {console.log($1);$$=$1;} 
        | parentesisabre  parentesiscierra    {console.log($1);$$=$1;} 
;

PARAMETROS: TIPODATO id    {console.log($1);$$=$1;} 
        | TIPODATO id signocoma PARAMETROS    {console.log($1);$$=$1;} 
;


METODOS: resvoid id SNPARAMETROS llaveabre CONTENIDOSMETOD llavecierra    {console.log($1);$$=$1;} 
;

CONTENIDOSMETOD: resbreak sigpuntoycoma    {console.log($1);$$=$1;} 
        | rescontinue sigpuntoycoma    {console.log($1);$$=$1;} 
        | CODIGO    {console.log($1);$$=$1;} 
;

LLAMADAS: id SNPARAMETROS    {console.log($1);$$=$1;} 
;

FCOUT: rescout menormenor ASIGNACIONES sigpuntoycoma    {console.log($1);$$=$1;} 
        | rescout menormenor ASIGNACIONES menormenor resendl sigpuntoycoma    {console.log($1);$$=$1;} 
;

FTOLOWER: restolower parentesisabre ASIGNACIONES parentesiscierra    {console.log($1);$$=$1;} 
;

FTOUPPER: restoupper parentesisabre ASIGNACIONES parentesiscierra    {console.log($1);$$=$1;} 
;

FROUND: resround parentesisabre ASIGNACIONES parentesiscierra    {console.log($1);$$=$1;} 
;

FLENGTH: EXPRESIONES sigpunto reslength parentesisabre parentesiscierra    {console.log($1);$$=$1;} 
;

FTYPEOF: restypeof parentesisabre ASIGNACIONES parentesiscierra    {console.log($1);$$=$1;} 
;

FTOSTRING: restostring parentesisabre ASIGNACIONES parentesiscierra    {console.log($1);$$=$1;} 
;

FCSTR: EXPRESIONES sigpunto rescstr parentesisabre parentesiscierra    {console.log($1);$$=$1;} 
;

FEXECUTE: resexecute id SNPARAMETROS sigpuntoycoma    {console.log($1);$$=$1;} 
;