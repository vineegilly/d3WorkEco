var inherit = axon.inherit;
var EcoSystemConstants = require('../EcoSystemConstants');
var Vector2 = dot.Vector2;
var SprayParticle = require('./SprayParticle');

// constants
var SPRAY_DISTANCE = 30;
var SPRAY_PARTICLES_COUNT = 10;

function SprayParticlesBuilder(ecoSystemModel) {
    this.ecoSystemModel = ecoSystemModel;
    this.sprayObjectIdCollection = {};
    this.sprayColor = EcoSystemConstants.SPRAY_COLOR.toCSS();
}


inherit(Object, SprayParticlesBuilder, {

    updateSprayParticles: function () {
        var self = this;
        if (this.ecoSystemModel.isPlaying() && this.ecoSystemModel.isSpraying()) {
            var newSprayObjectIdCollection = {};
            var organismModels = this.ecoSystemModel.getSprayableModels();
            organismModels.forEach(function (organismModel) {
                newSprayObjectIdCollection[organismModel.objectId] = self.generateNewSprayParticles(organismModel);
            });

            var modelIds = _.keys(this.sprayObjectIdCollection);

            _.each(modelIds, function (key) {
                if (newSprayObjectIdCollection[key]) {
                    // if the new key doesnt have entry, it means the object  no longer exsts, so remove the sprayObject Collection
                    this.sprayObjectIdCollection[key] = [];
                }
                else {
                    this.sprayObjectIdCollection[key] = this.sprayObjectIdCollection[key].concat(newSprayObjectIdCollection[key]);
                }
            })
        }
        else {
            this.sprayObjectIdCollection = {};
        }

    },

    /**
     *
     * @param organismModel
     * @returns {Array}
     */
    generateNewSprayParticles: function (organismModel) {
        var sprayParticles = [];
        var startPoint = organismModel.position.plus(new Vector2(0, -SPRAY_DISTANCE));
        var velocity = _.random(EcoSystemConstants.ANIMATION_VELOCITY / 4, EcoSystemConstants.ANIMATION_VELOCITY);

        var basePoint = new Vector2(SPRAY_DISTANCE, 0);
        for (var i = 0; i < SPRAY_PARTICLES_COUNT; i++) {
            var angle = _.random(45, 145) * (180 / Math.PI);
            var rotatedPoint = basePoint.rotated(angle);
            var endPoint = startPoint.plus(rotatedPoint);
            sprayParticles.push(new SprayParticle(startPoint, endPoint, this.sprayColor, velocity));
        }

        return sprayParticles;

    }

});


module.exports = SprayParticlesBuilder;