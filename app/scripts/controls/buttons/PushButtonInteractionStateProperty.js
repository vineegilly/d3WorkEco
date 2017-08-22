// modules
var inherit = axon.inherit;
var DerivedProperty = axon.DerivedProperty;

function PushButtonInteractionStateProperty( buttonModel, options ) {
  DerivedProperty.call(
    this,
    [ buttonModel.overProperty, buttonModel.downProperty, buttonModel.enabledProperty ],
    function( over, down, enabled ) {
      return !enabled ? 'disabled' :
             over && !down ? 'over' :
             over && down ? 'pressed' :
             'idle';
    }, options );
}

inherit( DerivedProperty, PushButtonInteractionStateProperty );

module.exports = PushButtonInteractionStateProperty;


