var inherit = axon.inherit;
var Dimension2 = dot.Dimension2;
var SimFont = require('../core/SimFont');
var Text = scenery.Text;
var CheckBox = require('../controls/CheckBox');
var EcoSystemConstants = require('../model/EcoSystemConstants');
var BooleanRectangularToggleButton = require('../controls/buttons/BooleanRectangularToggleButton');
var RectangularButtonView = require('../controls/buttons/RectangularButtonView');
var RectangularPushButton = require('../controls/buttons/RectangularPushButton');
var Color = scenery.Color;
var HBox = scenery.HBox;
var Property = axon.Property;
var RAIN_STR = "Rain";
var CHECK_BOX_OPTIONS = {boxWidth: 30};
var CONTROL_TEXT_OPTIONS = {font: new SimFont(20)};

var BUTTON_TEXT_OPTIONS = {font: new SimFont(20)};

var PLAY_STR = "Play";
var PAUSE_STR = "Pause";
var CLEAR_STR = "Clear All";


/**
 *
 * @param playPauseProperty
 * @param onClearPlay
 * @constructor
 */
function PlayerBox(playPauseProperty, rainProperty, onClearPlay) {
    var thisBox = this;

    var playTextNode = new Text(PLAY_STR, BUTTON_TEXT_OPTIONS);
    var pauseTextNode = new Text(PAUSE_STR, BUTTON_TEXT_OPTIONS);
    var clearTextNode = new Text(CLEAR_STR, BUTTON_TEXT_OPTIONS);

    var playerItems = [];

    var playPauseButton = new BooleanRectangularToggleButton(pauseTextNode, playTextNode, playPauseProperty, {
        buttonAppearanceStrategy: RectangularButtonView.threeDAppearanceStrategy,
        xMargin: 24, // should be visibly greater than yMargin, see issue #109
        yMargin: 14,
        baseColor: new Color(239, 239, 195),
        stroke: null,
        lineWidth: 0, // Only meaningful if stroke is non-null
        listener: function () {
            alert('listener');//onClearPlay();
        }
        // listener: function () {
        //     //onClearPlay();
        //     console.log('palyerBox');
        // }
    });

    var options = {
        buttonAppearanceStrategy: RectangularButtonView.threeDAppearanceStrategy,
        xMargin: 24, // should be visibly greater than yMargin, see issue #109
        yMargin: 14,
        baseColor: new Color(239, 239, 195),
        stroke: null,
        content: clearTextNode,
        lineWidth: 0, // Only meaningful if stroke is non-null,
        listener: function () {
            onClearPlay();
        }
    };


    var checkBoxes = [];
    var rainCheckBoxControl = new CheckBox(new Text(RAIN_STR, CONTROL_TEXT_OPTIONS),
        rainProperty, CHECK_BOX_OPTIONS);
    checkBoxes.push(rainCheckBoxControl);
    var checkBoxControlBox = new HBox({
        children: checkBoxes,
        spacing: 20
    });

    var clearButton = new RectangularPushButton(options);

    playerItems.push(checkBoxControlBox);
    playerItems.push(playPauseButton);
    playerItems.push(clearButton);


    HBox.call(thisBox, {
        children: playerItems,
        spacing: 20
    });

    thisBox.scale(0.8);

}

inherit(HBox, PlayerBox, {});


module.exports = PlayerBox;
