import {Expression, Lexeme} from "./modules.js";

/**
 * Implements use of the <code>&lt;number&gt;</code> nonterminal as an expression in our grammar.
 */
class NumberExpression extends Expression {
    /**
     * Creates a new NumberExpression.
     */
    constructor() {
        super();
        
        /**
         * @property {string} source - The source code for this expression.
         * @public
         */
        this.source;
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

        if (!lexeme || !lexeme.checkToken(Lexeme.tokens.number)) {
            throw new Error('Expected a number expression instead of "' + lexeme.source + '".');
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
                <li>&lt;number&gt;
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
    interpret() {
        return Number(this.source);
    }

    /**
     * Translates this nonterminal's parse tree into assembly language.
     * @argument {Map} symbolTable - A lookup table of identifiers and their associated memory addresses.
     * @returns {string} Assembly code for this nonterminal's parse tree.
     * @public
     */
    compile() {
        return this.source;
    }
}

export {NumberExpression};