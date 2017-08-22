var inherit = axon.inherit;
var BaseOrganismState = require('./BaseOrganismState');
var Vector2 = dot.Vector2;

function PredatingState() {
    BaseOrganismState.call(this);
}

inherit(BaseOrganismState, PredatingState, {

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
        var preyBeingEaten = organism.organismBeingEaten;
        preyBeingEaten.startDying();
        organism.finishEating();
    },

    entered: function (organism) {

    },

    exit: function (organism) {

    }

});

module.exports = PredatingState;
