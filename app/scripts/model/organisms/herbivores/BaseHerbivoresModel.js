/**
 * Model common for Grass,Flower and Tree
 */
var inherit = axon.inherit;
var BaseOrganismModel = require('../BaseOrganismModel');

/**
 * @param {EcoSystemModel} ecoSystemModel
 * @param {jsonObject} organismInfo
 * @param {Vector2} initialPosition
 * @param {Bounds2} bounds
 * @constructor
 */
function BaseHerbivoresModel(ecoSystemModel, organismInfo, initialPosition, bounds, createdThroughInteraction) {
    BaseOrganismModel.call(this, ecoSystemModel, organismInfo, initialPosition, bounds, createdThroughInteraction);

}

inherit(BaseOrganismModel, BaseHerbivoresModel, {

    /**
     * @override
     * @param dt
     */
    doStep: function (dt) {


    },


    initState: function () {
        this.goToRest();
    },

    getTimeThresholdForPoison: function () {
        return 0;
    }


});

module.exports = BaseHerbivoresModel;