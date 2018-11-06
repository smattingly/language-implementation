import { Lexeme, IdentifierExpression, NumberExpression } from "./modules.js";

/**
 * Implements the <code>&lt;expression&gt;</code> nonterminal symbol from our grammar.
 */
class Expression {
    /**
     * Compares the remaining sequence of lexemes with the grammar rule for this nonterminal.
     * @argument lexer {Lexer} - An object containing a sequence of lexemes.
     * @returns {Expression} The root of the parse (sub)tree for this nonterminal.
     * @throws An error if the lexemes do not satisfy the grammar rule.
     * @static
     * @public
     */
    static parse(lexer) {
        // <expression> ::= <identifier> | <number>

        // Determine which type of expression begins with the current lexeme, and delegate parsing to the appropriate subclass.
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

export {Expression};
