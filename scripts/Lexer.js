class Lexer {   // eslint-disable-line no-unused-vars
    constructor() {
        this.lexemes = [];
        this.inComment = false;
        this.lexemeIndex = 0;
    }

    lex(code, useRegex) {
        // While there is still code to process ...
        while (code.length > 0) {
            // ... extract the next lexeme ...
            let lexeme;
            if (useRegex) {
                lexeme = this.extractNextLexemeWithRegex(code);
            }
            else {
                lexeme = this.extractNextLexemeWithoutRegex(code);
            }

            // ... remove the lexeme's source from the front of the code ...
            code = code.substr(lexeme.source.length);

            // ... and keep track of lexemes, ignoring white space and text within comments.
            if (lexeme.checkToken(Lexeme.tokens.open_comment)) {
                this.inComment = true;
            }
            else if (lexeme.checkToken(Lexeme.tokens.close_comment)) {
                this.inComment = false;
            }
            else if (!lexeme.checkToken(Lexeme.tokens.white_space) && !this.inComment) {
                this.lexemes.push(lexeme);
            }
            /* else {
                console.log('discarding ' + JSON.stringify(lexeme))
            } */
        }
    }

    extractNextLexemeWithRegex(code) {
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

    extractNextLexemeWithoutRegex(code) {
        const WHITE_SPACE = ' \t\r\n';
        const STOP_CHARS = WHITE_SPACE + '()=*/';

        // Start with an empty lexeme.
        let lexeme = new Lexeme(); 

        // While there is still code to process ...
        while (code.length > 0) {
            // ... look at the next character.
            let nextChar = code.substring(0, 1);

            if (STOP_CHARS.indexOf(nextChar) < 0) {
                // It is not a stop character, so append it to the lexeme's source ...
                lexeme.source = lexeme.source + nextChar;
                // ... and remove it from the code left to process.
                code = code.substring(1);
            }
            else {
                // It is a stop char, which marks the end of the lexeme's source.

                if (lexeme.source.length === 0) {
                    // If the lexeme's source is empty, the stop char is part of the lexeme's source.
                    lexeme.source = nextChar;

                    // If that was the first of two chars that open or close a comment ...
                    let secondChar = code.substring(1, 2);
                    if ((lexeme.source === '/' && secondChar === '*') ||
                        (lexeme.source === '*' && secondChar === '/')) {
                        // ... then both chars go in the lexeme's source.
                        lexeme.source = lexeme.source + secondChar;
                    }
                }
                else if (lexeme.source.length === 1 && WHITE_SPACE.indexOf(lexeme.source.substring(0, 1)) === 0) {
                    // If the lexeme's source starts with white space, take all adjacent white space chars.
                    while (code.length > 0 && WHITE_SPACE.indexOf(code.substring(0, 1)) >= 0) {
                        lexeme.source = lexeme.source + code.substring(0, 1);
                        code = code.substring(1);
                    }
                }

                break; // The lexeme's source is now complete.
            }
        }

        // Determine the lexeme's token.
        if (lexeme.source === 'start' || lexeme.source === 'end' || lexeme.source === 'print') {
            // Each reserved word has its own token.
            lexeme.token = lexeme.source;
        }
        else if (this.matchIdentifier(lexeme.source)) {
            lexeme.token = 'identifier';
        }
        else if (lexeme.source === "(") {
            lexeme.token = "open_paren";
        }
        else if (lexeme.source === ")") {
            lexeme.token = "close_paren";
        }
        else if (lexeme.source === "=") {
            lexeme.token = "assignment_operator";
        }
        else if (lexeme.source === "/*") {
            lexeme.token = "open_comment";
        }
        else if (lexeme.source === "*/") {
            lexeme.token = "close_comment";
        }
        else if (WHITE_SPACE.indexOf(lexeme.source.substring(0, 1)) >= 0) {
            lexeme.token = 'white_space';
        }
        else if (!isNaN(lexeme.source)) {
            // isNaN returns false for empty string; this test must be after white space test.
            lexeme.token = 'number';
        }
        else {
            lexeme.token = "unrecognized";
        }
        return lexeme;
    }

    matchIdentifier(source) {
        // valid identifiers are: [a-zA-Z][a-zA-Z0-9_]*

        let char = source.substring(0, 1);

        // first character must be a letter
        if (!this.isLetter(char)) return false;

        source = source.substring(1);

        while (source.length > 0) {
            // check next character
            char = source.substring(0, 1);
            source = source.substring(1);

            if (!this.isLetter(char) && isNaN(char) && char !== '_') {
                return false;
            }
        }

        return true;
    }

    isLetter(char) {
        return (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z');
    }
    
    getLexeme(advance) {
        if (this.lexemeIndex >= this.lexemes.length) {
            this.lexemeIndex = 0;
            return null;
        }
        return this.lexemes[advance === false ? this.lexemeIndex : this.lexemeIndex++];
    }
}
