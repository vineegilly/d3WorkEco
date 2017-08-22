var inherit = axon.inherit;
var BaseOrganismState = require('./BaseOrganismState');
var Vector2 = dot.Vector2;
var OrganismRuleConstants = require('../OrganismRuleConstants');
var GrassModel = require('../organisms/producers/GrassModel');
var EcoSystemConstants = require('../EcoSystemConstants');
/**
 * Mushroom dying has a specialized behaviour, grass needs to grow at the same place where mushroom dies (provided it is raining)
 * @constructor
 */
function MushroomDyingState() {
    BaseOrganismState.call(this);
}

inherit(BaseOrganismState, MushroomDyingState, {

    /**
     *
     * @param {organism} organism that dies (mushroom)
     * @param {number} dt
     */
    step: function (organism, dt) {
        organism.opacity = Math.max(0, Math.min(organism.opacity - 0.30, 1));
        if (organism.opacity <= 0) {

            organism.die();

            if(!organism.dead){
                organism.die();
            }

        }
    },

    //gets executed only once per state- using this code in "step" is wrong, because state's step will fired as long as the model's step gets its own share of time slice
    entered: function (organism) {
        var ecoSystemModel = organism.ecoSystemModel;

        //if it is raining add a Grass organism
        if (ecoSystemModel.isRaining()) {
            var organismInfo = {name:"grass"};
            var newPosition = new Vector2(organism.position.x, organism.position.y);
            var newlyProducedModel = new GrassModel(ecoSystemModel, organismInfo,newPosition, organism.motionBounds, true);
            newlyProducedModel.interactionState = EcoSystemConstants.BEING_PRODUCED_STATE;
            newlyProducedModel.timeElapsedSinceReproduction = 0;
            ecoSystemModel.addNewlyReproducedOrganism(newlyProducedModel); // newly added items are seperatly maintained
            ecoSystemModel.addOrganism(newlyProducedModel);
            newlyProducedModel.setPosition(newPosition.plus(new Vector2(1,1)));


        }
    },

    exit: function (organism) {

    }

});


module.exports = MushroomDyingState;
