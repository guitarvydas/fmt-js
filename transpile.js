function transpile (src, grammarName, grammars, fmt) {
    [matchsuccess, grammar, cst, errormessage] = patternmatch (src, grammarName, grammars);
    if (!matchsuccess) {
	return [false, "", "pattern matching error<br><br>" + errormessage];
    } else {
	[success, semanticsFunctionsAsString] = fmtjs (fmt);
	var evalableSemanticsFunctions = '(' + semanticsFunctionsAsString + ')';
	var sem = grammar.createSemantics ();
	try {
	    semobj = eval (evalableSemanticsFunctions);
	} catch (err) {
	    return [false, null, 'error compiling .fmt specification<br><br>' + err.message + ' ' + semanticsFunctionsAsString];
	}
	try {
	    sem.addOperation ("_fmt", semobj);
	} catch (err) {
	    return [false, null, "error in .fmt specifcation<br><br>" + err.message];
	}
        var generatedFmtWalker = sem (cst);
        try {
	    //tracing = true;
	    var generated = generatedFmtWalker._fmt ();
	} catch (err) {
	    return [false, "", err.message];
	}
	return [true, generated, ""];
    }
}


function patternmatch (src, grammarName, grammars) {
    try {
	var grammarSpecs = ohm.grammars (grammars);
    } catch (err) {
	return [false, undefined, undefined, err.message];
    }
    try {
	var grammar = grammarSpecs [grammarName];
    } catch (err) {
	return [false, undefined, undefined, `grammar ${grammarName} not found in given grammars`];
    }
    if (grammar === undefined) {
	return [false, undefined, undefined, `grammar '${grammarName}' not found in given grammars`];
    }

    try {
	var cst = grammar.match (src);
    } catch (err) {
	return [false, undefined, undefined, err.message];
    }
    return [true, grammar, cst, ""];
}

