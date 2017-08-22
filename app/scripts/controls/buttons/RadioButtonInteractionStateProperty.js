
define( function( require ) {
  'use strict';

  // modules
  var DerivedProperty = axon.DerivedProperty;
    var inherit = axon.inherit;


  /**
   * @param {ButtonModel} buttonModel
   * @constructor
   */
  function RadioButtonInteractionStateProperty( buttonModel ) {
    DerivedProperty.call(
      this,
      [ buttonModel.overProperty, buttonModel.downProperty, buttonModel.enabledProperty, buttonModel.selectorProperty ],
      function( over, down, enabled, propertyValue ) {
        var isSelected = ( propertyValue === buttonModel.selectedValue );
        return !enabled && isSelected ? 'disabled-selected' :
               !enabled ? 'disabled-deselected' :
               over && !(down || isSelected) ? 'over' :
               over && down ? 'pressed' :
               isSelected ? 'selected' :
               'deselected';
      } );
  }


  return inherit( DerivedProperty, RadioButtonInteractionStateProperty );
} );