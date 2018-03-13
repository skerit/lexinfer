'use strict';

var Signature,
    Lexinfer,
    Blast      = __Protoblast,
    Fn         = Blast.Bound.Function;

// Get the Lexinfer namespace
Lexinfer = Fn.getNamespace('Develry.Lexinfer');

/**
 * The Signature Class
 *
 * @constructor
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Lexinfer.Keyword}   keyword
 */
Signature = Fn.inherits('Informer', 'Develry.Lexinfer', function Signature(keyword, parameters) {

	// The parent keyword
	this.parent_keyword = keyword;

	// The actual parameters of this signature
	this.parameters = parameters;
});

/**
 * Create a duplicate of this signature
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {Lexinfer.Keyword}
 */
Signature.setMethod(function overlay() {

	var result = Object.create(this);

	result.parent_keyword = this.parent_keyword;

	return result;
});

/**
 * Does this signature match the given token
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Lexinfer.Parser|String}   parser
 *
 * @return   {Lexinfer.Signature}
 */
Signature.setMethod(function matches(parser) {

	var instance,
	    matched = true,
	    result = [],
	    parsed,
	    param,
	    start = parser.index,
	    token,
	    i;

	for (i = 0; i < this.parameters.length; i++) {
		param = this.parameters[i];

		console.log(' --- Parsing parameter', param);

		// See if the param matches
		parsed = param.parse(parser);

		console.log(' ---- Param result:', parsed);

		if (!parsed) {
			matched = false;
			break;
		}

		result.push(parsed);
	}

	// Revert the index of the parser
	if (!matched) {
		parser.index = start;
		return null;
	}

	instance = this.overlay();
	instance.values = result;

	return instance;
});

/**
 * Does this signature match the given token
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Lexinfer.Parser|String}   parser
 *
 * @return   {Lexinfer.Signature}
 */
Signature.setMethod(function parse(parser) {
	return this.matches(parser);
});

/**
 * How this signature should be executed
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Function}   fnc
 *
 * @return   {Lexinfer.Signature}
 */
Signature.setMethod(function logic(fnc) {
	this.logic_function = fnc;
	return this;
});

/**
 * Execute this signature, if there is a function
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Lexinfer.Parser}   parser
 */
Signature.setMethod(function execute(parser) {

	if (!this.logic_function) {
		return false;
	}

	let args = [parser],
	    i;

	for (i = 0; i < this.values.length; i++) {
		args.push(this.values[i].start_token);
	}

	return this.logic_function.apply(this, args);
});