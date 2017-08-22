var inherit = axon.inherit;
var Node = scenery.Node;
var Shape = kite.Shape;
var Path = scenery.Path;
var Bounds2 = dot.Bounds2;
var EcoSystemConstants = require( '../model/EcoSystemConstants' );
var gridImage = require('../../assets/images/grid.png');

/**
 *
 * @param {Dimension2} gridDimension
 * @constructor
 */
function GridNode( gridDimension ) {
  var thisGrid = this;
  Node.call( thisGrid );

  /*var numVerticalLines = gridDimension.width / (EcoSystemConstants.ORGANISM_RADIUS * 2) | 1;
  var numHorizontalLines = gridDimension.height / (EcoSystemConstants.ORGANISM_RADIUS * 2) | 1;

  var gridShape = new Shape();

  //horizontal grid lines
  for ( var i = 0; i < numHorizontalLines + 1; i++ ) {
    gridShape.moveTo( 0, i * (gridDimension.height / numHorizontalLines) );
    gridShape.lineTo( gridDimension.width, i * (gridDimension.height / numHorizontalLines) );
  }

  //vertical grid lines
  for ( i = 0; i < numVerticalLines + 1; i++ ) {
    gridShape.moveTo( i * (gridDimension.width / numVerticalLines), 0 );
    gridShape.lineTo( i * (gridDimension.width / numVerticalLines), gridDimension.height );
  }

  thisGrid.plotGrid = new Path( gridShape, { stroke: 'gray', lineWidth: 0.6 } ); */

  thisGrid.plotGrid = new scenery.Image(gridImage);

  thisGrid.addChild( thisGrid.plotGrid );
  thisGrid.organismContentLayerNode = new Node();
  thisGrid.addChild( thisGrid.organismContentLayerNode );

}


inherit( Node, GridNode, {
  /**
   *
   * @param {Node} organismNode
   */
  addOrganism: function( organismNode ) {
    this.organismContentLayerNode.addChild( organismNode );
  },

  removeOrganism: function( organismNode ) {
    this.organismContentLayerNode.removeChild( organismNode );
  },

  getRefPoint: function( globalPoint ) {
    return this.organismContentLayerNode.globalToLocalPoint( globalPoint );
  },

  /**
   *
   * @param point // global point
   * @returns {*}
   */
  isInside: function( point ) {
    var gridRefPoint = this.plotGrid.globalToLocalPoint( point );
    var point = Bounds2.point( gridRefPoint.x, gridRefPoint.y );
    // point.dilate( EcoSystemConstants.ORGANISM_RADIUS );
    return this.plotGrid.bounds.containsPoint( point );
  }

} );


module.exports = GridNode;
