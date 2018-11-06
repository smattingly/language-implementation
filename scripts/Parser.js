import { Program } from "./modules.js";

/**
 * Builds a parse tree from a sequence of lexemes.
 */
class Parser {
    /**
     * Creates a new parser.
     */
    constructor() {
        /** 
         * @property {Program} program - The root of the parse tree.
         * @public
         */
        this.program = new Program();
    }

    /**
     * Builds the parse tree from a sequence of lexemes.
     * @argument {Lexer} lexer - A lexer that provides access to a sequence of lexemes.
     * @modifies The parse tree rooted at this parser's program.
     * @public
     */
    parse(lexer) {
        this.program.parse(lexer);
    }

    /**
     * Returns an HTML representation of the parse tree.
     * @returns {string} An HTML unordered list.
     * @public
     */
    getParseTreeAsHtml() {
        return this.program.getParseTreeAsHtml();
    }
}

export { Parser };