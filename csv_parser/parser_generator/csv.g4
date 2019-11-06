grammar csv;

test:
    (pytanie)* EOF;

pytanie:
    numer ';' typ ';' jezyk ';' tresc_pytania ';' liczba_odpowiedzi ';' (tresc_odpowiedzi ';')*;

numer: Liczba;
typ: 'O' | 'L' | 'W';
jezyk: 'PL' | 'EN';
tresc_pytania: Tekst;
liczba_odpowiedzi: Liczba | '|';
tresc_odpowiedzi: Tekst;

Liczba: [0-9]+;
Tekst: ~[;\n\r]+;
CRLF: [\n\r]+ -> skip;
