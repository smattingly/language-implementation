class Statement { // eslint-disable-line no-unused-vars
    static parse(lexer) {
        // <statement> ::= <assignment_statement> | <output_statement>

        let statement;
        let lexeme = lexer.getLexeme(false);
        
        if (lexeme.checkToken(Lexeme.tokens.identifier)) {
            statement = new AssignmentStatement();
        }
        else if (lexeme.checkToken(Lexeme.tokens.print)) {
            statement = new OutputStatement();
        }
        else {
            throw new Error('Expected a statement instead of "' + lexeme.source + '".');
        }

        statement.parse(lexer);
        
        return statement;
    }
}
