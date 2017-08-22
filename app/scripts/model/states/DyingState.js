var inherit = axon.inherit;
var BaseOrganismState = require('./BaseOrganismState');
var Vector2 = dot.Vector2;

/**
 * DyingState is differentiated fron naturally expiring state (since the effect needs to be different)
 * @constructor
 */
function DyingState() {
    BaseOrganismState.call(this);
}

inherit(BaseOrganismState, DyingState, {

    /**
     *
     * @param {OrganismModel} organism
     * @param {number} dt
     */
    step: function (organism, dt) {
        organism.opacity = Math.max(0, Math.min(organism.opacity - 0.25, 1));
        if (organism.opacity <= 0) {
            if(!organism.dead){
                organism.die();
            }
        }
    },

    entered: function (organism) {
            if(organism.name == 'mushroom')
            console.log(organism);
            //console.log(ecoSystemModel.isRaining());
            //organism.canReproduce();
    },

    exit: function (organism) {

    }

});


module.exports = DyingState;
