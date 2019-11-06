const antlr4 = require('antlr4');
const csvLexer = require('./parser/csvLexer').csvLexer;
const csvParser = require('./parser/csvParser').csvParser;

export function parse(text){
    let chars = new antlr4.InputStream(text);
    let lexer = new csvLexer(chars);
    let tokens = new antlr4.CommonTokenStream(lexer);
    let parser = new csvParser(tokens);
    parser.buildParseTrees = true;
    let tree = parser.test();

    let test = {questions: []};
    let question_nodes = tree.pytanie();

    for(let i in question_nodes){
        let question_node = question_nodes[i];
        let question = {};
        //id
        question.id = question_node.numer().getText();
        //type
        if(question_node.typ().getText() == 'O')
            question.type = 'open';
        else if(question_node.typ().getText() == 'L')
            question.type = 'numeric';
        else if(question_node.typ().getText() == 'W')
            question.type = 'choice';
        //question
        question.question = question_node.tresc_pytania().getText();
        //answers
        question.answers = [];
        for(let j in question_node.tresc_odpowiedzi()){
            question.answers.push(question_node.tresc_odpowiedzi()[j].getText());
        }
        test.questions.push(question);
    }
    return test;
};
