// Generated from csv.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete listener for a parse tree produced by csvParser.
function csvListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

csvListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
csvListener.prototype.constructor = csvListener;

// Enter a parse tree produced by csvParser#test.
csvListener.prototype.enterTest = function(ctx) {
};

// Exit a parse tree produced by csvParser#test.
csvListener.prototype.exitTest = function(ctx) {
};


// Enter a parse tree produced by csvParser#pytanie.
csvListener.prototype.enterPytanie = function(ctx) {
};

// Exit a parse tree produced by csvParser#pytanie.
csvListener.prototype.exitPytanie = function(ctx) {
};


// Enter a parse tree produced by csvParser#numer.
csvListener.prototype.enterNumer = function(ctx) {
};

// Exit a parse tree produced by csvParser#numer.
csvListener.prototype.exitNumer = function(ctx) {
};


// Enter a parse tree produced by csvParser#typ.
csvListener.prototype.enterTyp = function(ctx) {
};

// Exit a parse tree produced by csvParser#typ.
csvListener.prototype.exitTyp = function(ctx) {
};


// Enter a parse tree produced by csvParser#jezyk.
csvListener.prototype.enterJezyk = function(ctx) {
};

// Exit a parse tree produced by csvParser#jezyk.
csvListener.prototype.exitJezyk = function(ctx) {
};


// Enter a parse tree produced by csvParser#tresc_pytania.
csvListener.prototype.enterTresc_pytania = function(ctx) {
};

// Exit a parse tree produced by csvParser#tresc_pytania.
csvListener.prototype.exitTresc_pytania = function(ctx) {
};


// Enter a parse tree produced by csvParser#liczba_odpowiedzi.
csvListener.prototype.enterLiczba_odpowiedzi = function(ctx) {
};

// Exit a parse tree produced by csvParser#liczba_odpowiedzi.
csvListener.prototype.exitLiczba_odpowiedzi = function(ctx) {
};


// Enter a parse tree produced by csvParser#tresc_odpowiedzi.
csvListener.prototype.enterTresc_odpowiedzi = function(ctx) {
};

// Exit a parse tree produced by csvParser#tresc_odpowiedzi.
csvListener.prototype.exitTresc_odpowiedzi = function(ctx) {
};



exports.csvListener = csvListener;