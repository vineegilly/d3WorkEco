var inherit = axon.inherit;
var Node = scenery.Node;
var Text = scenery.Text;
var Rectangle = scenery.Rectangle;
var EcoSystemConstants = require( '../model/EcoSystemConstants' );
var Color = scenery.Color;

/**
 *
 * @param {Dimension2} titleBarSize
 * @param {string} titleStr
 * @param {hash} options
 * @constructor
 */
function TitleBarNode( titleBarSize, titleStr1, titleStr2, options ) {

  options = _.extend( {
    xMargin: 1,
    barLineWidth: 0,
    barFill: Color.LIGHT_GRAY,
    barStroke: Color.BLACK
  }, options );

  var titleBarNode = this;
  Node.call( titleBarNode );

  var barNode = new Rectangle( 0, 0, titleBarSize.width, titleBarSize.height+10, 0, 0, {
    fill: options.barFill,
    stroke: options.barStroke,
    lineWidth: options.barLineWidth
  } );

  // Title
  var titleNode1 = new Text( titleStr1, { font: EcoSystemConstants.PANEL_TITLE_FONT } );
  var titleNode2 = new Text( titleStr2, { font: EcoSystemConstants.PANEL_TITLE_FONT } );

  titleBarNode.addChild( barNode );
  titleBarNode.addChild( titleNode1);
  titleBarNode.addChild( titleNode2);
  // layout
  titleNode1.centerX = barNode.centerX;
  titleNode1.centerY = barNode.centerY-5;

  titleNode2.centerX = barNode.centerX;
  titleNode2.centerY = barNode.centerY+10;
}

inherit( Node, TitleBarNode, {} );
module.exports = TitleBarNode;
