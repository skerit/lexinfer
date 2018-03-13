'use strict';

var Lexinfer,
    Parser,
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
Parser = Fn.inherits('Informer', 'Develry.Lexinfer', function Parser(lexinfer, source) {

	// The parent lexinfer instance
	this.lexinfer = lexinfer;

	// The current index
	this.index = 0;

	// The current scope level
	this.level = 0;

	// The parsed pieces will be stored here
	this.tree = [];

	// Only start parsing if a source is provider
	if (source != null) {
		// The source to parse
		this.source = source;

		// The pieces
		this.pieces = source.split(/\s/g);

		this.start();
	}
});

/**
 * Get the current piece
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {String}
 */
Parser.setProperty(function current() {
	return this.pieces[this.index];
});

/**
 * Get the previous piece
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {String}
 */
Parser.setProperty(function prev() {
	return this.pieces[this.index - 1];
});

/**
 * Get the next piece
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {String}
 */
Parser.setProperty(function next() {
	return this.pieces[this.index + 1];
});

/**
 * Move the index by an amount of pieces
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Number}   amount
 *
 * @return   {Number}   The new index
 */
Parser.setMethod(function skip(amount) {

	if (amount == null) {
		amount = 1;
	}

	this.index += amount;

	return this.index;
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
Parser.setMethod(function identify(parser) {

	var result,
	    group,
	    key;

	for (key in this.lexinfer.groups) {
		group = this.lexinfer.groups[key];

		if (group.is_root === false) {
			continue;
		}

		result = group.identify(this);

		if (result) {
			return result;
		}
	}
});

/**
 * Start parsing
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 */
Parser.setMethod(function start() {

	var that = this,
	    ident,
	    token;

	while (this.current != null) {
		token = this.current;

		ident = this.identify(this.current);

		console.log('Got ident', ident, 'for', JSON.stringify(token), 'current index', this.index);

		if (!ident) {
			break;
		}

		this.tree.push(ident);
	}

	console.log('Done parsing!', this);

});

/**
 * Execute the parsed script
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 */
Parser.setMethod(function execute() {

	var current_index,
	    entry,
	    i;

	// Switch out the pieces with the tree
	this.string_pieces = this.pieces;
	this.pieces = this.tree;

	// Reset the index
	this.index = 0;
	current_index = 0;

	while (this.current != null) {
		entry = this.current;

		if (entry.execute) {
			entry.execute(this);
		}

		// Make sure we always move 1 index up
		if (this.index == current_index) {
			this.skip(1);
		}

		current_index = this.index;
	}

});

/**
 * Get pieces until the next time this level is seen
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 */
Parser.setMethod(function extractUntilLevel(level) {

	var pieces = [],
	    result,
	    entry,
	    i;

	for (i = this.index + 1; i < this.tree.length; i++) {
		entry = this.tree[i];

		if (entry.level == level) {
			break;
		}

		pieces.push(entry);
	}

	result = new Parser(this.lexinfer);
	result.tree = result.pieces = pieces;

	return result;
});