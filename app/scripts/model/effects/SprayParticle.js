var inherit = axon.inherit;
var Particle = require('./Particle');
var Vector2 = dot.Vector2;
var EcoSystemConstants = require('../EcoSystemConstants');

/**
 *
 * @param {number} x
 * @param {number} y
 * @param {number} velocityX
 * @param {number} velocityY
 * @param {number} targetDistance
 * @constructor
 */
function SprayParticle(startPoint, endPoint, color, velocity) {

    this.position = startPoint;
    this.destination = endPoint;
    this.color = color;
    this.velocity = velocity;
    this.animating = true;

}


inherit(Object, SprayParticle, {

    update: function (dt) {
        var distanceToDestination = this.position.distance(this.destination);

        if (distanceToDestination > dt * this.velocity) {
            // Move a step toward the destination.
            var stepAngle = Math.atan2(this.destination.y - this.position.y, this.destination.x - this.position.x);
            var stepVector = Vector2.createPolar(this.velocity * dt, stepAngle);
            this.position = this.position.plus(stepVector);
        }
        else if (this.animating) {
            // Less than one time step away, so just go to the destination.
            this.position = this.destination;
            this.animating = false;
        }
    },

    draw: function (context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.radius, this.radius);
    },

    canBeRemoved: function () {
        return !this.animating;
    }

});


module.exports = SprayParticle;