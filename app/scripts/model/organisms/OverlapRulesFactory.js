var inherit = axon.inherit;
var EcoSystemConstants = require('../../model/EcoSystemConstants');

function OverlapRulesFactory() {

}


inherit(Object, OverlapRulesFactory, {},

    // statics
    {
        applyOverlapRules: function (organism1, organism2) {
            if (organism1 === organism2) {
                return;
            }

            if (organism1.isInAnimate()) {
                return;
            }
            if (!organism1.canInteract() || !organism2.canInteract()) {
                return;
            }

            var preyPredatorOverlapResult = this.checkForPreyPredatorRule(organism1, organism2);
            if (preyPredatorOverlapResult.prey && preyPredatorOverlapResult.predator) {
                this.preyOverlapWithPredator(preyPredatorOverlapResult.prey, preyPredatorOverlapResult.predator);
                return;
            }

            var reproduceRule = this.checkForReproductionRule(organism1, organism2);
            if (reproduceRule.partner1) {
                this.reproduce(reproduceRule.partner1, reproduceRule.partner2);
            }

        },

        checkForPreyPredatorRule: function (organism1, organism2) {
            var preyPredatorOverlapResult = {};
            if (organism1.isPrey(organism2)) {
                preyPredatorOverlapResult["prey"] = organism1;
                preyPredatorOverlapResult["predator"] = organism2;
                return preyPredatorOverlapResult;
            }
            if (organism1.isPredator(organism2)) {
                preyPredatorOverlapResult["predator"] = organism1;
                preyPredatorOverlapResult["prey"] = organism2;
                return preyPredatorOverlapResult;
            }

            return preyPredatorOverlapResult;
        },

        checkForReproductionRule: function (organism1, organism2) {
            var reproductionRuleResult = {};

            // only same items can reproduce
            if (organism1.name === organism2.name) {

                //min time must have been elapsed
                if (organism1.canReproduce() && organism2.canReproduce()) {

                    // they must  overlap
                    if (organism1.overlapBounds(organism2)) {
                        reproductionRuleResult["partner1"] = organism1;
                        reproductionRuleResult["partner2"] = organism2;
                    }
                }

            }
            return reproductionRuleResult;
        },

        preyOverlapWithPredator: function (prey, predator) {
            if (predator.canPredate()) {
                if (prey.overlapBounds(predator)) {
                    predator.startPredating(prey);
                }
            }
        },

        reproduce: function (organism1, organism2) {
            if (organism1.ecoSystemModel.reachedLimit()) {
                return;
            }
            if (organism1.canReproduce() && organism2.canReproduce()) {
                if (organism1.overlapBounds(organism2)) {
                    organism1.startReproducing(organism2);
                }
            }
        }

    });

module.exports = OverlapRulesFactory;