import { Lexer } from "./Lexer.js";
import { Parser } from "./Parser.js";

/**
 * Implements a small programming language, performing lexical analysis, syntactic analysis, interpretation, and compilation.
 */
class ProgrammingLanguage {
    constructor() {
        /**
         * @property {Lexer}
         * @private
         */
        this._lexer = new Lexer();

        /**
         * @property {Parser}
         * @private
         */
        this._parser = new Parser();

        /**
         * @property {Element}
         * @private
         */
        this._formButton = document.getElementById('runButton');

        // Initialize the form's Submit button to run the lexer
        this._formButton.innerHTML = 'Run lexer';
        this._formButton.onclick = () => { this._runLexer(); };
    }


    /**
     * Activates this <code>ProgrammingLanguage</code>'s lexer and updates user interface with results.
     * @private
     */
    _runLexer() {
        let code = document.getElementById('code').value;
        this._lexer.analyze(code);

        let result = '<h2>Lexemes</h2><ol>';
        for (let lexeme = this._lexer.getLexeme(); lexeme !== null; lexeme = this._lexer.getLexeme()) {
            result = result + '<li>Source: <code>' + lexeme.source + '</code><br>Token: <code>' + lexeme.token + '</code></li>';
        }
        result = result + '</ol>';
        document.getElementById('result').innerHTML = result;
        this._formButton.innerHTML = 'Run parser';
        this._formButton.onclick = () => { this._runParser(); };
    }

    /**
     * Activates this <code>ProgrammingLanguage</code>'s parser and updates user interface with results.
     * @private
     */
    _runParser() {
        try {
            this._parser.parse(this._lexer);
        }
        catch (error) {
            this.startOver(error);
            return;
        }
        document.getElementById('result').innerHTML = '<h2>Parse tree</h2><p><code>' + this._parser.getParseTreeAsHtml() + '</code></p>';
        this._formButton.innerHTML = 'Run interpreter';
        this._formButton.onclick = () => { this._runInterpreter(); };
    }

    /**
     * Activates this <code>ProgrammingLanguage</code>'s interpreter and updates user interface with results.
     * @private
     */
    _runInterpreter() { 
        this._parser.program.interpret();
        let result = '<h2>Program output</h2><pre>' + this._parser.program.output + '</pre>';
        document.getElementById('result').innerHTML = result;
        this._formButton.innerHTML = 'Run compiler';
        this._formButton.onclick = () => { this._runCompiler(); };
    }

    /**
     * Activates this <code>ProgrammingLanguage</code>'s compiler and updates user interface with results.
     * @private
     */
    _runCompiler() {
        this._parser.program.compile();
        let result = '<h2>Program translation</h2><pre>' + this._parser.program.translation + ' </pre>';
        document.getElementById('result').innerHTML = result;
        this.startOver();
    }

    /**
     * Resets the user interface to its starting state.
     * @argument {Error} [error] - The error that is forcing a restart.
     * @private
     */
    startOver(error) {
        if (error) {
            document.getElementById('result').innerHTML = '<h2>Syntax error</h2><p><code>' + error.message + '</code></p>';
        }
        this._formButton.style.visibility = "hidden";
    }
}

new ProgrammingLanguage();
