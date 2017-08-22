var inherit = axon.inherit;
var BaseOrganismState = require('./BaseOrganismState');


function StillnessState() {

}

inherit(BaseOrganismState, StillnessState, {

    /**
     *
     * @param {OrganismModel} organism
     * @param {number} dt
     */
    step: function (organism, dt) {

    },

    entered: function (organism, dt) {

    },

    exit: function (organism) {

    }


});


module.exports = StillnessState;