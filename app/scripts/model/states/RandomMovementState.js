var inherit = axon.inherit;
var BaseOrganismState = require('./BaseOrganismState');
var Vector2 = dot.Vector2;


function RandomMovementState() {
    BaseOrganismState.call(this);
}

inherit(BaseOrganismState, RandomMovementState, {

    /**
     *
     * @param {OrganismModel} organism
     * @param {number} dt
     */
    step: function (organism, dt) {
        var ecoSystemModel = organism.ecoSystemModel;
        if (ecoSystemModel.isPlaying()) {
            this.animateMovementStep(organism, dt);
        }
    },

    onAnimateMoveEnd: function (organism) {
        organism.nextRandomMovement();
    },

    entered: function (organism, dt) {
        organism.nextRandomMovement();
    },

    exit: function (organism) {

    }


})
;


module.exports = RandomMovementState;