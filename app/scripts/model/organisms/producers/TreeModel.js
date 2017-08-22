var inherit = axon.inherit;
var BaseProducerModel = require('./BaseProducerModel');

/**
 * @param {EcoSystemModel} ecoSystemModel
 * @param {jsonObject} organismInfo
 * @param {Vector2} initialPosition
 * @param {Bounds2} bounds
 * @constructor
 */
function TreeModel(ecoSystemModel, organismInfo, initialPosition, bounds, createdThroughInteraction) {
    BaseProducerModel.call(this, ecoSystemModel, organismInfo, initialPosition, bounds, createdThroughInteraction);
}

inherit(BaseProducerModel, TreeModel, {

    clone: function (initialPos, createdThroughInteraction) {
        return new TreeModel(this.ecoSystemModel, this.organismInfo, initialPos, this.motionBounds, createdThroughInteraction);
    }

});

module.exports = TreeModel;