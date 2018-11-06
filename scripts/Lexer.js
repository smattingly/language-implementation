import { Lexeme } from "./modules.js";

/** 
 * Manages a sequence of lexemes after extracting them from source code.
 */
class Lexer {
    /**
     * Creates a new Lexer.
     * @public
     */
    constructor() {
        /**
         * @property {[Lexeme]} _lexemes - The sequence of lexemes extracted from source code.
         * @private
         */
        this._lexemes = [];

        /**
         * @property {number} _lexemeIndex - Indicates the current position in the sequence of lexemes.
         * @private
         */
        this._lexemeIndex = 0;

        /**
         * @property {boolean} _inComment - Indicates if the current location in the source code is inside a comment block.
         * @private
         */
        this._inComment = false;
    }

    /**
     * Performs lexical analysis, transforming source code to a sequence of lexemes.
     * @argument {string} code - The source code to analyze.
     * @modifies This lexer's sequence of lexemes.
     * @public
     */
    analyze(code) {
        // While there is still code to process ...
        while (code.length > 0) {
            // ... extract the next lexeme ...
            let lexeme = this.extractNextLexeme(code);

            // ... remove the lexeme's source from the front of the code ...
            code = code.substr(lexeme.source.length);

            // ... and keep track of lexemes, ignoring white space and text within comments.
            if (lexeme.checkToken(Lexeme.tokens.open_comment)) {
                this._inComment = true;
            }
            else if (lexeme.checkToken(Lexeme.tokens.close_comment)) {
                this._inComment = false;
            }
            else if (!lexeme.checkToken(Lexeme.tokens.white_space) && !this._inComment) {
                this._lexemes.push(lexeme);
            }
            // else {
            //     console.log('Ignoring ' + JSON.stringify(lexeme));
            // }
        }
    }

    /**
     * Converts the first portion of source code to a lexeme.
     * @argument {string} code - The source code to analyze.
     * @returns {Lexeme} A new lexeme representing the first part of the source code.
     * @private
     */
    extractNextLexeme(code) {
        // Test for a match with each regex, in the order they are listed.
        let lexeme = null;
        for (let tryToken in Lexeme.tokens) {
            let result = code.match(Lexeme.tokens[tryToken]);
            if (result) {
                lexeme = new Lexeme(result[0], tryToken);
                break; // The first matching regex takes precedence.
            }
        }
        return lexeme;
    }

    /**
     * Provides sequential access to the sequence of lexemes. Repeatedly calling this method, always passing true (the default), will return each lexeme in sequence, return null after the last lexeme, then start the sequence over again. Passing false ensures that the *next* call will return the same lexeme returned by the current call.
     * @argument {boolean} [advance=true] - Indicates whether or not to move the current position in the sequence forward.
     * @modifies This lexer's current position in the sequence of lexemes, if <code>advance</code> is true.
     * @returns {Lexeme} The lexeme at the current position in the sequence, or null if the sequence has ended.
     * @public
     */
    getLexeme(advance) {
        if (this._lexemeIndex >= this._lexemes.length) {
            this._lexemeIndex = 0;
            return null;
        }

        let result = this._lexemes[this._lexemeIndex];
        if (advance !== false) this._lexemeIndex++;
        return result;
    }
}

export { Lexer };
