var Node = scenery.Node;
var inherit = axon.inherit;
var Image = scenery.Image;
var Circle = scenery.Circle;

var EcoSystemConstants = require('../model/EcoSystemConstants');
var OrganismImageCollection = require('../model/organisms/OrganismImageCollection');

var ORG_COUNTER = 0;
/**
 *
 * @param {OrganismModel} organismModel
 * @constructor
 */
function OrganismNode(organismModel) {
    var thisNode = this;
    Node.call(thisNode);
    var appearanceImage = OrganismImageCollection.getRepresentation(organismModel.name);
    var appearanceNode = new Image(appearanceImage);
    appearanceNode.scale(EcoSystemConstants.IMAGE_SCALE);

    ORG_COUNTER++;
    //console.log("ORG_COUNTER" + ORG_COUNTER);

    organismModel.positionProperty.link(function (newPos) {
        //console.log("Positioining " + newPos);
        thisNode.center = newPos;
    });


    organismModel.opacityProperty.link(function (newOpacity) {
        thisNode.opacity = newOpacity;
    });


    organismModel.scaleProperty.link(function (newScale) {
        thisNode.scale(newScale);
    });

    thisNode.addChild(appearanceNode);


}

inherit(Node, OrganismNode);


module.exports = OrganismNode;
