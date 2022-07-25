function transpile (src, grammarName, grammars, fmt) {
    [matchsuccess, grammar, cst, errormessage] = patternmatch (src, grammarName, grammars);
    if (!matchsuccess) {
	return [false, "", "pattern matching error " + errormessage];
    } else {
	[success, semanticsFunctionsAsString] = fmtjs (fmt);
	console.log (success);
	var evalableSemanticsFunctions = '(' + semanticsFunctionsAsString + ')';
	var sem = grammar.createSemantics ();
	try {
	    console.log (evalableSemanticsFunctions);
	    semobj = eval (evalableSemanticsFunctions);
	} catch (err) {
	    return [false, null, 'error compiling .fmt specification ' + err.message + ' ' + semanticsFunctionsAsString];
	}
	try {
	    sem.addOperation ("_fmt", semobj);
	} catch (err) {
	    return [false, null, "error in .fmt specifcation " + err.message];
	}
	return [true, "NIY WIP", ""];
    }
}


function patternmatch (src, grammarName, grammars) {
    try {
	var grammarSpecs = ohm.grammars (grammars);
    } catch (err) {
	return [false, None, None, err.message];
    }
    try {
	var grammar = grammarSpecs [grammarName];
    } catch (err) {
	return [false, None, None, `grammar ${grammarName} not found in given grammars`];
    }
    try {
	var cst = grammar.match (src);
    } catch (err) {
	return [false, None, None, err.message];
    }
    return [true, grammar, cst, ""];
}

