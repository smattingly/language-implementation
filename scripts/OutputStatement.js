class OutputStatement { // eslint-disable-line no-unused-vars
    constructor() {
        this.expression;
    }

    parse(lexer) {
        // <output_statement> ::= print <open_paren> <expression> <close_paren>

        let lexeme = lexer.getLexeme();
        if (!lexeme || !lexeme.checkToken(Lexeme.tokens.print)) {
            throw new Error('Expected "print" instead of "' + lexeme.source + '".');
        }

        lexeme = lexer.getLexeme();
        if (!lexeme || !lexeme.checkToken(Lexeme.tokens.open_paren)) {
            throw new Error('Expected "(" instead of "' + lexeme.source + '".');
        }

        this.expression = Expression.parse(lexer);

        lexeme = lexer.getLexeme();
        if (!lexeme || !lexeme.checkToken(Lexeme.tokens.close_paren)) {
            throw new Error('Expected ")" instead of "' + lexeme.source + '".');
        }
    }

    getHtmlResults() {
        return `
        <li>&lt;output_statement&gt;
            <ul>
                <li>print</li>
                <li>(</li>
                <li>
                    ${this.expression.getHtmlResults()}
                </li>
                <li>)</li>
            </ul>
        </li>`;
    }
}
