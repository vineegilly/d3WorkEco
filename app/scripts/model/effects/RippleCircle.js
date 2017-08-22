var inherit = axon.inherit;

function RippleCircle(center, radius, maxFrames, onComplete) {
    this.center = center;
    this.radius = radius;
    this.frame = 0;
    this.maxFrames = maxFrames;
    this.onComplete = onComplete;

}


inherit(Object, RippleCircle, {

    incrementFrame: function () {
        this.frame++;
        if (this.frame > this.maxFrames) {
            this.onComplete();
        }
    }


});


module.exports = RippleCircle;





