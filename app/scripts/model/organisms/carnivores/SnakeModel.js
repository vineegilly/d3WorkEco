var inherit = axon.inherit;
var BaseCarnivoresModel = require('./BaseCarnivoresModel');

/**
 * @param {EcoSystemModel} ecoSystemModel
 * @param {jsonObject} organismInfo
 * @param {Vector2} initialPosition
 * @param {Bounds2} bounds
 * @constructor
 */
function SnakeModel(ecoSystemModel, organismInfo, initialPosition, bounds, createdThroughInteraction) {
    BaseCarnivoresModel.call(this, ecoSystemModel, organismInfo, initialPosition, bounds, createdThroughInteraction);
}

inherit(BaseCarnivoresModel, SnakeModel, {

    clone: function (initialPos, createdThroughInteraction) {
        return new SnakeModel(this.ecoSystemModel, this.organismInfo, initialPos, this.motionBounds, createdThroughInteraction);
    }

});

module.exports = SnakeModel;