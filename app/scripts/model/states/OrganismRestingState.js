var inherit = axon.inherit;
var BaseOrganismState = require('./BaseOrganismState');

function OrganismRestingState() {

}

inherit(BaseOrganismState, OrganismRestingState, {

    /**
     *
     * @param {OrganismModel} organism
     * @param {number} dt
     */
    step: function (organism, dt) {

    },

    entered: function (organism) {

    },

    exit: function (organism) {

    }

});


module.exports = OrganismRestingState;
