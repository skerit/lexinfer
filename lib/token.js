'use strict';

var Lexinfer,
    Token,
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
Token = Fn.inherits('Informer', function Token(lexinfer, name) {

	// The parent lexinfer instance
	this.lexinfer = lexinfer;

	// The name of this token
	this.name = name;
});

/**
 * Add a token
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {String}   token
 *
 * @return   {Lexinfer.Token}
 */
Token.setMethod(function add(token) {



});