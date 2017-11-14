class Parser { // eslint-disable-line no-unused-vars
    constructor() {
        this.program;
    }

    parse(lexer) {
        this.program = new Program();
        this.program.parse(lexer);
    }

    getParseTreeAsHtml() {
        return this.program.getParseTreeAsHtml();
    }
}
