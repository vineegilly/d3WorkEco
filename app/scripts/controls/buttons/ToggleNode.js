// Copyright 2002-2013, University of Colorado Boulder

/**
 * Shows one node if the property is true or another node if the property is false.
 * Used to indicate boolean state.
 */


var Node = scenery.Node;
var Rectangle = scenery.Rectangle;
var inherit = axon.inherit;

/**
 * @param {Node} trueNode
 * @param {Node} falseNode
 * @param {Property} booleanProperty
 * @constructor
 */
function ToggleNode( trueNode, falseNode, booleanProperty, options ) {

  options = _.extend( { // defaults

    //Wrap the nodes so that visibility flags won't be toggled on the passed-in nodes directly (in case they appear elsewhere in the DAG)
    //Or opt-out if you know the nodes don't appear elsewhere and want to opt out of the increased tree depth and associated performance costs
    wrapChildren: true
  }, options );

  var thisNode = this;
  Node.call( thisNode );
  var background = Rectangle.bounds( trueNode.bounds.union( falseNode.bounds ), { visible: false } );
  this.addChild( background );

  var targetTrueNode = options.wrapChildren ? new Node( { children: [ trueNode ] } ) : trueNode;
  var targetFalseNode = options.wrapChildren ? new Node( { children: [ falseNode ] } ) : falseNode;

  this.addChild( targetFalseNode );
  this.addChild( targetTrueNode );

  booleanProperty.link( function( value ) {
    targetTrueNode.setVisible( value );
    targetFalseNode.setVisible( !value );
  } );
  if ( options ) {
    this.mutate( options );
  }
}

inherit( Node, ToggleNode );

module.exports = ToggleNode;

