var inherit = axon.inherit;
var Text = scenery.Text;
var EcoSystemConstants = require('../model/EcoSystemConstants');

var RadioButtonGroup = require('../controls/buttons/RadioButtonGroup');
var SimFont = require('../core/SimFont');
var HBox = scenery.HBox;
var Color = scenery.Color;
var Property = axon.Property;
var RADIO_BUTTON_TEXT_OPTIONS = {font: new SimFont({family: 'Futura', size: 12, weight: 'bold'})};
var ColorConstants = require('../controls/buttons/ColorConstants');

var HIGH_STR = "H";
var MEDIUM_STR = "M";
var NONE_STR = "N";

/**
 *
 * @param quantityProperty
 * @constructor
 */
function QuantitySelectionBox(quantityProperty) {
    var thisBox = this;
    var radioButtonFont = RADIO_BUTTON_TEXT_OPTIONS.font;
    var quantityRadioButtonContent = [
        {value: 20, color: Color.GREEN, node: new Text(HIGH_STR, {font: radioButtonFont})},
        {value: 10, color: Color.ORANGE, node: new Text(MEDIUM_STR, {font: radioButtonFont})},
        {value: EcoSystemConstants.LOW_QUANTITY, color: Color.CYAN, node: new Text(NONE_STR, {font: radioButtonFont})}

    ];

    var quantityRadioGroup = new RadioButtonGroup(quantityProperty, quantityRadioButtonContent, {
        orientation: 'horizontal',
        selectedLineWidth: 4,
        spacing: 5,
        selectedStroke:'red'
    });

    HBox.call(thisBox, {
        children: [quantityRadioGroup],
        spacing: 1
    });


}

inherit(HBox, QuantitySelectionBox, {});

module.exports = QuantitySelectionBox;
