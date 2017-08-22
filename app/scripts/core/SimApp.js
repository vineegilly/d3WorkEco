// modules
var inherit = axon.inherit;
var Shape = kite.Shape;
var Node = scenery.Node;
var Display = scenery.Display;
var Input = scenery.Input;
var PropertySet = axon.PropertySet;
var Bounds2 = dot.Bounds2;
var Dimension2 = dot.Dimension2;
var Util = scenery.Util;
var ObservableArray = axon.ObservableArray;
var Rectangle = scenery.Rectangle;
var ButtonListener = scenery.ButtonListener;


var Timer = require('./Timer');

// constants
var LAYOUT_BOUNDS = new Bounds2(0, 0, 980, 604);

/**
 *
 * @param {TitleName} titleName
 * @param {Screen} screen
 * @param options
 * @constructor
 */
function SimApp(titleName, screen, simId, options) {
    var sim = this;
    PropertySet.call(sim, {});

    window.sim = this;


    // update our scale and bounds properties after other changes (so listeners can be fired after screens are resized)
    this.scale = 1;
    this.bounds = new Bounds2(0, 0, 1, 1); // just place holder values
    this.screenBounds = new Bounds2(0, 0, 1, 1);

    //A screen is made up of Model and View (where View is a ScreenView - (just as Node, but has additional layout related functionality)
    sim.model = screen.createModel();
    sim.view = screen.createView(sim.model);
    sim.rootNode = new Node();
    //sim.rootNode.translate(0, -100);

    sim.rootNode.addChild(sim.view);
    sim.display = new Display(sim.rootNode, options);

    var simDiv = sim.display.domElement;
    simDiv.id = simId + "-sim";

    $("#" + simId).append(simDiv);

    window.simId = simDiv.id;

    // document.body.appendChild( simDiv );

    // for preventing Safari from going to sleep. see https://github.com/phetsims/joist/issues/140
    var heartbeatDiv = this.heartbeatDiv = document.createElement('div');
    heartbeatDiv.style.opacity = 0;
    document.body.appendChild(heartbeatDiv);
    sim.heartbeatDiv = heartbeatDiv;

    sim.display.initializeWindowEvents({batchDOMEvents: false});

    // number of animation frames that have occurred
    sim.frameCounter = 0;

    // layer for popups, dialogs, and their backgrounds and barriers
    sim.topLayer = new Node({renderer: 'svg'});
    sim.rootNode.addChild(this.topLayer);

    // Semi-transparent black barrier used to block input events when a dialog (or other popup) is present, and fade
    // out the background.
    this.barrierStack = new ObservableArray();
    this.barrierRectangle = new Rectangle(0, 0, 1, 1, 0, 0, {
        fill: 'rgba(0,0,0,0.3)',
        pickable: true
    });
    this.topLayer.addChild(this.barrierRectangle);
    this.barrierStack.lengthProperty.link(function (numBarriers) {
        sim.barrierRectangle.visible = numBarriers > 0;
    });
    this.barrierRectangle.addInputListener(new ButtonListener({
        fire: function (event) {
            assert && assert(sim.barrierStack.length > 0);
            sim.hidePopup(sim.barrierStack.get(sim.barrierStack.length - 1), true);
        }
    }));

    this.active = true;
    this.destroyed = false;

    $('title').html(titleName);

    // Fit to the window and render the initial scene
    $(window).resize(function () {
        sim.resizeToWindow();
    });
    sim.resizeToWindow();
}

inherit(PropertySet, SimApp, {
    /*
     * Adds a popup in the global coordinate frame, and optionally displays a semi-transparent black input barrier behind it.
     * Use hidePopup() to remove it.
     * @param {Node} node
     * @param {boolean} isModal - Whether to display the semi-transparent black input barrier behind it.
     */
    showPopup: function (node, isModal) {
        if (isModal) {
            this.barrierStack.push(node);
        }
        this.topLayer.addChild(node);

        Input.pushFocusContext(node.getTrails()[0]);
    },

    /*
     * Hides a popup that was previously displayed with showPopup()
     * @param {Node} node
     * @param {boolean} isModal - Whether the previous popup was modal (or not)
     */
    hidePopup: function (node, isModal) {

        if (isModal) {
            this.barrierStack.remove(node);
        }
        Input.popFocusContext(node.getTrails()[0]);

        this.topLayer.removeChild(node);
    },

    resizeToWindow: function () {
      console.log('simApp');
        //  this.resize(this.sceneWidth, this.sceneHeight);
        this.resize(window.innerWidth, window.innerHeight);
    },

    resize: function (width, height) {
        var sim = this;

        var scale = Math.min(width / LAYOUT_BOUNDS.width, height / LAYOUT_BOUNDS.height);

        this.barrierRectangle.rectWidth = width;
        this.barrierRectangle.rectHeight = height;

        sim.display.setSize(new Dimension2(width, height));

        var screenHeight = height;

        // Layout the view
        sim.view.layout(width, screenHeight);

        // Startup can give spurious resizes (seen on ipad), so defer to the animation loop for painting

        sim.display._input.eventLog.push('scene.display.setSize(new dot.Dimension2(' + width + ',' + height + '));');

        // Fixes problems where the div would be way off center on iOS7
        // TODO
        /* if ( platform.mobileSafari ) {
         window.scrollTo( 0, 0 );
         }*/

        // update our scale and bounds properties after other changes (so listeners can be fired after screens are resized)
        this.scale = scale;
        this.bounds = new Bounds2(0, 0, 2*width, 2*height);
        this.screenBounds = new Bounds2(0, 0, 2*width, 2*screenHeight);

        this.trigger('resized', this.bounds, this.screenBounds, this.scale);
    },

    start: function () {
        //Keep track of the previous time for computing dt, and initially signify that time hasn't been recorded yet.
        var lastTime = -1;

        var sim = this;
        //Make sure requestAnimationFrame is defined
        Util.polyfillRequestAnimationFrame();

        // place the rAF *before* the render() to assure as close to 60fps with the setTimeout fallback.
        //http://paulirish.com/2011/requestanimationframe-for-smart-animating/
        (function animationLoop() {
            var dt;

            sim.profiler && sim.profiler.frameStarted();

            // increment this before we can have an exception thrown, to see if we are missing frames
            sim.frameCounter++;

            if (!sim.destroyed) {
                window.requestAnimationFrame(animationLoop);
            }

            // prevent Safari from going to sleep, see https://github.com/phetsims/joist/issues/140
            if (sim.frameCounter % 1000 === 0) {
                sim.heartbeatDiv.innerHTML = Math.random();
            }

            //Compute the elapsed time since the last frame, or guess 1/60th of a second if it is the first frame
            var time = Date.now();
            var elapsedTimeMilliseconds = (lastTime === -1) ? (1000.0 / 60.0) : (time - lastTime);
            lastTime = time;

            //Convert to seconds
            dt = elapsedTimeMilliseconds / 1000.0;

            // Step the models, timers and tweens, but only if the sim is active.
            // It may be inactive if it has been paused through the SimIFrameAPI
            if (sim.active) {

                //The place where we start custom animations
                if (sim.model.step) {
                    sim.model.step(dt);
                }

                //The place where we start custom animations
                if (sim.view.step) {
                    sim.view.step(dt);
                }

                Timer.step(dt);

                //If using the TWEEN animation library, then update all of the tweens (if any) before rendering the scene.
                //Update the tweens after the model is updated but before the scene is redrawn.
                if (window.TWEEN) {
                    window.TWEEN.update();
                }

            }
            sim.display.updateDisplay();

            sim.profiler && sim.profiler.frameEnded();

            sim.trigger('frameCompleted');
        })();

    }
});

module.exports = SimApp;
