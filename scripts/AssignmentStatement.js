class AssignmentStatement { // eslint-disable-line no-unused-vars
    constructor() {
        this.identifier;
        this.expression;
    }

    parse(lexer) {
        // <assignment_statement> ::= <identifier> = <expression>

        let lexeme = lexer.getLexeme();
        if (!lexeme || !lexeme.checkToken(Lexeme.tokens.identifier)) {
            throw new Error('Expected an identifier instead of "' + lexeme.source + '".');
        }
        this.identifier = lexeme.source;

        lexeme = lexer.getLexeme();
        if (!lexeme || !lexeme.checkToken(Lexeme.tokens.assignment_operator)) {
            throw new Error('Expected an assignment operator instead of "' + lexeme.source + '".');
        }

        this.expression = Expression.parse(lexer);
    }

    getHtmlResults() {
        let html = `
        <li>&lt;assignment_statement&gt;
            <ul>
                <li>${this.identifier}</li>
                <li>=</li>
                <li>
                    ${this.expression.getHtmlResults()}
                </li>
            </ul>
        </li>`;
        
        return html;
    }
}
