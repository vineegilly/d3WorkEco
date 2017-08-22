var inherit = axon.inherit;
var BaseProducerModel = require('./BaseProducerModel');
var GerminatingMixin = require('../GerminatingMixin');

/**
 * @param {EcoSystemModel} ecoSystemModel
 * @param {jsonObject} organismInfo
 * @param {Vector2} initialPosition
 * @param {Bounds2} bounds
 * @constructor
 */
function GrassModel(ecoSystemModel, organismInfo, initialPosition, bounds, createdThroughInteraction) {
    BaseProducerModel.call(this, ecoSystemModel, organismInfo, initialPosition, bounds, createdThroughInteraction);
    _.extend(this, GerminatingMixin);
}

inherit(BaseProducerModel, GrassModel, {

    clone: function (initialPos, createdThroughInteraction) {
        return new GrassModel(this.ecoSystemModel, this.organismInfo, initialPos, this.motionBounds, createdThroughInteraction);
    }

});

module.exports = GrassModel;