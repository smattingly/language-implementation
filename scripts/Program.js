import {Lexeme, Statement} from "./modules.js";

/**
 * Implements <code>&lt;program&gt;</code>, the root nonterminal symbol from our grammar.
*/
class Program {
    /** 
     * Creates a new Program object.
     */
    constructor() {
        /** 
         * @property {Statement[]} _statements - An array of statements. 
         * @private
         */
        this._statements = [];
        
        /**
         * @property {string} output - This program's output, produced by interpretation.
         * @public
         */
        this.output = "";
        
        /**
         * @property {string} translation - This program's translation to assembly code, produced by compilation.
         * @public
         */
        this.translation = "";
    }

    /**
     * Compares the remaining sequence of lexemes with the grammar rule for this nonterminal.
     * @argument lexer {Lexer} - An object containing a sequence of lexemes.
     * @modifies This nonterminal's parse tree.
     * @throws An error if the lexemes do not satisfy the grammar rule.
     * @public
     */
    parse(lexer) {
        // <program> ::= start <statement>* end
        
        // Check for the expected terminal symbol.
        let lexeme = lexer.getLexeme();
        if (!lexeme.checkToken(Lexeme.tokens.start)) {
            throw new Error('Expected "start" instead of "' + lexeme.source + '".');
        }

        // Parse zero or more statements.
        do {
            // Get the next lexeme from the lexer.
            lexeme = lexer.getLexeme(false);

            // Stop if there are no more lexemes, or the lexeme is `end`.
            if (!lexeme || lexeme.checkToken(Lexeme.tokens.end)) break;

            // Delegate the parsing of a statement.
            let statement = Statement.parse(lexer);
            
            // Add the parsed statement to this program's statements.
            this._statements.push(statement);
        } while (true);

        // Check for the expected terminal symbol.
        lexeme = lexer.getLexeme();
        if (!lexeme.checkToken(Lexeme.tokens.end)) {
            throw new Error('Expected "end" instead of "' + lexeme.source + '".');
        }

        // Check that no more lexemes appear after `end`.
        if (lexer.getLexeme()) {
            throw new Error('Unexpected symbols after "end": "' + lexeme.source + '".');
        }
    }

    /**
     * Builds an HTML representation of this program's parse tree.
     * @returns {string} An HTML unordered list representing the parse tree. 
     * @public
     */
    getParseTreeAsHtml() {
        let result = `
        <ul>
            <li>&lt;program&gt;
                <ul>
                    <li>start</li>`;

        for (let i = 0; i < this._statements.length; i++) {
            result += this._statements[i].getParseTreeAsHtml();
        }

        result += `
                    <li>end</li>
                </ul>
            </li>
        </ul>`;

        return result;
    }

    /**
     * Simulates the effect of this node of the parse tree by executing equivalent JavaScript code.
     * @modifies This program's output.
     * @public
     */
    interpret() {
        let symbolTable = new Map();

        for (let i = 0; i < this._statements.length; i++) {
            let statementOutput = this._statements[i].interpret(symbolTable);
            if (statementOutput) {
                this.output = this.output + statementOutput;
            }
        }
    }

    /**
     * Translates this nonterminal's parse tree into assembly language.
     * @modifies This program's translation.
     * @public
     */
    compile() {
        let symbolTable = new Map();
        this.translation = `# Save this code in somefile.s, then \`gcc somefile.s -o myExecutable\`
# standard setup for any program
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
        for (let i = 0; i < this._statements.length; i++) {
            let statementTranslation = this._statements[i].compile(symbolTable);
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

/* global Map */

export { Program };