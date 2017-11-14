class Expression { // eslint-disable-line no-unused-vars
    static parse(lexer) {
        // <expression> ::= <identifier> | <number>

        let lexeme = lexer.getLexeme(false);
        let expression;

        if (lexeme.checkToken(Lexeme.tokens.identifier)) {
            expression = new IdentifierExpression();
        }
        else if (lexeme.checkToken(Lexeme.tokens.number)) {
            expression = new NumberExpression();
        }
        else {
            throw new Error('Expected an expression instead of "' + lexeme.source + '".');
        }

        expression.parse(lexer);
        
        return expression;
    }
}

class IdentifierExpression {
    constructor() {
        this.source;
    }

    parse(lexer) {
        let lexeme = lexer.getLexeme();

        if (!lexeme || !lexeme.checkToken(Lexeme.tokens.identifier)) {
            throw new Error('Expected an identifier expression instead of "' + lexeme.source + '".');
        }

        this.source = lexeme.source;
    }

    getParseTreeAsHtml() {
        return `&lt;expression&gt;
            <ul>
                <li>&lt;identifier&gt;
                    <ul>
                        <li>
                            ${this.source}
                        </li>
                    </ul>
                </li>
            </ul>`;
    }
    
    interpret(symbolTable) {
        let value = symbolTable.get(this.source);
        
        return value || 0; // use zero as default value
    }
    
    compile(symbolTable) {
        let value = symbolTable.get(this.source);
        if (!value) {
            return '0';
        }
        
        return `DWORD PTR [rbp-${value}]`; 
    }
}

class NumberExpression {
    constructor() {
        this.source;
    }

    parse(lexer) {
        let lexeme = lexer.getLexeme();

        if (!lexeme || !lexeme.checkToken(Lexeme.tokens.number)) {
            throw new Error('Expected a number expression instead of "' + lexeme.source + '".');
        }

        this.source = lexeme.source;
    }

    getParseTreeAsHtml() {
        return `&lt;expression&gt;
            <ul>
                <li>&lt;number&gt;
                    <ul>
                        <li>
                            ${this.source}
                        </li>
                    </ul>
                </li>
            </ul>`;
    }
    
    interpret() {
        return Number(this.source);
    }
    
    compile() {
        return Number(this.source);
    }
}
