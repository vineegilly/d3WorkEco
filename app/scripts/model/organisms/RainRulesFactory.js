var inherit = axon.inherit;
var EcoSystemConstants = require('../../model/EcoSystemConstants');
var OrganismRuleConstants = require('../OrganismRuleConstants');

function RainRulesFactory() {

}

inherit(Object, RainRulesFactory, {},

    //statics
    {


        applyRainReproductionRule: function (ecoSystemModel, organism, dt) {
            if (!organism.canGerminate()) { // apply rain rule only for germinating items
                return;
            }


            if (ecoSystemModel.isRaining()) {
                organism.timeElapsedSinceReproduction += dt * 1000;
                organism.timeElapsedWithoutFood = 0;

                var reproductionElapsedTime = OrganismRuleConstants[organism.name].REPRODUCE_RULE.elapse;
                if (organism.timeElapsedSinceReproduction > reproductionElapsedTime) {
                    organism.germinate();
                    organism.timeElapsedSinceReproduction = 0;
                }
            }
            else {
                organism.timeElapsedWithoutFood += dt * 1000;

                organism.timeElapsedSinceReproduction = 0;
            }
        }
    });

module.exports = RainRulesFactory;
