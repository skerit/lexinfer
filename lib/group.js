'use strict';

var Lexinfer,
    Group,
    Blast      = __Protoblast,
    Fn         = Blast.Bound.Function;

// Get the Lexinfer namespace
Lexinfer = Fn.getNamespace('Develry.Lexinfer');

/**
 * The Group Class
 *
 * @constructor
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 */
Group = Fn.inherits('Informer', 'Develry.Lexinfer', function Group(lexinfer, name) {

	// The parent lexinfer instance
	this.lexinfer = lexinfer;

	// The name of this group
	this.name = name.toLowerCase();

	// The tokens
	this.keywords = {};

	// The types
	this.types = {};
});

/**
 * Add a keyword
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {String}   token_name
 *
 * @return   {Lexinfer.Keyword}
 */
Group.setMethod(function keyword(keyword_name) {

	// Create the new token instance
	var keyword = new Lexinfer.Keyword(this, keyword_name);

	// Store it
	this.keywords[keyword_name] = keyword;

	// And return it so we can add more options
	return keyword;
});

/**
 * Get a token
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {String}   keyword_name
 *
 * @return   {Lexinfer.Keyword}
 */
Group.setMethod(function get(keyword_name) {
	return this.keywords[keyword_name];
});

/**
 * Get a keyword instance
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Lexinfer.Parser}   parser
 *
 * @return   {Lexinfer.Keyword}
 */
Group.setMethod(function identify(parser) {

	var keyword,
	    result,
	    key;

	for (key in this.keywords) {
		keyword = this.keywords[key];

		result = keyword.parse(parser);

		if (result) {
			return result;
		}
	}
});

/**
 * Parse tokens
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Lexinfer.Parser}   parser
 *
 * @return   {Lexinfer.Keyword}
 */
Group.setMethod(function parse(parser) {
	return this.identify(parser);
});