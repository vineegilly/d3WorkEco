/**
 * This toggle button uses a boolean property and a trueNode and falseNode to display its content.
 */


// modules
var inherit = axon.inherit;
var RectangularToggleButton = require( './RectangularToggleButton' );
var ToggleNode = require( './ToggleNode' );

/**
 * @param trueNode
 * @param falseNode
 * @param booleanProperty
 * @param {Object} [options]
 * @constructor
 */
function BooleanRectangularToggleButton( trueNode, falseNode, booleanProperty, options ) {
  RectangularToggleButton.call( this, false, true, booleanProperty, _.extend( { content: new ToggleNode( trueNode, falseNode, booleanProperty ) }, options ) );
}

inherit( RectangularToggleButton, BooleanRectangularToggleButton );

module.exports = BooleanRectangularToggleButton;
