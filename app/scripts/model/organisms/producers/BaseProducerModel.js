/**
 * Model common for Grass,Flower and Tree
 * Rain is the "food" . In addition this can be exposed to Pesticide
 */
var inherit = axon.inherit;
var BaseOrganismModel = require('../BaseOrganismModel');

/**
 * @param {EcoSystemModel} ecoSystemModel
 * @param {jsonObject} organismInfo
 * @param {Vector2} initialPosition
 * @param {Bounds2} bounds
 * @constructor
 */
function BaseProducerModel(ecoSystemModel, organismInfo, initialPosition, bounds, createdThroughInteraction) {
    BaseOrganismModel.call(this, ecoSystemModel, organismInfo, initialPosition, bounds, createdThroughInteraction);
    this.timeElapsedSincePoision = 0; // pesticide or herbicide
}

inherit(BaseOrganismModel, BaseProducerModel, {

    isInAnimate: function () {
        return true;
    },

    isSprayApplicable: function () {
        return true;
    },

    validateExpiryState: function (dt) {
        BaseOrganismModel.prototype.validateExpiryState.call(this, dt);
        if (this.ecoSystemModel.isSpraying()) {
            this.timeElapsedSincePoision += dt;

            if (this.timeElapsedSincePoision >= this.getTimeThresholdForPoison()) {
                this.moveToDyingStateDueToPoison();
            }
        }
        else {
            this.timeElapsedSincePoision = 0;
        }
    },

    getTimeThresholdForPoison: function () {

    },

    moveToDyingStateDueToPoison: function () {

    },

    defineTimeLapseRules: function () {
        this.timeElapsedWithoutFood = 0;
        this.timeElapsedSinceReproduction = 0;
    },

    onRain: function () {
        this.timeElapsedWithoutFood = 0;
    }

});

module.exports = BaseProducerModel;