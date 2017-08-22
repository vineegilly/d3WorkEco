/**
 * Encapsulation of the font used for PhET simulations.
 * Provides Sim-specific defaults, and guarantees a fallback for font family.
 * <p>
 * Sample use:
 * new SimFont( { family: 'Futura', size: 24, weight: 'bold' } )
 * new SimFont( 24 )
 */

// modules
var Font = scenery.Font;
var inherit = axon.inherit;
/**
 * @param {number|Object} [options] if number this is the font size, otherwise same options as scenery.Font
 * @constructor
 */
function SimFont( options ) {

  // convenience constructor: new SimFont( {number|string} size )
  if ( typeof options === 'number' || typeof options === 'string' ) {
    options = { size: options };
  }

  //  defaults
  options = _.extend( {
    family: 'Verdana'
  }, options );

  // Guarantee a fallback family
  assert && assert( options.family );
  options.family = options.family + ', sans-serif';

  Font.call( this, options );
}

inherit( Font, SimFont );

module.exports = SimFont;

