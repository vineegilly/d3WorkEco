
define( function( require ) {
  'use strict';

  // modules
  var inherit = axon.inherit;
  var ButtonModel = require( './ButtonModel' );



  /**
   * @param {Property} selectorProperty - the property for the RadioButtonGroup that determines which button is selected
   * @param {Object} selectedValue - the value that selectorProperty takes when this particular SingleRadioButton is selected
   * @constructor
   */
  function RadioButtonGroupMemberModel( selectorProperty, selectedValue ) {
    ButtonModel.call( this );

    var thisModel = this;

    this.selectedValue = selectedValue;
    this.selectorProperty = selectorProperty;

    // @public (read only) - fire on up if the button is enabled, public for use in the accessibility tree
    this.fire = function() {
      if ( thisModel.enabled ) {
        thisModel.trigger1( 'startedCallbacksForFired', selectedValue );
        selectorProperty.set( selectedValue );
        thisModel.trigger0( 'endedCallbacksForFired' );
      }
    };
    this.property( 'down' ).onValue( false, function() {
      if ( thisModel.over ) {
        thisModel.fire();
      }
    } );
  }


  return inherit( ButtonModel, RadioButtonGroupMemberModel );
} );