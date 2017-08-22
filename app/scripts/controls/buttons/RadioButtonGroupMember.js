define(function (require) {
    'use strict';

    var Input = scenery.Input;
    var inherit = axon.inherit;
    var Color = scenery.Color;
    var ColorConstants = require( './ColorConstants' );

    var RectangularButtonView = require('./RectangularButtonView');
    var RadioButtonGroupAppearance = require('./RadioButtonGroupAppearance');
    var RadioButtonGroupMemberModel = require('./RadioButtonGroupMemberModel');
    var RadioButtonInteractionStateProperty = require('./RadioButtonInteractionStateProperty');


    /**
     * @param {Property} property axon property that can take on a set of values, one for each radio button in the group
     * @param {Object} value value when this radio button is selected
     * @param {Object} [options]
     * @constructor
     */
    function RadioButtonGroupMember(property, value, options) {

        var self = this;

        options = _.extend({
            // The fill for the rectangle behind the radio buttons.  Default color is bluish color, as in the other button library.
            baseColor: ColorConstants.LIGHT_BLUE,
            disabledBaseColor: ColorConstants.LIGHT_GRAY,

            // Opacity can be set separately for the buttons and button content.
            selectedButtonOpacity: 1,
            deselectedButtonOpacity: 0.6,
            selectedContentOpacity: 1,
            deselectedContentOpacity: 0.6,
            overButtonOpacity: 0.8,
            overContentOpacity: 0.8,

            selectedStroke: 'black',
            deselectedStroke: new Color(50, 50, 50),
            selectedLineWidth: 1.5,
            deselectedLineWidth: 1,

            // The following options specify highlight behavior overrides, leave as null to get the default behavior
            // Note that highlighting applies only to deselected buttons
            overFill: null,
            overStroke: null,
            overLineWidth: null,

            // The default appearances use the color values specified above, but other appearances could be specified for more
            // customized behavior.  Generally setting the color values above should be enough to specify the desired look.
            buttonAppearanceStrategy: RadioButtonGroupAppearance.defaultRadioButtonsAppearance,
            contentAppearanceStrategy: RadioButtonGroupAppearance.contentAppearanceStrategy,

            // invisible label for the radio button group member for accessibility
            accessibleLabel: ''
        }, options);

        // @public (together)
        this.radioButtonGroupMemberModel = new RadioButtonGroupMemberModel(property, value);

        // @public for use in RadioButtonGroup for managing the labels
        this.interactionStateProperty = new RadioButtonInteractionStateProperty(this.radioButtonGroupMemberModel);

        RectangularButtonView.call(this, this.radioButtonGroupMemberModel, this.interactionStateProperty, options);

        // @public (tandem) - for Tandem support, should be a novel name to reduce the risk of parent or child collisions
        this.radioButtonGroupMemberTandem = options.tandem;
        this.radioButtonGroupMemberTandem && this.radioButtonGroupMemberTandem.addInstance(this);

    }


    return inherit(RectangularButtonView, RadioButtonGroupMember, {

        // @public
        dispose: function () {
            this.radioButtonGroupMemberTandem && this.radioButtonGroupMemberTandem.removeInstance(this);
        }
    });
});