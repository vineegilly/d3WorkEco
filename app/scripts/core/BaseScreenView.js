/**
 *
 *
 * @author Sharfudeen Ashraf
 */

var Node = scenery.Node;
var inherit = axon.inherit;
var Bounds2 = dot.Bounds2;

var DEFAULT_LAYOUT_BOUNDS = new Bounds2( 0, 0, 800, 600 );

function BaseScreenView( options ) {

  options = _.extend( {
    layoutBounds: DEFAULT_LAYOUT_BOUNDS.copy()
  }, options );
  this.layoutBounds = options.layoutBounds;

  Node.call( this, _.extend( {
    layerSplit: true // so we're not in the same layer as the navbar, etc.
  }, options ) );
}

inherit( Node, BaseScreenView, {

    //Get the scale to use for laying out the sim components and the navigation bar, so its size will track with the sim size
    getLayoutScale: function( width, height ) {
      return Math.min( width / this.layoutBounds.width, height / this.layoutBounds.height );
    },

    //Default layout function uses the layoutWidth and layoutHeight to scale the content (based on whichever is more
    // limiting: width or height)
    //and centers the content in the screen vertically and horizontally
    //This function can be replaced by subclasses that wish to perform their own custom layout.
    layout: function( width, height ) {
      this.resetTransform();

      var scale = this.getLayoutScale( width, height );
      this.setScaleMagnitude( scale );

      //center vertically
      if ( scale === width / this.layoutBounds.width ) {
        this.translate( 0, (height - this.layoutBounds.height * scale) / 2 / scale );
      }

      //center horizontally
      else if ( scale === height / this.layoutBounds.height ) {
        this.translate( (width - this.layoutBounds.width * scale) / 2 / scale, 0 );
      }
    }
  },

  //statics
  {
    DEFAULT_LAYOUT_BOUNDS: DEFAULT_LAYOUT_BOUNDS
  }
);

module.exports = BaseScreenView;
