var Color = scenery.Color;
var SimFont = require('../core/SimFont');
var Dimension2 = dot.Dimension2;
var Bounds2 = dot.Bounds2;
var Image = scenery.Image;
var beetle = require("../../assets/images/beetle.png");

var imageNode = new Image(beetle);

var IMAGE_SCALE = 0.1;
imageNode.scale(IMAGE_SCALE);
//console.log(imageNode);


var EcoSystemConstants = {

        GRID_BACKGROUND_COLOR: new Color(255, 255, 255),
        ORGANISM_BACKGROUND_COLOR: new Color(120, 125, 200),
        PLAYER_PANEL_BACKGROUND_COLOR: new Color(239, 239, 195),
        GRID_PANEL_STROKE_COLOR: new Color(100, 100, 100),
        PANEL_TITLE_FONT: new SimFont({family: 'Verdana', size: 16, weight: 'normal'}),
        ANIMATION_VELOCITY: 500,
        PLAY_STEP_DISTANCE: 58.2,
        ORGANISM_RADIUS: 29.1,
        MOVE_APART_DISTANCE: 29.1,
        IMAGE_SCALE: IMAGE_SCALE,
        GRID_NODE_DIMENSION: new Dimension2(450, 370),
        CHART_NODE_DIMENSION: new Dimension2(980,720),
        ORGANISM_PANEL_DIMENSION: new Dimension2(440, 150),
        PARTICLE_COLOR: new Color(255, 0, 0),
        SPRAY_COLOR: new Color(200, 200, 0),
        MAX_ORGANISMS: 150,
        MAX_RIPPLE_FRAMES: 75,
        RAIN_DROP_COUNT: 10,
        DIE_BECAUSE_OF_NO_FOOD: 1,
        SNAPSHOT_CAPTURE_ELAPSE: 500,
        TOTAL_LIFE_SPAN: 12000,
        LOW_QUANTITY:0,
        BOUND_MINX:1,
        BOUND_MINY:1,


        // interaction states
        DYING_STATE: 1,
        EATING_STATE: 2,
        REPRODUCING_STATE: 3,
        BEING_PRODUCED_STATE: 4,
        NON_INTERACTION_STATE: 0,

        MOTION_BOUNDS: Bounds2.NOTHING // set by ecosystem view


    }
    ;

module.exports = EcoSystemConstants;
