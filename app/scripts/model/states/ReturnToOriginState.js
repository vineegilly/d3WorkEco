var inherit = axon.inherit;
var BaseOrganismState = require('./BaseOrganismState');
var Vector2 = dot.Vector2;

function ReturnToOriginState() {
    BaseOrganismState.call(this);
}

inherit(BaseOrganismState, ReturnToOriginState, {

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
        organism.goToRest();
    },

    entered: function (organism) {

    },

    exit: function (organism) {

    }

});


module.exports = ReturnToOriginState;
