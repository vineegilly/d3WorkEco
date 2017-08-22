var inherit = axon.inherit;
var Node = scenery.Node;
var OrganismImageCollection = require('../model/organisms/OrganismImageCollection');
var EcoSystemConstants = require('../model/EcoSystemConstants');
var QuantitySelectionBox = require('./QuantitySelectionBox');
var VBox = scenery.VBox;

/**
 *
 * @param organismModel
 * @constructor
 */
function OrganismCreatorNode(organismModel, ecosystemModel) {
    var thisNode = this;
    Node.call(thisNode, {cursor: 'pointer'});
    var appearanceImage = OrganismImageCollection.getRepresentation(organismModel.name);
    var appearanceNode = new scenery.Image(appearanceImage);
    appearanceNode.scale(EcoSystemConstants.IMAGE_SCALE);

    var quantityProperty = ecosystemModel[organismModel.name.toLowerCase() + "Quantity"];
    var quantitySelectionBox = new QuantitySelectionBox(quantityProperty);
    var organismWithQuantity = new VBox({
        children: [appearanceNode, quantitySelectionBox],
        spacing: 4,
        resize: true
    });


    // Add the main node with which the user will interact.
    thisNode.addChild(organismWithQuantity);

}


inherit(Node, OrganismCreatorNode);


module.exports = OrganismCreatorNode;
