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
Lexinfer = Fn.inherits('Informer', function Lexinfer(name) {
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
Lexinfer.setMethod(function add(token) {



});