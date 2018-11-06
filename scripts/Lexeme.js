/**
 * Models a meaningful "chunk" of code such as a reserved word, operator, identifier, etc.
 */
class Lexeme { // eslint-disable-line no-unused-vars
    /**
     * @argument {string} source - The source code for a new lexeme. 
     * @argument {Token} token - This token for a new lexeme.
     */
    constructor(source, token) {
        /** 
         * @property {string} source - This lexeme's source code.
         * @public
         */
        this.source = source || '';
        
        /** 
         * @property {Token} token - This lexeme's token. 
         * @public
         */
        this.token = token;
    }

    /**
     * Compares this lexeme's token with an expected token.
     * @argument {Token} expectedToken - The token that is expected to appear.
     * @return {boolean} true if this token matches the expected token; false otherwise.
     * @public
     */
    checkToken(expectedToken) {
        return Lexeme.tokens[this.token] === expectedToken;
    }
}

/**
 * Enumeration of tokens, with the regex that defines them.
 * @readonly
 * @enum {string}
 * @typedef Token
 */
Lexeme.tokens = {
    white_space: /^\s+/,
    start: /^start\b/,
    end: /^end\b/,
    print: /^print\b/,
    assignment_operator: /^=/,
    open_paren: /^\(/,
    close_paren: /^\)/,
    open_comment: /^\/\*/,
    close_comment: /^\*\//,
    identifier: /^[a-zA-Z]+[a-zA-Z0-9_]*/, // Must be after reserved words.
    number: /^[0-9]+\b/,
    unrecognized: /^[^\*]/ // Must be last; leave * as possible close_comment.
};

export { Lexeme };
