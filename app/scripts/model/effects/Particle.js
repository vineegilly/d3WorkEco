var inherit = axon.inherit;

function Particle() {

    this.scale = 1.2;
    this.x = 0;
    this.y = 0;
    this.radius = 20;
    this.color = "#000";
    this.velocityX = 0;
    this.velocityY = 0;
    this.scaleSpeed = 300;
}

inherit(Object, Particle, {


    update: function (ms) {
        // shrinking
        this.scale -= this.scaleSpeed * ms;

        if (this.scale <= 0) {
            this.scale = 0;
        }
        // moving away from explosion center
        this.x += this.velocityX * ms;
        this.y += this.velocityY * ms;
    },

    draw: function (context2D) {
        // translating the 2D context to the particle coordinates
        context2D.save();
        context2D.translate(this.x, this.y);
        context2D.scale(this.scale, this.scale);

        // drawing a filled circle in the particle's local space
        // context2D.beginPath();
        // context2D.arc(0, 0, this.radius, 0, Math.PI * 2, true);
        // context2D.closePath();

        context2D.beginPath();
      context2D.moveTo(0, 0);
      context2D.lineTo(20, 40);
      context2D.lineWidth = 2;
      context2D.strokeStyle = 'red';
      context2D.stroke();

      context2D.beginPath();
    context2D.moveTo(0, 40);
    context2D.lineTo(20, 0);
  

    //  context2D.lineTo(10, 10);
    //  context2D.lineTo(420, 150);
    //  context2D.closePath();
      context2D.lineWidth = 2;
      context2D.strokeStyle = 'red';
      context2D.stroke();

        //context2D.fillStyle = this.color;
        //context2D.fill();

        context2D.restore();
    },

    isLive: function () {
        return this.scale > 0;
    }

});

module.exports = Particle;
