class AssignmentStatement extends Statement { // eslint-disable-line no-unused-vars
    constructor() {
        super();
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

    getParseTreeAsHtml() {
        let html = `
        <li>&lt;assignment_statement&gt;
            <ul>
                <li>${this.identifier}</li>
                <li>=</li>
                <li>
                    ${this.expression.getParseTreeAsHtml()}
                </li>
            </ul>
        </li>`;

        return html;
    }

    interpret(symbolTable) {
        let value = this.expression.interpret(symbolTable);
        symbolTable.set(this.identifier, value);
    }

    compile(symbolTable) {
        // update the symbol table to store identifier's address
        let address = symbolTable.get(this.identifier);
        if (!address) {
            address = String(4 * (symbolTable.size + 1));
        }
        symbolTable.set(this.identifier, address);

        return `
# ${this.identifier} = ${this.expression.source}
    mov eax, ${this.expression.compile(symbolTable)}
    mov DWORD PTR [rbp-${address}], eax`;
        }
    }
