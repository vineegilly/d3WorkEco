/**
 * Push button with text on a rectangle.
 *
 */


// modules
var inherit = axon.inherit;
var RectangularPushButton = require( './RectangularPushButton' );
var Text = scenery.Text;
var Font = scenery.Font;

function TextPushButton( text, options ) {

  options = _.extend( {
    font: new Font( 20 ),
    textFill: 'black'
  }, options );

  var textNode = new Text( text, { font: options.font, fill: options.textFill } );
  RectangularPushButton.call( this, _.extend( { content: textNode }, options ) );
}

inherit( RectangularPushButton, TextPushButton );


module.exports = TextPushButton;
