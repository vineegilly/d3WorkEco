var inherit = axon.inherit;
var BaseHerbivoresModel = require('./BaseHerbivoresModel');

/**
 * @param {EcoSystemModel} ecoSystemModel
 * @param {jsonObject} organismInfo
 * @param {Vector2} initialPosition
 * @param {Bounds2} bounds
 * @constructor
 */
function DeerModel(ecoSystemModel, organismInfo, initialPosition, bounds, createdThroughInteraction) {
    BaseHerbivoresModel.call(this, ecoSystemModel, organismInfo, initialPosition, bounds, createdThroughInteraction);
}

inherit(BaseHerbivoresModel, DeerModel, {

    clone: function (initialPos, createdThroughInteraction) {
        return new DeerModel(this.ecoSystemModel, this.organismInfo, initialPos, this.motionBounds, createdThroughInteraction);
    }

});

module.exports = DeerModel;