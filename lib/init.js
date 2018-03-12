var Lexinfer,
    Blast;

// Get an existing Protoblast instance,
// or create a new one
if (typeof __Protoblast != 'undefined') {
	Blast = __Protoblast;
} else {
	Blast = require('protoblast')(false);
}

// Get the Peerpin namespace
Lexinfer = Blast.Bound.Function.getNamespace('Develry.Lexinfer');

require('./lexinfer.js');
require('./token.js');

// Export the Peerpin namespace
module.exports = Lexinfer;