var inherit = axon.inherit;
var BaseOrganismState = require('./BaseOrganismState');
var Vector2 = dot.Vector2;
var EcoSystemConstants = require('../../model/EcoSystemConstants');

function ReproducingState() {
    BaseOrganismState.call(this);
}

inherit(BaseOrganismState, ReproducingState, {

    /**
     *
     * @param {OrganismModel} organism
     * @param {number} dt
     */
    step: function (organism, dt) {

        if (!organism.userControlled) {
            this.animateMovementStep(organism, dt);
        }
    },

    onAnimateMoveEnd: function (organism) {
        var organismReproducingWith = organism.organismReproducingWith;
        organism.reproduceWith(organismReproducingWith);
        organismReproducingWith.finishReproducing();
        organism.finishReproducing();
    },

    entered: function (organism) {

    },

    exit: function (organism) {

    }

});

module.exports = ReproducingState;
