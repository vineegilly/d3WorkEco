var inherit = axon.inherit;
var grassImage = require("../../../assets/images/grass.png");
var EcoSystemConstants = require('../EcoSystemConstants');

var Node = scenery.Node;
var inherit = axon.inherit;
var Image = scenery.Image;
var Circle = scenery.Circle;

var OrganismImageCollection = require('../../model/organisms/OrganismImageCollection');

function GrassSpawn(center) {
    var thisNode = this;
    thisNode.center = center;
    var appearanceImage = OrganismImageCollection.getRepresentation("grass");
    thisNode.grassImageInstance = new Image(appearanceImage);
    thisNode.grassImageInstance.scale(EcoSystemConstants.IMAGE_SCALE);
}
inherit(Object,GrassSpawn,{
    draw: function (ctx) {
        ctx.drawImage(this.grassImageInstance, this.center.x,  this.center.y); //The rain drop
    }

});


module.exports = GrassSpawn;
