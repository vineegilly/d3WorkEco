var inherit = axon.inherit;
var BaseHerbivoresModel = require('./BaseHerbivoresModel');
var BaseOrganismModel = require('../BaseOrganismModel');

/**
 * @param {EcoSystemModel} ecoSystemModel
 * @param {jsonObject} organismInfo
 * @param {Vector2} initialPosition
 * @param {Bounds2} bounds
 * @constructor
 */
function BeetleModel(ecoSystemModel, organismInfo, initialPosition, bounds, createdThroughInteraction) {
    BaseHerbivoresModel.call(this, ecoSystemModel, organismInfo, initialPosition, bounds, createdThroughInteraction);
    this.timeElapsedSincePoision = 0; // pesticide or herbicide
}

inherit(BaseHerbivoresModel, BeetleModel, {

    clone: function (initialPos, createdThroughInteraction) {
        return new BeetleModel(this.ecoSystemModel, this.organismInfo, initialPos, this.motionBounds, createdThroughInteraction);
    },

    doStep: function (dt) {

    },

    isSprayApplicable: function () {
        return true;
    },

    validateExpiryState: function (dt) {
        BaseOrganismModel.prototype.validateExpiryState.call(this, dt);

        if (this.ecoSystemModel.isSpraying()) {
            this.timeElapsedSincePoision += dt;

            if (this.timeElapsedSincePoision >= this.getTimeThresholdForPoison()) {
                //   this.moveToDyingStateDueToPoison();
            }
        }
        else {
            this.timeElapsedSincePoision = 0;
        }


    }


});

module.exports = BeetleModel;