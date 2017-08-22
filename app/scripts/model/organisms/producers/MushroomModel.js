
var inherit = axon.inherit;
var BaseProducerModel = require('./BaseProducerModel');
var GerminatingMixin = require('../GerminatingMixin');
var MushroomDyingState = require('../../states/MushroomDyingState');
var EcoSystemConstants = require('../../EcoSystemConstants');

//create a instance of
var mushroomDyingState = new MushroomDyingState();

/**
 * @param {EcoSystemModel} ecoSystemModel
 * @param {jsonObject} organismInfo
 * @param {Vector2} initialPosition
 * @param {Bounds2} bounds
 * @constructor
 */
function MushroomModel(ecoSystemModel, organismInfo, initialPosition, bounds, createdThroughInteraction) {
    BaseProducerModel.call(this, ecoSystemModel, organismInfo, initialPosition, bounds, createdThroughInteraction);
    _.extend(this, GerminatingMixin);
}

inherit(BaseProducerModel, MushroomModel, {

    clone: function (initialPos, createdThroughInteraction) {
        return new MushroomModel(this.ecoSystemModel, this.organismInfo, initialPos, this.motionBounds, createdThroughInteraction);
    },

    /**
     * override startDying and use a speacilized MushroomDyingState object
     */
    startDying: function () {
        this.setState(mushroomDyingState); // As usual the base flow will call the enter state (which now gets hooked into MushroomDyingState)
        this.ecoSystemModel.addDyingOrganisms(this); // do this so it can be removed from model (view which listens to organism array will take the respective node object from Nodegraph)
        this.interactionState = EcoSystemConstants.DYING_STATE;
    },

    validateExpiryState: function (dt) {
        BaseProducerModel.prototype.validateExpiryState.call(this, dt);
        if (this.interactionState == EcoSystemConstants.DYING_STATE) {
            return;
        }
        if(this.ecoSystemModel.timeLapseSinceRaining>10000){ // even with rain, mushroom dies within 10 seconds
            this.moveToDyingStateBecauseOfNoFood();
        }
    }

});

module.exports = MushroomModel;
