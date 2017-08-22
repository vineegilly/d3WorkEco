var inherit = axon.inherit;
var BaseOmnivoresModel = require('./BaseOmnivoresModel');

/**
 * @param {EcoSystemModel} ecoSystemModel
 * @param {jsonObject} organismInfo
 * @param {Vector2} initialPosition
 * @param {Bounds2} bounds
 * @constructor
 */
function SongbirdModel(ecoSystemModel, organismInfo, initialPosition, bounds, createdThroughInteraction) {
    BaseOmnivoresModel.call(this, ecoSystemModel, organismInfo, initialPosition, bounds, createdThroughInteraction);
}

inherit(BaseOmnivoresModel, SongbirdModel, {

    clone: function (initialPos, createdThroughInteraction) {
        return new SongbirdModel(this.ecoSystemModel, this.organismInfo, initialPos, this.motionBounds, createdThroughInteraction);
    }

});

module.exports = SongbirdModel;