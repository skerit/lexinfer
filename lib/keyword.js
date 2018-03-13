'use strict';

var Lexinfer,
    Keyword,
    Blast      = __Protoblast,
    Fn         = Blast.Bound.Function;

// Get the Lexinfer namespace
Lexinfer = Fn.getNamespace('Develry.Lexinfer');

/**
 * The Lexinfer Class
 *
 * @constructor
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 */
Keyword = Fn.inherits('Informer', 'Develry.Lexinfer', function Keyword(lexinfer, name) {

	// The parent lexinfer instance
	this.lexinfer = lexinfer;

	// The name of this token
	this.name = name.toLowerCase();

	// The comment for this token
	this.keyword_comment = '';

	// Some flags this token identifies as
	this.flags = {};

	// Certain things this token has
	this.belongings = {};

	// Parameters something can have
	this.signatures = [];

	// Sub keywords
	this.keywords = {};

	// More matches
	this.matchers = [];
});

/**
 * Create a duplicate of this keyword
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {Lexinfer.Keyword}
 */
Keyword.setMethod(function overlay() {

	var result = Object.create(this);

	result.name = this.name;

	return result;
});

/**
 * Add a subkeyword
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {String}   keyword_name
 *
 * @return   {Lexinfer.Keyword}
 */
Keyword.setMethod(function keyword(keyword_name) {

	// Create the new token instance
	var keyword = new Lexinfer.Keyword(this.lexinfer, keyword_name);

	// Remember this is the parent
	keyword.parent = this;

	// Store it
	this.keywords[keyword_name] = keyword;

	// And return it so we can add more options
	return keyword;
});

/**
 * Set the comment for this token
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {String}   comment
 *
 * @return   {Lexinfer.Keyword}
 */
Keyword.setMethod(function comment(comment) {
	this.keyword_comment = comment;
	return this;
});

/**
 * Also match on this
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {String}   matcher
 *
 * @return   {Lexinfer.Keyword}
 */
Keyword.setMethod(function match(matcher) {
	this.matchers.push(matcher);
	return this;
});

/**
 * Set a flag for this token
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {String}   flag_name
 * @param    {Mixed}    value
 *
 * @return   {Lexinfer.Keyword}
 */
Keyword.setMethod(function is(flag_name, value) {

	if (arguments.length == 1) {
		return this.flags[flag_name];
	}

	this.flags[flag_name] = value;

	return this;
});

/**
 * Set a token belonging,
 * adding things if it already has one
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {String}   has_name
 * @param    {Mixed}    value
 *
 * @return   {Lexinfer.Keyword}
 */
Keyword.setMethod(function has(has_name, value) {

	if (!this.belongings[has_name]) {
		this.belongings[has_name] = [];
	}

	if (arguments.length == 1) {
		return this.belongings[has_name];
	}

	this.belongings.push(value);

	return this;
});

/**
 * Add a signature
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Types}
 *
 * @return   {Lexinfer.Signature}
 */
Keyword.setMethod(function signature(_args) {

	var instance,
	    args,
	    i;

	if (Array.isArray(_args)) {
		args = _args;
	} else {
		args = [];

		for (i = 0; i < arguments.length; i++) {
			args.push(arguments[i]);
		}
	}

	instance = new Lexinfer.Signature(this, args);

	this.signatures.push(instance);

	return instance;
});

/**
 * Create a new instance of this token to be used as a parameter
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {String}   name
 * @param    {String}   comment
 *
 * @return   {Lexinfer.Keyword}
 */
Keyword.setMethod(function param(name, comment) {

	var new_arg = new Keyword(this.lexinfer, this.name);

	// Remember it's a descendent of this type
	new_arg.parent = this;

	// And set its name
	new_arg.param_name = name;

	// Take over this comment
	new_arg.keyword_comment = this.keyword_comment;

	if (comment != null) {
		new_arg.param_comment = comment;
	}

	return new_arg;
});

/**
 * Set possible values
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Object}
 *
 * @return   {Lexinfer.Keyword}
 */
Keyword.setMethod(function values(values) {
	this.values = values;
	return this;
});

/**
 * How this leyword should be executed
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Function}   fnc
 *
 * @return   {Lexinfer.Keyword}
 */
Keyword.setMethod(function logic(fnc) {
	this.logic_function = fnc;
	return this;
});

/**
 * Execute this keyword, if there is a function
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Lexinfer.Parser}   parser
 */
Keyword.setMethod(function execute(parser) {

	if (!this.logic_function) {
		return false;
	}

	let args = [parser],
	    i;

	return this.logic_function.apply(this, args);
});

/**
 * Does this keyword match the given token
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Lexinfer.Parser|String}   parser
 *
 * @return   {Lexinfer.Keyword}
 */
Keyword.setMethod(function matches(parser) {

	var matcher,
	    result = false,
	    token,
	    i;

	if (typeof parser == 'string') {
		token = parser;
		parser = null;
	} else {
		token = parser.current;
	}

	if (token == this.name) {
		result = true;
	} else {
		for (i = 0; i < this.matchers.length; i++) {
			matcher = this.matchers[i];

			if (token == matcher) {
				result = true;
				break;
			} else if (typeof matcher == 'function') {
				if (matcher(token)) {
					result = true;
					break;
				}
			} else if (Blast.Bound.RegExp.isRegExp(matcher)) {
				if (matcher.test(token)) {
					result = true;
					break;
				}
			}
		}
	}

	if (result && parser) {
		parser.skip(1);
	}

	if (!result && this.parent) {
		result = this.parent.matches(parser);
	}

	return result;
});

/**
 * Parse the given token
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Lexinfer.Parser|String}   parser
 *
 * @return   {Lexinfer.Keyword}
 */
Keyword.setMethod(function parse(parser) {

	var signature,
	    own_level,
	    current,
	    result,
	    level = parser.level,
	    start = parser.index,
	    i;

	// We need to get the current value BEFORE doing any matching tests
	current = parser.current;
	own_level = level;

	if (!this.matches(parser)) {
		return false;
	}

	// The initial match is positive, so see if we need to increment the level
	if (this.is('start_block')) {
		parser.level++;
	}

	if (this.is('end_block')) {
		parser.level--;
		own_level = level - 1;
	}

	for (i = 0; i < this.signatures.length; i++) {
		signature = this.signatures[i];

		result = signature.parse(parser);

		// If one of the elements does not pass, go to the next signature
		if (!result) {
			continue;
		}
	}

	// No matches, so undo the index & level changes
	if (this.signatures.length && !result) {
		parser.index = start;
		parser.level = level;
		return false;
	}

	if (result) {
		result.start_token = current;
		result.level = own_level;
		return result;
	}

	result = this.overlay();
	result.start_token = current;
	result.level = own_level;

	return result;
});