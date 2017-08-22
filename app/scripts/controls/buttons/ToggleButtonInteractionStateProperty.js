/**
 * A derived property the maps sticky toggle button model states to the values
 * needed by the button view.
 */


// Imports
var inherit = axon.inherit;
var DerivedProperty = axon.DerivedProperty;

function ToggleButtonInteractionStateProperty( buttonModel ) {
  DerivedProperty.call(
    this,
    [ buttonModel.overProperty, buttonModel.downProperty, buttonModel.enabledProperty ],
    function( over, down, enabled ) {
      return !enabled ? 'disabled' :
             over && !(down ) ? 'over' :
             down ? 'pressed' :
             'idle';
    }
  );
}

inherit( DerivedProperty, ToggleButtonInteractionStateProperty );

module.exports = ToggleButtonInteractionStateProperty;
