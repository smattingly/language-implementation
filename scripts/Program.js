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

    getParseTreeAsHtml() {
        let result = `
        <ul>
            <li>&lt;program&gt;
                <ul>
                    <li>start</li>`;

        for (let i = 0; i < this.statements.length; i++) {
            result += this.statements[i].getParseTreeAsHtml();
        }

        result += `
                    <li>end</li>
                </ul>
            </li>
        </ul>`;

        return result;
    }

    interpret() {
        let symbolTable = new Map();
        this.output = '';

        for (let i = 0; i < this.statements.length; i++) {
            let statementOutput = this.statements[i].interpret(symbolTable);
            if (statementOutput) {
                this.output = this.output + statementOutput;
            }
        }
    }

    compile() {
        let symbolTable = new Map();
        this.translation = `# standard setup for any program
    .intel_syntax noprefix
    .section	.rodata
.LC0:
    .string	"%d\\n"
    .text
    .globl	main
    .type	main, @function
main:
.LFB0:
    .cfi_startproc
    push	rbp
    .cfi_def_cfa_offset 16
    .cfi_offset 6, -16
    mov	rbp, rsp
    .cfi_def_cfa_register 6
    sub rsp, 16`;
        

        // compile all statements
        for (let i = 0; i < this.statements.length; i++) {
            let statementTranslation = this.statements[i].compile(symbolTable);
            if (statementTranslation) {
                this.translation = this.translation + statementTranslation;
            }
        }

        this.translation = this.translation + `
# standard teardown for any program     
    leave
    .cfi_def_cfa 7, 8
    ret
    .cfi_endproc
.LFE0:
    .size	main, .-main\n`;
    }
}
