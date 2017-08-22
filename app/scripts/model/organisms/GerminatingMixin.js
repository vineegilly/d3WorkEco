var OrganismRuleConstants = require('../OrganismRuleConstants');
var EcoSystemConstants = require('../EcoSystemConstants');
var Vector2 = dot.Vector2;

var GerminatingMixin = {


    /**
     * @override
     * @returns {boolean}
     */
    canGerminate: function () {
        return true;
    },

    canReproduce: function () {
        return false;
    },

    germinate: function () {
        var noOfOffSpringToProduce = OrganismRuleConstants[this.name].REPRODUCE_RULE.offspring;

        for (var i = 0; i < noOfOffSpringToProduce; i++) {
            var newlyProducedModel = this.ecoSystemModel.cloneOrganism(this,
                new Vector2(this.position.x, this.position.y), EcoSystemConstants.BEING_PRODUCED_STATE, true);
            newlyProducedModel.timeElapsedSinceReproduction = 0;
            var clonePoint = this.position.plus(new Vector2(40, 40));
            var newPos = this.motionBounds.closestPointTo(clonePoint);
            newlyProducedModel.setPosition(newPos);
            this.ecoSystemModel.addNewlyReproducedOrganism(newlyProducedModel);
        }
    }
};

module.exports = GerminatingMixin;