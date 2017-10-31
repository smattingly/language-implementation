function lex() {    // eslint-disable-line no-unused-vars
    let lexemes = [];
    let inComment = false;

    // Get the form data.
    let code = document.getElementById('code').value;
    let useRegex = document.getElementById('useRegex').checked;

    // While there is still code to process ...
    while (code.length > 0) {
        // ... extract the next lexeme ...
        let lexeme = {};
        if (useRegex) {
            lexeme = extractNextLexemeWithRegex(code);
        }
        else {
            lexeme = extractNextLexemeWithoutRegex(code);
        }

        // ... remove the lexeme's source from the front of the code ...
        code = code.substr(lexeme.source.length);

        // ... and keep track of lexemes, ignoring white space and text within comments.
        if (lexeme.token === "open_comment") {
            inComment = true;
        }
        else if (lexeme.token === "close_comment") {
            inComment = false;
        }
        else if (lexeme.token !== "white_space" && !inComment) {
            lexemes.push(lexeme);
        }
    }

    display(lexemes);
}

function extractNextLexemeWithRegex(code) {
    // List all tokens, with regular expressions that define their lexemes.
    let regexps = {
        white_space: "^\\s+",
        start: "^start\\b",
        end: "^end\\b",
        print: "^print\\b",
        assignment_operator: "^=",
        open_paren: "^\\(",
        close_paren: "^\\)",
        open_comment: "^/\\*",
        close_comment: "^\\*/",
        identifier: "^[a-zA-Z]+[a-zA-Z0-9_]*",  // must be after reserved words
        number: "^[0-9]+\\b",
        unrecognized: "^.+\\W"                  // must be last
    };

    // Test for a match with each regex, in the order they are listed.
    let lexeme = null;
    for (let r in regexps) {
        let result = code.match(regexps[r]);
        if (result) {
            lexeme = { source: result[0], token: r };
            break; // The first matching regex takes precedence.
        }
    }
    
    return lexeme;
}

function extractNextLexemeWithoutRegex(code) {
    const WHITE_SPACE = ' \t\r\n';
    const STOP_CHARS = WHITE_SPACE + '()=*/';

    // Start with an empty lexeme.
    let lexeme = { source: '', token: undefined };

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
    else if (matchIdentifier(lexeme.source)) {
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

function matchIdentifier(source) {
    // valid identifiers are: [a-zA-Z][a-zA-Z0-9_]*

    let char = source.substring(0, 1);

    // first character must be a letter
    if (!isLetter(char)) return false;

    source = source.substring(1);

    while (source.length > 0) {
        // check next character
        char = source.substring(0, 1);
        source = source.substring(1);

        if (!isLetter(char) && isNaN(char) && char !== '_') {
            return false;
        }
    }

    return true;
}

function isLetter(char) {
    return (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z');
}

function display(lexemes) {
    let output = "<h2>Lexemes</h2><ol>";

    for (let i = 0; i < lexemes.length; i++) {
        output = output + "<li>Token: <code>" + lexemes[i].token + "</code><br>Source: <code>" + lexemes[i].source + "</code></li>";
    }

    output = output + "</ol>";

    document.getElementById("output").innerHTML = output;
}
