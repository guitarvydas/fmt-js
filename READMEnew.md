![[pe.png]]
A DSL for writing DSLs.

This version - fmt-js.js - is meant for use in an HTML file.  See Fab for a node.js version that runs on the command line.
# Usage - API
## Transpile (...)
`function transpile (src, grammarName, grammars, fmt, ohmlang, compfmt, supportfname)`

returns
`[Boolean, transpiled, errorMessage]`

- `src` is a string, containing the text-to-be-transpiled
- `grammarName` is a string containing the name of the grammar (Ohm-JS allows multiple grammars in a grammar string)
- `grammars` is a string containing one or more grammars in Ohm-JS format
- `fmt` is a string containing a fabrication specification (formerly known as ForMaT)
- `ohmlang` is a JavaScript function - the Ohm engine, often installed in the enclosing HTML using `<script src="https://unpkg.com/ohm-js@16/dist/ohm.min.js"></script>` and referred to by the name `ohm`
- `compfmt` is a JavaScript function installed in the enclosing HTML using ```
    <script src="fmt-js/fmt-js.js"></script>
    <script src="fmt-js/transpile.js"></script>``` and referred to by the name `compilefmt`
- `supportfname` is a string containing the pathname for a JavaScript file containing support functions referred to by the fabrication (`fmt`) specification

On return:
- `Boolean` is either JavaScript `true` or JavaScript `false`, if the transpilation succeed or failed, respectively
- `transpiled` is a string containing the newly-transpiled text, or the empty string if errors occurred
- `errorMessage` is a string, empty if the transpilation fully succeeded, else containing the text of an error message.

# Usage - Demo
![[fmt-js.png]]
Load `fmt-js.html` into a browser.

Select one of the canned tests
- Use small test
- Use small test 2
- Use small test 3
- Use big test
- Use escaped quote test,

or, enter code manually in the "source" input text area.

Press the "Generate JavaScript from FMT specification" button.

Copy/paste the generated JavaScript code from the "equivalent JavaScript code" text area into your app.

# Status
The status area - at the bottom of screen - displays "OK" if the transpilation succeeded or "FAILED" if there was an error.

Error messages are shown in the "equivalent JavaScript code" text area.