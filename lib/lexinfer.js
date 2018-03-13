'use strict';

var LexinferNS,
    Lexinfer,
    Blast      = __Protoblast,
    Fn         = Blast.Bound.Function;

// Get the Lexinfer namespace
LexinferNS = Fn.getNamespace('Develry.Lexinfer');

/**
 * The Lexinfer Class
 *
 * @constructor
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 */
Lexinfer = Fn.inherits('Informer', 'Develry.Lexinfer', function Lexinfer(name) {

	// The name of what we're parsing
	this.name = name;

	// The available token groups
	this.groups = {};
});

/**
 * Add a group
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {String}   group_name
 *
 * @return   {Lexinfer.Token}
 */
Lexinfer.setMethod(function group(group_name) {

	// Create the new token instance
	var group = new LexinferNS.Group(this, group_name);

	// Store it
	this.groups[group_name] = group;

	// And return it so we can add more options
	return group;
});

/**
 * Start parsing something
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {String}   source
 *
 * @return   {Object}
 */
Lexinfer.setMethod(function parse(source) {
	return new LexinferNS.Parser(this, source);
});