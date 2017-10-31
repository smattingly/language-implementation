class Lexeme { // eslint-disable-line no-unused-vars
    constructor(source, token) {
        this.source = source || '';
        this.token = token;
    }

    checkToken(expectedToken) {
        return Lexeme.tokens[this.token] === expectedToken;
    }
}

// Each token is a regex that defines a category of lexemes. 
Lexeme.tokens = {
    white_space: "^\\s+",
    start: "^start\\b",
    end: "^end\\b",
    print: "^print\\b",
    assignment_operator: "^=",
    open_paren: "^\\(",
    close_paren: "^\\)",
    open_comment: "^/\\*",
    close_comment: "^\\*/",
    identifier: "^[a-zA-Z]+[a-zA-Z0-9_]*", // Must be after reserved words.
    number: "^[0-9]+\\b",
    unrecognized: "^[^\\*]+" // Must be last; leave * as possible close_comment.
};
