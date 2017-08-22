/**
 * Colors that are reused in many places throughout sun.
 */

// modules
var inherit = axon.inherit;
var Color = scenery.Color;

/**
 *
 * @constructor
 */
function ColorConstants() {
}

inherit(Object, ColorConstants, {}, {

    //The default blue color used in many places, for buttons
    LIGHT_BLUE: new Color(153, 206, 255),

    GREEN: new Color(255, 200, 0),

    YELLOW: new Color(255, 255, 0),

    //Light gray, used as the 'disabled' color in many places.
    LIGHT_GRAY: new Color(220, 220, 220)
});


module.exports = ColorConstants;