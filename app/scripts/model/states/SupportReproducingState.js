var inherit = axon.inherit;
var BaseOrganismState = require('./BaseOrganismState');
var Vector2 = dot.Vector2;

function SupportReproducingState() {
    BaseOrganismState.call(this);
}

inherit(BaseOrganismState, SupportReproducingState, {

    /**
     *
     * @param {OrganismModel} organism
     * @param {number} dt
     */
    step: function (organism, dt) {

    },


    onAnimateMoveEnd: function (organism) {

    },

    entered: function (organism) {

    },

    exit: function (organism) {

    }

});

module.exports = SupportReproducingState;
