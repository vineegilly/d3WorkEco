var inherit = axon.inherit;
var BaseDecomposerModel = require('./BaseDecomposerModel');

/**
 * @param {EcoSystemModel} ecoSystemModel
 * @param {jsonObject} organismInfo
 * @param {Vector2} initialPosition
 * @param {Bounds2} bounds
 * @constructor
 */
function EarthwormModel(ecoSystemModel, organismInfo, initialPosition, bounds, createdThroughInteraction) {
    BaseDecomposerModel.call(this, ecoSystemModel, organismInfo, initialPosition, bounds, createdThroughInteraction);
}

inherit(BaseDecomposerModel, EarthwormModel, {

    clone: function (initialPos, createdThroughInteraction) {
        return new EarthwormModel(this.ecoSystemModel, this.organismInfo, initialPos, this.motionBounds, createdThroughInteraction);
    }

});

module.exports = EarthwormModel;