var inherit = axon.inherit;
var EcoSystemConstants = require('../EcoSystemConstants');


var BeetleModel = require('../organisms/herbivores/BeetleModel');
var ButterflyModel = require('../organisms/herbivores/ButterflyModel');
var DeerModel = require('../organisms/herbivores/DeerModel');
var RabbitModel = require('../organisms/herbivores/RabbitModel');

var FrogModel = require('../organisms/carnivores/FrogModel');
var HawkModel = require('../organisms/carnivores/HawkModel');
var CoyoteModel = require('../organisms/carnivores/CoyoteModel');
var SnakeModel = require('../organisms/carnivores/SnakeModel');

var EarthwormModel = require('../organisms/decomposers/EarthwormModel');

var MouseModel = require('../organisms/omnivores/MouseModel');
var RaccoonModel = require('../organisms/omnivores/RaccoonModel');
var SongbirdModel = require('../organisms/omnivores/SongbirdModel');

var FlowerModel = require('../organisms/producers/FlowerModel');
var GrassModel = require('../organisms/producers/GrassModel');
var TreeModel = require('../organisms/producers/TreeModel');
var MushroomModel = require('../organisms/producers/MushroomModel');


function OrganismModelFactory() {


}

inherit(Object, OrganismModelFactory, {},
    // statics
    {
        /**
         *
         * @param ecoSystemModel
         * @param organismInfo
         * @param pos
         * @param bounds
         * @returns {*}
         */
        getOrganism: function (ecoSystemModel, organismInfo, pos, bounds) {

            var name = organismInfo.name;
            switch (name) {
                case "beetle":
                    return new BeetleModel(ecoSystemModel, organismInfo, pos, bounds);
                case "butterfly":
                    return new ButterflyModel(ecoSystemModel, organismInfo, pos, bounds);
                case "deer":
                    return new DeerModel(ecoSystemModel, organismInfo, pos, bounds);
                case "rabbit":
                    return new RabbitModel(ecoSystemModel, organismInfo, pos, bounds);


                case "frog":
                    return new FrogModel(ecoSystemModel, organismInfo, pos, bounds);
                case "hawk":
                    return new HawkModel(ecoSystemModel, organismInfo, pos, bounds);
                case "coyote":
                    return new CoyoteModel(ecoSystemModel, organismInfo, pos, bounds);
                case "snake":
                    return new SnakeModel(ecoSystemModel, organismInfo, pos, bounds);

                case "earthworm":
                    return new EarthwormModel(ecoSystemModel, organismInfo, pos, bounds);
                case "mushroom":
                    return new MushroomModel(ecoSystemModel, organismInfo, pos, bounds);

                case "mouse":
                    return new MouseModel(ecoSystemModel, organismInfo, pos, bounds);
                case "raccoon":
                    return new RaccoonModel(ecoSystemModel, organismInfo, pos, bounds);
                case "songbird":
                    return new SongbirdModel(ecoSystemModel, organismInfo, pos, bounds);

                case "flower":
                    return new FlowerModel(ecoSystemModel, organismInfo, pos, bounds);
                case "grass":
                    return new GrassModel(ecoSystemModel, organismInfo, pos, bounds);
                case "tree":
                    return new TreeModel(ecoSystemModel, organismInfo, pos, bounds);


            }
        }
    });

module.exports = OrganismModelFactory;
