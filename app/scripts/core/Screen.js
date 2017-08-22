/**
 *
 * @author Sharfudeen Ashraf
 */

var inherit = axon.inherit;
var PropertySet = axon.PropertySet;
var Color = scenery.Color;

/**
 * @param {string} name
 * @param {function} createModelCallback
 * @param {function} createViewCallback
 * @param {Object} [options]
 * @constructor
 */
function Screen( name, createModelCallback, createViewCallback, options ) {

  options = _.extend( {
    backgroundColor: 'white' // {Color|string} - Initial background color of the screen
  }, options );

  var backgroundColor = options.backgroundColor;
  if ( typeof backgroundColor === 'string' ) {
    backgroundColor = new Color( backgroundColor );
  }

  PropertySet.call( this, {
    backgroundColor: backgroundColor
  } );

  this.name = name;
  this.createModel = createModelCallback;
  this.createView = createViewCallback;
}


inherit( PropertySet, Screen );


module.exports = Screen;