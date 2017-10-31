let lexer, parser;

function runLexer() { // eslint-disable-line no-unused-vars
    let code = document.getElementById('code').value;
    let useRegex = document.getElementById('useRegex').checked;
    lexer = new Lexer();
    lexer.lex(code, useRegex);

    let result = "<h2>Lexemes</h2><ol>";
    for (let lexeme = lexer.getLexeme(); lexeme != null; lexeme = lexer.getLexeme()) {
        result = result + "<li>Source: <code>" + lexeme.source + "</code><br>Token: <code>" + lexeme.token + "</code></li>";
    }
    result = result + "</ol>";
    document.getElementById("result").innerHTML = result;
    let button = document.getElementById("runButton");
    button.innerHTML = 'Run parser';
    button.onclick = runParser;
}

function runParser() { // eslint-disable-line no-unused-vars
    parser = new Parser();
    try {
        parser.parse(lexer);
    }
    catch (error) {
        startOver(error);
        return;
    }
    document.getElementById("result").innerHTML = '<h2>Parse tree</h2><p><code>' + parser.getHtmlResults() + '</code></p>';
    startOver(); // temporary
    // let button = document.getElementById("runButton");
    // button.innerHTML = 'Run interpeter';
    // button.onclick = runInterpeter;
}

function startOver(error) {
    if (error) {
        //alert(error.message);
        document.getElementById("result").innerHTML = '<h2>Syntax error</h2><p><code>' + error.message + '</code></p>'; 
    }
    let button = document.getElementById("runButton");
    button.innerHTML = 'Start over';
    button.onclick = function() { location.reload(); };
}
