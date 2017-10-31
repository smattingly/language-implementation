class Program { // eslint-disable-line no-unused-vars
    constructor() {
        this.statements;
    }

    parse(lexer) {
        this.statements = [];

        // <program> ::= start <statement>* end
        let lexeme = lexer.getLexeme();

        if (!lexeme.checkToken(Lexeme.tokens.start)) {
            throw new Error('Expected "start" instead of "' + lexeme.source + '".');
        }

        while (true) {
            lexeme = lexer.getLexeme(false);

            if (!lexeme || lexeme.checkToken(Lexeme.tokens.end)) break;

            this.statements.push(Statement.parse(lexer));
        }

        lexeme = lexer.getLexeme();
        if (!lexeme.checkToken(Lexeme.tokens.end)) {
            throw new Error('Expected "end" instead of "' + lexeme.source + '".');
        }

        if (lexer.getLexeme()) {
            throw new Error('Unexpected symbols after "end": "' + lexeme.source + '".');
        }
    }

    getHtmlResults() {
        let result = `
        <ul>
            <li>&lt;program&gt;
                <ul>
                    <li>start</li>`;

        for (let i = 0; i < this.statements.length; i++) {
            result += this.statements[i].getHtmlResults();
        }

        result += `
                    <li>end</li>
                </ul>
            </li>
        </ul>`;

        return result;
    }
}
