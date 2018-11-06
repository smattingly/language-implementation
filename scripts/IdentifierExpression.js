import {Expression, Lexeme} from "./modules.js";

/**
 * Implements use of the <code>&lt;identifier&gt;</code> nonterminal as an expression in our grammar.
 */
class IdentifierExpression extends Expression {
    /**
     * Creates a new IdentifierExpression.
     */
    constructor() {
        super();
        
        /**
         * @property {string} source - The source code for this expression.
         * @public
         */
        this.source = undefined;
    }

    /**
     * Compares the remaining sequence of lexemes with the grammar rule for this nonterminal.
     * @argument lexer {Lexer} - An object containing a sequence of lexemes.
     * @modifies This nonterminal's parse tree.
     * @throws An error if the lexemes do not satisfy the grammar rule.
     * @public
     */
    parse(lexer) {
        let lexeme = lexer.getLexeme();

        if (!lexeme || !lexeme.checkToken(Lexeme.tokens.identifier)) {
            throw new Error('Expected an identifier expression instead of "' + lexeme.source + '".');
        }

        this.source = lexeme.source;
    }

    /**
     * Builds an HTML representation of this program's parse tree.
     * @returns {string} An HTML unordered list representing the parse tree. 
     * @public
     */
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

    /**
     * Simulates the effect of this node of the parse tree by executing equivalent JavaScript code.
     * @argument {Map} symbolTable - A lookup table of identifiers and their current values.
     * @returns The value of this expression.
     * @public
     */
    interpret(symbolTable) {
        let value = symbolTable.get(this.source);

        return value || 0; // use zero as default value
    }

    /**
     * Translates this nonterminal's parse tree into assembly language.
     * @argument {Map} symbolTable - A lookup table of identifiers and their associated memory addresses.
     * @returns {string} Assembly code for this nonterminal's parse tree.
     * @public
     */
    compile(symbolTable) {
        let value = symbolTable.get(this.source);
        if (!value) {
            return '0';
        }

        return `DWORD PTR [rbp-${value}]`;
    }
}

export {IdentifierExpression};