import { Lexeme, AssignmentStatement, OutputStatement } from "./modules.js";

/**
 * Implements the <code>&lt;statement&gt;</code> nonterminal symbol from our grammar.
 */
class Statement {
    /**
     * Compares the remaining sequence of lexemes with the grammar rule for this nonterminal.
     * @argument lexer {Lexer} - An object containing a sequence of lexemes.
     * @returns {Statement} The root of the parse (sub)tree for this nonterminal.
     * @throws An error if the lexemes do not satisfy the grammar rule.
     * @static
     * @public
     */
    static parse(lexer) {
        // <statement> ::= <assignment_statement> | <output_statement>

        // Determine which type of statement begins with the current lexeme, and delegate parsing to the appropriate subclass.
        let statement;
        let lexeme = lexer.getLexeme(false);

        if (lexeme.checkToken(Lexeme.tokens.identifier)) {
            statement = new AssignmentStatement();
        }
        else if (lexeme.checkToken(Lexeme.tokens.print)) {
            statement = new OutputStatement();
        }
        else {
            throw new Error('Expected a statement instead of "' + lexeme.source + '".');
        }

        statement.parse(lexer);

        return statement;
    }

    /**
     * Translates this nonterminal's parse tree into assembly language.
     * @returns This program's translation.
     * @public
     */
    // compile() {
    //     return undefined;
    // }
}

export { Statement };
