/**
 * A rectangular toggle button that switches the value of a property that can take on valueA or valueB.
 */

// modules
var inherit = axon.inherit;
var RectangularButtonView = require( './RectangularButtonView' );
var ToggleButtonInteractionStateProperty = require( './ToggleButtonInteractionStateProperty' );
var ToggleButtonModel = require( './ToggleButtonModel' );

/**
 * @param {Object} valueA one possible value for the toggle
 * @param {Object} valueB the other value for the toggle
 * @param {Property} property axon property that can be either valueA or valueB.
 * @param {Object} [options]
 * @constructor
 */
function RectangularToggleButton( valueA, valueB, property, options ) {

  //@public, so it can be listened to by together
  this.toggleButtonModel = new ToggleButtonModel( valueA, valueB, property, options );
  RectangularButtonView.call( this, this.toggleButtonModel, new ToggleButtonInteractionStateProperty( this.toggleButtonModel ), options );
}

inherit( RectangularButtonView, RectangularToggleButton );

module.exports = RectangularToggleButton;

