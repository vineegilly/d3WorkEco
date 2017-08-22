var inherit = axon.inherit;

var beetle = require("../../../assets/images/beetle.png");
var grass = require("../../../assets/images/grass.png");
var earthworm = require("../../../assets/images/earthworm.png");
var flower = require("../../../assets/images/flower.png");
var hawk = require("../../../assets/images/hawk.png");
var mushroom = require("../../../assets/images/mushroom.png");
var snake = require("../../../assets/images/snake.png");
var tree = require("../../../assets/images/tree.png");
var mouse = require("../../../assets/images/mouse.png");
var butterfly = require("../../../assets/images/butterfly.png");
var raccoon = require("../../../assets/images/raccoon.png");
var deer = require("../../../assets/images/deer.png");
var rabbit = require("../../../assets/images/rabbit.png");
var coyote = require("../../../assets/images/coyote.png");
var frog = require("../../../assets/images/frog.png");
var songbird = require("../../../assets/images/bird.png");

var organismIdImageMap = {};

function OrganismImageCollection() {


}

inherit(Object, OrganismImageCollection, {},
    //statics
    {


        loadImages: function () {

// constants
            var beetle = require("../../../assets/images/beetle.png");
            var grass = require("../../../assets/images/grass.png");
            var earthworm = require("../../../assets/images/earthworm.png");
            var flower = require("../../../assets/images/flower.png");
            var hawk = require("../../../assets/images/hawk.png");
            var mushroom = require("../../../assets/images/mushroom.png");
            var snake = require("../../../assets/images/snake.png");
            var tree = require("../../../assets/images/tree.png");
            var mouse = require("../../../assets/images/mouse.png");
            var butterfly = require("../../../assets/images/butterfly.png");
            var raccoon = require("../../../assets/images/raccoon.png");
            var deer = require("../../../assets/images/deer.png");
            var rabbit = require("../../../assets/images/rabbit.png");
            var coyote = require("../../../assets/images/coyote.png");
            var frog = require("../../../assets/images/frog.png");
            var songbird = require("../../../assets/images/bird.png");

            organismIdImageMap = {
                beetle: beetle,
                grass: grass,
                earthworm: earthworm,
                flower: flower,
                hawk: hawk,
                mushroom: mushroom,
                snake: snake,
                tree: tree,
                mouse: mouse,
                butterfly: butterfly,
                raccoon: raccoon,
                deer: deer,
                rabbit: rabbit,
                coyote: coyote,
                frog: frog,
                songbird: songbird
            };

        },
        /**
         *
         * @param name
         * @returns {Image}
         */
        getRepresentation: function (name) {
            return organismIdImageMap[name];
        }
    });

module.exports = OrganismImageCollection;

