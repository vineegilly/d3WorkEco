var inherit = axon.inherit;
var SimFont = require( '../core/SimFont' );
var Node = scenery.Node;
var Bounds2 = dot.Bounds2;
var Panel = require( '../controls/Panel' );
var EcoSystemConstants = require( '../model/EcoSystemConstants' );
var VBox = scenery.VBox;
var Dimension2 = dot.Dimension2;
var GridNode = require( './GridNode' );
var EcoSystemEffectNode = require( './EcoSystemEffectNode' );


/**
 *
 * @param {EcoSystemModel} ecoSystemModel
 * @constructor
 */
function GridPanelNode( ecoSystemModel ) {
  var thisPanelNode = this;
  var panelContentsNode = new Node();

  thisPanelNode.gridNode = new GridNode( EcoSystemConstants.GRID_NODE_DIMENSION );
  panelContentsNode.addChild( thisPanelNode.gridNode );

  var particleBounds = Bounds2.rect( 0, 0, EcoSystemConstants.GRID_NODE_DIMENSION.width,
      EcoSystemConstants.GRID_NODE_DIMENSION.height );
  thisPanelNode.ecoSystemEffectNode = new EcoSystemEffectNode( ecoSystemModel, particleBounds );
  panelContentsNode.addChild( thisPanelNode.ecoSystemEffectNode );


// vertical panel
  Panel.call( this, panelContentsNode, {
    // panel options
    fill: EcoSystemConstants.GRID_BACKGROUND_COLOR,
    resize: false,
    cornerRadius: 0,
    xMargin: 0,
    yMargin: 0
  } );

}

inherit( Panel, GridPanelNode, {

  step: function( dt ) {
    var thisPanelNode = this;
    thisPanelNode.ecoSystemEffectNode.step( dt );
  },

  /**
   *
   * @param {Node} organismNode
   */
  addOrganism: function( organismNode ) {
    this.gridNode.addOrganism( organismNode );
  },

  removeOrganism: function( organismNode ) {
    this.gridNode.removeOrganism( organismNode );
  },

  getRefPoint: function( point ) {
    return this.gridNode.getRefPoint( point );
  },

  isInside: function( point ) {
    return this.gridNode.isInside( point );
  }

} );

module.exports = GridPanelNode;
