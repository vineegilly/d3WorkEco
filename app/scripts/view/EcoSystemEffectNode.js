// modules
var inherit = axon.inherit;
var CanvasNode = scenery.CanvasNode;
var ObservableArray = axon.ObservableArray;
var ParticleExplosionBuilder = require( '../model/effects/ParticleExplosionBuilder' );
var SprayParticlesBuilder = require( '../model/effects/SprayParticlesBuilder' );
var EcoSystemConstants = require( '../model/EcoSystemConstants' );
var RippleCirlce = require( '../model/effects/RippleCircle' );
var RainDropParticles = require( '../model/effects/RainDropParticles' );

// Applies different effects based on the state of Organisms
/**
 *
 * @param {EcoSystemModel} ecoSystemModel
 * @param options
 * @constructor
 */
function EcoSystemEffectNode( ecoSystemModel, bounds ) {
  var thisNode = this;
  this.dyingParticleCollection = new ObservableArray();
  this.newlyReproducedRippleCollection = new ObservableArray();
  this.rainDropParticles = new RainDropParticles( EcoSystemConstants.RAIN_DROP_COUNT, bounds );
  this.ecoSystemModel = ecoSystemModel;
  this.sprayParticlesBuilder = new SprayParticlesBuilder( ecoSystemModel );

  this.frameDelay = 0;
  CanvasNode.call( this, { pickable: false, canvasBounds: bounds, layerSplit: true } );

  function handleOrganismDying( addedOrganismModel ) {
    var position = addedOrganismModel.position;


    var dyingParticles = ParticleExplosionBuilder.buildParticles( position.x, position.y, EcoSystemConstants.PARTICLE_COLOR );
    thisNode.dyingParticleCollection.add( dyingParticles );

    ecoSystemModel.dyingModels.addItemRemovedListener( function removalListener( removedOrganismModel ) {
      if ( removedOrganismModel === addedOrganismModel ) {
        thisNode.dyingParticleCollection.remove( dyingParticles );
        ecoSystemModel.dyingModels.removeItemRemovedListener( removalListener );
      }
    } );
  }

  ecoSystemModel.dyingModels.addItemAddedListener( handleOrganismDying );


  function handleNewlyReproducedOrganism( addedOrganismModel ) {
    var position = addedOrganismModel.position;
    var rippleCircle = new RippleCirlce( position, EcoSystemConstants.ORGANISM_RADIUS * 2,
        EcoSystemConstants.MAX_RIPPLE_FRAMES, function onComplete() {
      ecoSystemModel.removeNewlyReproducedOrganism( addedOrganismModel );
    } );

    thisNode.newlyReproducedRippleCollection.add( rippleCircle );

    ecoSystemModel.newlyReproducedModels.addItemRemovedListener( function removalListener( removedOrganismModel ) {
      if ( removedOrganismModel === addedOrganismModel ) {
        thisNode.newlyReproducedRippleCollection.remove( rippleCircle );
        ecoSystemModel.newlyReproducedModels.removeItemRemovedListener( removalListener );
      }
    } );
  }

  ecoSystemModel.newlyReproducedModels.addItemAddedListener( handleNewlyReproducedOrganism );


  this.invalidatePaint();
}

inherit( CanvasNode, EcoSystemEffectNode, {

  // @param {CanvasContextWrapper} wrapper
  paintCanvas: function( wrapper ) {
    var context = wrapper.context;
    var self = this;

    this.dyingParticleCollection.forEach( function( particles ) {
      // update and draw particles
      for ( var i = 0; i < particles.length; i++ ) {
        var particle = particles[ i ];
        particle.update( self.frameDelay );
        particle.draw( context );
      }
    } );

    this.newlyReproducedRippleCollection.forEach( function( rippleCircle ) {
      self.drawRipples( context, rippleCircle );
    } );

    this.drawRainDrops( context );

  },

  drawRainDrops: function( context ) {
    if ( this.ecoSystemModel.isRaining() ) {
      this.rainDropParticles.draw( context );
    }
  },

  step: function( dt ) {
    this.frameDelay = dt;
   // this.generateSprayParticles();
    this.invalidatePaint();
  },


  drawPesticideSpray: function() {
  },


  /**
   *
   * @param ctx
   */
  drawRipples: function( ctx, ripple ) {
    var width = ripple.radius;
    var height = ripple.radius;
    var frame = ripple.frame;
    var center = ripple.center;
    ripple.incrementFrame();
    for ( var i = 0; i < width; ++i ) {
      ctx.strokeStyle = i % 20 === 0 ? 'hsl(hue, 100%, 20%)'.replace( 'hue',
        90
      ) : 'rgba(0, 0, 0, .08)';
      ctx.beginPath();
      ctx.arc( center.x, center.y, (i + frame) % width / 2, 0, Math.PI * 2 );
      ctx.stroke();
      ctx.closePath();
    }
  }


} );


module.exports = EcoSystemEffectNode;
