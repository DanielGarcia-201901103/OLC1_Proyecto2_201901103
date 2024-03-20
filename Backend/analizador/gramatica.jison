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

\s+                 //espacios en blanco
"//".*		//comentario simple	

"+"                 return 'mas';
"-"                 return 'menos';
"/"                 return 'divid';
"*"                 return 'por';
"^"                 return 'pot';
"%"                 return 'mod';
"("                 return 'pariz';
")"                 return 'parder';
"{"                 return 'llaveiz';
"}"                 return 'llaveder';
','                 return 'coma';
";"                 return 'puntycom';
":"                 return 'dospunt';
"print"             return 'print';
"println"           return 'println';
"if"                return 'resif';
"else"              return 'reselse';
"int"               return 'resint';
"double"            return 'resdouble';
"string"            return 'resstring';
"boolean"           return 'resbool';
"char"              return 'reschar';
"=="                return 'igualigual';
"!="                return 'noigual';
"="                 return 'igual';
">="                return 'mayorigual';                     
">"                 return 'mayor';
"<="                return 'menorigual';
"<"                 return 'menor';
"||"                 return 'or';
"&&"                return 'and';
"!"                 return 'not';

("true"|"false")\b      return 'bool';
[0-9]+[.][0-9]+\b    return 'decimal';
[0-9]+\b                return 'numero';
([a-zA-Z])[a-zA-Z0-9_]*	return 'id';
\'[^\']\'               return 'caracter';
\"[^\"]*\"				{ yytext = yytext.substr(1,yyleng-2); return 'cadena'; }

<<EOF>>             return 'EOF';
.                   {console.log(yylloc.first_line, yylloc.first_columm, 'Lexico', yytext)}
/lex

%left 'or'
%left 'and'
%left 'not'
%left 'noigual' 'igualigual'
%left 'menorigual' 'mayorigual' 'mayor' 'menor'
%left 'mas', 'menos'
%left 'divid', 'por','mod' 
%left 'pot'
%left Umenos 

%start INI

%%

INI: INSTRUCCIONES EOF {return $1;}
;

INSTRUCCIONES: INSTRUCCIONES INSTRUCCION     { $$ = $2;}
            |INSTRUCCION                     { $$ = $1;}
;

INSTRUCCION: decimal            {console.log($1);$$=$1;}
        | numero       {console.log($1);$$=$1;}
        | caracter                 {console.log($1);$$=$1;}   
        | cadena                 {console.log($1);$$=$1;}   
;


