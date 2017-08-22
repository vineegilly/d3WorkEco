var inherit = axon.inherit;
var Particle = require('./Particle');


function ParticleExplosionBuilder() {

}

inherit(Object, ParticleExplosionBuilder, {},

    // statics
    {
        /*
         * Advanced Explosion effect
         * Each particle has a different size, move speed and scale speed.
         *
         * Parameters:
         * 	x, y - explosion center
         * 	color - particles' color
         */
        buildParticles: function (x, y, color) {
            var minSize = 0;
            var maxSize = 1;
            var count = 1;
            var minSpeed = 60.0;
            var maxSpeed = 200.0;
            var minScaleSpeed = 1.0;
            var maxScaleSpeed = 4.0;

            var particles = [];

            var canvasColor = color.toCSS();

            for (var angle = 0; angle < 360; angle += Math.round(360 / count)) {
                var particle = new Particle();

                particle.x = x;
                particle.y = y;

                particle.radius = this.randomFloat(minSize, maxSize);

                particle.color = canvasColor;

                particle.scaleSpeed = this.randomFloat(minScaleSpeed, maxScaleSpeed);

                var speed = this.randomFloat(minSpeed, maxSpeed);

                particle.velocityX = speed * Math.cos(angle * Math.PI / 180.0);
                particle.velocityY = speed * Math.sin(angle * Math.PI / 180.0);

                particles.push(particle);
            }

            return particles;
        },

        /**
         *
         * @param {number} min
         * @param max
         * @returns {*}
         */
        randomFloat: function (min, max) {
            return min + Math.random() * (max - min);
        }

    });

module.exports = ParticleExplosionBuilder;
