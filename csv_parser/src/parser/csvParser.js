// Generated from csv.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');
var csvListener = require('./csvListener').csvListener;
var grammarFileName = "csv.g4";

var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003\f9\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t\u0004",
    "\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007\u0004\b",
    "\t\b\u0004\t\t\t\u0003\u0002\u0007\u0002\u0014\n\u0002\f\u0002\u000e",
    "\u0002\u0017\u000b\u0002\u0003\u0002\u0003\u0002\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0007\u0003",
    "(\n\u0003\f\u0003\u000e\u0003+\u000b\u0003\u0003\u0004\u0003\u0004\u0003",
    "\u0005\u0003\u0005\u0003\u0006\u0003\u0006\u0003\u0007\u0003\u0007\u0003",
    "\b\u0003\b\u0003\t\u0003\t\u0003\t\u0002\u0002\n\u0002\u0004\u0006\b",
    "\n\f\u000e\u0010\u0002\u0005\u0003\u0002\u0004\u0006\u0003\u0002\u0007",
    "\b\u0003\u0002\t\n\u00022\u0002\u0015\u0003\u0002\u0002\u0002\u0004",
    "\u001a\u0003\u0002\u0002\u0002\u0006,\u0003\u0002\u0002\u0002\b.\u0003",
    "\u0002\u0002\u0002\n0\u0003\u0002\u0002\u0002\f2\u0003\u0002\u0002\u0002",
    "\u000e4\u0003\u0002\u0002\u0002\u00106\u0003\u0002\u0002\u0002\u0012",
    "\u0014\u0005\u0004\u0003\u0002\u0013\u0012\u0003\u0002\u0002\u0002\u0014",
    "\u0017\u0003\u0002\u0002\u0002\u0015\u0013\u0003\u0002\u0002\u0002\u0015",
    "\u0016\u0003\u0002\u0002\u0002\u0016\u0018\u0003\u0002\u0002\u0002\u0017",
    "\u0015\u0003\u0002\u0002\u0002\u0018\u0019\u0007\u0002\u0002\u0003\u0019",
    "\u0003\u0003\u0002\u0002\u0002\u001a\u001b\u0005\u0006\u0004\u0002\u001b",
    "\u001c\u0007\u0003\u0002\u0002\u001c\u001d\u0005\b\u0005\u0002\u001d",
    "\u001e\u0007\u0003\u0002\u0002\u001e\u001f\u0005\n\u0006\u0002\u001f",
    " \u0007\u0003\u0002\u0002 !\u0005\f\u0007\u0002!\"\u0007\u0003\u0002",
    "\u0002\"#\u0005\u000e\b\u0002#)\u0007\u0003\u0002\u0002$%\u0005\u0010",
    "\t\u0002%&\u0007\u0003\u0002\u0002&(\u0003\u0002\u0002\u0002\'$\u0003",
    "\u0002\u0002\u0002(+\u0003\u0002\u0002\u0002)\'\u0003\u0002\u0002\u0002",
    ")*\u0003\u0002\u0002\u0002*\u0005\u0003\u0002\u0002\u0002+)\u0003\u0002",
    "\u0002\u0002,-\u0007\n\u0002\u0002-\u0007\u0003\u0002\u0002\u0002./",
    "\t\u0002\u0002\u0002/\t\u0003\u0002\u0002\u000201\t\u0003\u0002\u0002",
    "1\u000b\u0003\u0002\u0002\u000223\u0007\u000b\u0002\u00023\r\u0003\u0002",
    "\u0002\u000245\t\u0004\u0002\u00025\u000f\u0003\u0002\u0002\u000267",
    "\u0007\u000b\u0002\u00027\u0011\u0003\u0002\u0002\u0002\u0004\u0015",
    ")"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, "';'", "'O'", "'L'", "'W'", "'PL'", "'EN'", "'|'" ];

var symbolicNames = [ null, null, null, null, null, null, null, null, "Liczba", 
                      "Tekst", "CRLF" ];

var ruleNames =  [ "test", "pytanie", "numer", "typ", "jezyk", "tresc_pytania", 
                   "liczba_odpowiedzi", "tresc_odpowiedzi" ];

function csvParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

csvParser.prototype = Object.create(antlr4.Parser.prototype);
csvParser.prototype.constructor = csvParser;

Object.defineProperty(csvParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

csvParser.EOF = antlr4.Token.EOF;
csvParser.T__0 = 1;
csvParser.T__1 = 2;
csvParser.T__2 = 3;
csvParser.T__3 = 4;
csvParser.T__4 = 5;
csvParser.T__5 = 6;
csvParser.T__6 = 7;
csvParser.Liczba = 8;
csvParser.Tekst = 9;
csvParser.CRLF = 10;

csvParser.RULE_test = 0;
csvParser.RULE_pytanie = 1;
csvParser.RULE_numer = 2;
csvParser.RULE_typ = 3;
csvParser.RULE_jezyk = 4;
csvParser.RULE_tresc_pytania = 5;
csvParser.RULE_liczba_odpowiedzi = 6;
csvParser.RULE_tresc_odpowiedzi = 7;

function TestContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = csvParser.RULE_test;
    return this;
}

TestContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
TestContext.prototype.constructor = TestContext;

TestContext.prototype.EOF = function() {
    return this.getToken(csvParser.EOF, 0);
};

TestContext.prototype.pytanie = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(PytanieContext);
    } else {
        return this.getTypedRuleContext(PytanieContext,i);
    }
};

TestContext.prototype.enterRule = function(listener) {
    if(listener instanceof csvListener ) {
        listener.enterTest(this);
	}
};

TestContext.prototype.exitRule = function(listener) {
    if(listener instanceof csvListener ) {
        listener.exitTest(this);
	}
};




csvParser.TestContext = TestContext;

csvParser.prototype.test = function() {

    var localctx = new TestContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, csvParser.RULE_test);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 19;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===csvParser.Liczba) {
            this.state = 16;
            this.pytanie();
            this.state = 21;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 22;
        this.match(csvParser.EOF);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function PytanieContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = csvParser.RULE_pytanie;
    return this;
}

PytanieContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
PytanieContext.prototype.constructor = PytanieContext;

PytanieContext.prototype.numer = function() {
    return this.getTypedRuleContext(NumerContext,0);
};

PytanieContext.prototype.typ = function() {
    return this.getTypedRuleContext(TypContext,0);
};

PytanieContext.prototype.jezyk = function() {
    return this.getTypedRuleContext(JezykContext,0);
};

PytanieContext.prototype.tresc_pytania = function() {
    return this.getTypedRuleContext(Tresc_pytaniaContext,0);
};

PytanieContext.prototype.liczba_odpowiedzi = function() {
    return this.getTypedRuleContext(Liczba_odpowiedziContext,0);
};

PytanieContext.prototype.tresc_odpowiedzi = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(Tresc_odpowiedziContext);
    } else {
        return this.getTypedRuleContext(Tresc_odpowiedziContext,i);
    }
};

PytanieContext.prototype.enterRule = function(listener) {
    if(listener instanceof csvListener ) {
        listener.enterPytanie(this);
	}
};

PytanieContext.prototype.exitRule = function(listener) {
    if(listener instanceof csvListener ) {
        listener.exitPytanie(this);
	}
};




csvParser.PytanieContext = PytanieContext;

csvParser.prototype.pytanie = function() {

    var localctx = new PytanieContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, csvParser.RULE_pytanie);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 24;
        this.numer();
        this.state = 25;
        this.match(csvParser.T__0);
        this.state = 26;
        this.typ();
        this.state = 27;
        this.match(csvParser.T__0);
        this.state = 28;
        this.jezyk();
        this.state = 29;
        this.match(csvParser.T__0);
        this.state = 30;
        this.tresc_pytania();
        this.state = 31;
        this.match(csvParser.T__0);
        this.state = 32;
        this.liczba_odpowiedzi();
        this.state = 33;
        this.match(csvParser.T__0);
        this.state = 39;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===csvParser.Tekst) {
            this.state = 34;
            this.tresc_odpowiedzi();
            this.state = 35;
            this.match(csvParser.T__0);
            this.state = 41;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function NumerContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = csvParser.RULE_numer;
    return this;
}

NumerContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
NumerContext.prototype.constructor = NumerContext;

NumerContext.prototype.Liczba = function() {
    return this.getToken(csvParser.Liczba, 0);
};

NumerContext.prototype.enterRule = function(listener) {
    if(listener instanceof csvListener ) {
        listener.enterNumer(this);
	}
};

NumerContext.prototype.exitRule = function(listener) {
    if(listener instanceof csvListener ) {
        listener.exitNumer(this);
	}
};




csvParser.NumerContext = NumerContext;

csvParser.prototype.numer = function() {

    var localctx = new NumerContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, csvParser.RULE_numer);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 42;
        this.match(csvParser.Liczba);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function TypContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = csvParser.RULE_typ;
    return this;
}

TypContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
TypContext.prototype.constructor = TypContext;


TypContext.prototype.enterRule = function(listener) {
    if(listener instanceof csvListener ) {
        listener.enterTyp(this);
	}
};

TypContext.prototype.exitRule = function(listener) {
    if(listener instanceof csvListener ) {
        listener.exitTyp(this);
	}
};




csvParser.TypContext = TypContext;

csvParser.prototype.typ = function() {

    var localctx = new TypContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, csvParser.RULE_typ);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 44;
        _la = this._input.LA(1);
        if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << csvParser.T__1) | (1 << csvParser.T__2) | (1 << csvParser.T__3))) !== 0))) {
        this._errHandler.recoverInline(this);
        }
        else {
        	this._errHandler.reportMatch(this);
            this.consume();
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function JezykContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = csvParser.RULE_jezyk;
    return this;
}

JezykContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
JezykContext.prototype.constructor = JezykContext;


JezykContext.prototype.enterRule = function(listener) {
    if(listener instanceof csvListener ) {
        listener.enterJezyk(this);
	}
};

JezykContext.prototype.exitRule = function(listener) {
    if(listener instanceof csvListener ) {
        listener.exitJezyk(this);
	}
};




csvParser.JezykContext = JezykContext;

csvParser.prototype.jezyk = function() {

    var localctx = new JezykContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, csvParser.RULE_jezyk);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 46;
        _la = this._input.LA(1);
        if(!(_la===csvParser.T__4 || _la===csvParser.T__5)) {
        this._errHandler.recoverInline(this);
        }
        else {
        	this._errHandler.reportMatch(this);
            this.consume();
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function Tresc_pytaniaContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = csvParser.RULE_tresc_pytania;
    return this;
}

Tresc_pytaniaContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
Tresc_pytaniaContext.prototype.constructor = Tresc_pytaniaContext;

Tresc_pytaniaContext.prototype.Tekst = function() {
    return this.getToken(csvParser.Tekst, 0);
};

Tresc_pytaniaContext.prototype.enterRule = function(listener) {
    if(listener instanceof csvListener ) {
        listener.enterTresc_pytania(this);
	}
};

Tresc_pytaniaContext.prototype.exitRule = function(listener) {
    if(listener instanceof csvListener ) {
        listener.exitTresc_pytania(this);
	}
};




csvParser.Tresc_pytaniaContext = Tresc_pytaniaContext;

csvParser.prototype.tresc_pytania = function() {

    var localctx = new Tresc_pytaniaContext(this, this._ctx, this.state);
    this.enterRule(localctx, 10, csvParser.RULE_tresc_pytania);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 48;
        this.match(csvParser.Tekst);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function Liczba_odpowiedziContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = csvParser.RULE_liczba_odpowiedzi;
    return this;
}

Liczba_odpowiedziContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
Liczba_odpowiedziContext.prototype.constructor = Liczba_odpowiedziContext;

Liczba_odpowiedziContext.prototype.Liczba = function() {
    return this.getToken(csvParser.Liczba, 0);
};

Liczba_odpowiedziContext.prototype.enterRule = function(listener) {
    if(listener instanceof csvListener ) {
        listener.enterLiczba_odpowiedzi(this);
	}
};

Liczba_odpowiedziContext.prototype.exitRule = function(listener) {
    if(listener instanceof csvListener ) {
        listener.exitLiczba_odpowiedzi(this);
	}
};




csvParser.Liczba_odpowiedziContext = Liczba_odpowiedziContext;

csvParser.prototype.liczba_odpowiedzi = function() {

    var localctx = new Liczba_odpowiedziContext(this, this._ctx, this.state);
    this.enterRule(localctx, 12, csvParser.RULE_liczba_odpowiedzi);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 50;
        _la = this._input.LA(1);
        if(!(_la===csvParser.T__6 || _la===csvParser.Liczba)) {
        this._errHandler.recoverInline(this);
        }
        else {
        	this._errHandler.reportMatch(this);
            this.consume();
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function Tresc_odpowiedziContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = csvParser.RULE_tresc_odpowiedzi;
    return this;
}

Tresc_odpowiedziContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
Tresc_odpowiedziContext.prototype.constructor = Tresc_odpowiedziContext;

Tresc_odpowiedziContext.prototype.Tekst = function() {
    return this.getToken(csvParser.Tekst, 0);
};

Tresc_odpowiedziContext.prototype.enterRule = function(listener) {
    if(listener instanceof csvListener ) {
        listener.enterTresc_odpowiedzi(this);
	}
};

Tresc_odpowiedziContext.prototype.exitRule = function(listener) {
    if(listener instanceof csvListener ) {
        listener.exitTresc_odpowiedzi(this);
	}
};




csvParser.Tresc_odpowiedziContext = Tresc_odpowiedziContext;

csvParser.prototype.tresc_odpowiedzi = function() {

    var localctx = new Tresc_odpowiedziContext(this, this._ctx, this.state);
    this.enterRule(localctx, 14, csvParser.RULE_tresc_odpowiedzi);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 52;
        this.match(csvParser.Tekst);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


exports.csvParser = csvParser;
