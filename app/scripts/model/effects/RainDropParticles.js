var inherit = axon.inherit;
var rainDropImage = require("../../../assets/images/raindrop.png");

function RainDropParticles(noOfDrops, bounds) {
    this.noOfDrops = noOfDrops;
    this.bounds = bounds;
    this.fallingDrops = [];
    this.generateDrops();
    this.imageInstance = document.createElement("img");

    this.imageInstance.src = rainDropImage;
}

inherit(Object, RainDropParticles, {

    /**
     *
     */
    generateDrops: function () {
        this.fallingDrops = [];

        for (var i = 0; i < this.noOfDrops; i++) {
            var fallingDr = {};
            fallingDr["x"] = _.random(this.bounds.minX + 25, this.bounds.maxX - 25);
            fallingDr["y"] = 5 + Math.random() * 5;
            fallingDr["speed"] = 3 + Math.random() * 5;
            this.fallingDrops.push(fallingDr);
        }
    },

    /**
     *
     * @param ctx
     */
    draw: function (ctx) {
        var fallingDrops = this.fallingDrops;
        for (var i = 0; i < this.noOfDrops; i++) {
            ctx.drawImage(this.imageInstance, fallingDrops[i].x, fallingDrops[i].y); //The rain drop
            fallingDrops[i].y += fallingDrops[i].speed; //Set the falling speed
            if (fallingDrops[i].y > this.bounds.maxY - 25) {  //Repeat the raindrop when it falls out of view
                fallingDrops[i].y = -25; //Account for the image size
                fallingDrops[i].x = _.random(this.bounds.minX, this.bounds.maxX);   //Make it appear randomly along the width
            }

        }
    }
});

module.exports = RainDropParticles;