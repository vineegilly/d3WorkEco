/**
 * The main model containing - EcoSystem
 * @author
 *
 */

var inherit = axon.inherit;
var Bounds2 = dot.Bounds2;
var BaseScreenView = require('../core/BaseScreenView');
var GridPanelNode = require('./GridPanelNode');
var OrganismNode = require('./OrganismNode');
var OrganismPanelNode = require('./OrganismPanelNode');
var PopulationChartNode = require('./PopulationChartNode');
var Text = scenery.Text;
var HBox = scenery.HBox;
var Path = scenery.Path;
var Shape = kite.Shape;
var Color = scenery.Color;
var Node = scenery.Node;
var Vector2 = dot.Vector2;
var EcoSystemConstants = require('../model/EcoSystemConstants');


// private constants
var GRID_PANEL_OFFSET_X = 50;
var GRID_PANEL_OFFSET_Y = 70;
var CHART_PANEL_TOP_OFFSET = 20;
var PANEL_VERTICAL_PADDING = 25;
var globalThis;
var globalWrapper;


function EcoSystemView(ecoSystemModel, options,organismsInfo) {

    //console.log("ecoView");
    //console.log(organismsInfo);

    var thisView = this;
        //globalThis = this;
    globalThis = thisView;

    thisView.model = ecoSystemModel;
    BaseScreenView.call(thisView, {
        layoutBounds: new Bounds2(0, 0, 1024, 704)
    });


    var viewBoundsPath = new Path(Shape.bounds(this.layoutBounds), {
        pickable: false,
        lineWidth: 0

    });
    thisView.addChild(viewBoundsPath);

    var viewWrapper = new Node();
    //globalThis = viewWrapper;

    thisView.addChild(viewWrapper);


    thisView.gridPanelNode = new GridPanelNode(ecoSystemModel);
    thisView.gridPanelNode.x = thisView.layoutBounds.x + GRID_PANEL_OFFSET_X;
    thisView.gridPanelNode.y = thisView.layoutBounds.y + GRID_PANEL_OFFSET_Y;

    var gridSize = EcoSystemConstants.GRID_NODE_DIMENSION;
    var motionBounds = Bounds2.rect(EcoSystemConstants.ORGANISM_RADIUS, EcoSystemConstants.ORGANISM_RADIUS,
        gridSize.width - EcoSystemConstants.ORGANISM_RADIUS * 3,
        gridSize.height - EcoSystemConstants.ORGANISM_RADIUS * 2);

    EcoSystemConstants.MOTION_BOUNDS = motionBounds;

    function handleOrganismAdded(addedOrganismModel) {

        // Add a representation of the number.
        var organismNode = new OrganismNode(addedOrganismModel);
        thisView.gridPanelNode.addOrganism(organismNode);

        // Move the shape to the front of this layer when grabbed by the user.
        addedOrganismModel.userControlledProperty.link(function (userControlled) {
            if (userControlled) {
                organismNode.moveToFront();
            }
        });

        ecoSystemModel.residentOrganismModels.addItemRemovedListener(function removalListener(removedOrganismModel) {
            if (removedOrganismModel === addedOrganismModel) {
                thisView.gridPanelNode.removeOrganism(organismNode);
                ecoSystemModel.residentOrganismModels.removeItemRemovedListener(removalListener);
            }
        });
    }

    //Initial Organism Creation
    ecoSystemModel.residentOrganismModels.forEach(handleOrganismAdded);


    thisView.populationChartNode = new PopulationChartNode(organismsInfo);


    // Observe new items
    ecoSystemModel.residentOrganismModels.addItemAddedListener(handleOrganismAdded);
    thisView.organismPanelNode = new OrganismPanelNode(ecoSystemModel, thisView.gridPanelNode, thisView.populationChartNode, motionBounds);

    viewWrapper.addChild(thisView.organismPanelNode);
    viewWrapper.addChild(thisView.populationChartNode);

    thisView.organismPanelNode.x = thisView.gridPanelNode.bounds.left;
    thisView.populationChartNode.x = thisView.organismPanelNode.x + thisView.organismPanelNode.bounds.width + 5;

    thisView.organismPanelNode.y = thisView.gridPanelNode.bounds.bottom + PANEL_VERTICAL_PADDING;
    thisView.populationChartNode.y = thisView.gridPanelNode.y + CHART_PANEL_TOP_OFFSET;

    viewWrapper.addChild(thisView.gridPanelNode);


    if (options.transformOrder === 1) {
        viewWrapper.translate(options.tx || 0, options.ty || 0);
        viewWrapper.scale(options.scale || 1);
    }
    else {
        viewWrapper.scale(options.scale || 1);
        viewWrapper.translate(options.tx || 0, options.ty || 0);
    }

    thisView.model.playPauseProperty.link(function (playpause) {
        if(playpause){
            thisView.organismPanelNode._children[1]._children[2]._children[1].visible = false;
            setTimeout(function () {
                thisView.organismPanelNode._children[1]._children[2]._children[1].visible = true;
            },2000)
        }

    });
    this.firststateView =  thisView;
   // console.log(this.firststateView);

    globalWrapper = viewWrapper;

    //console.log(thisView.organismPanelNode._children[1]._children[2]);
    $(window).resize(function () {
        // Do calcualtions here
        // you can scale organismPanel Node
        // chart Node or grid node
    });

}

inherit(BaseScreenView, EcoSystemView, {
    /**
     * view related animation
     * @param dt
     */
    step: function (dt) {
        var thisView = this;
        if (thisView.model.replayMode) {
            thisView.populationChartNode.updateChart(thisView.model.organismLifeLineSnapShots);
            return;
        }
        //setTimeout(function() {thisView.gridPanelNode.step(dt)}, 1000);
        thisView.gridPanelNode.step(dt);
        if (thisView.model.isPlaying()) {
            thisView.populationChartNode.updateChart(thisView.model.organismLifeLineSnapShots);
        }

    },

    replay: function (prevReplayState) {
        var thisView = this;
        thisView.model.replay(prevReplayState);
    },

    getReplayData: function () {
        return this.model.replayState;
    },

    clear: function () {
        this.populationChartNode.clearChart();
        this.model.onClearPlay();
    },

    /**
     *
     * @param options
     */
    resizeParts: function (options) {
        var thisView = this; // setting the current state to initial state
         //thisView= this.firststateView;


        if (options && options.scale) {
            thisView.translate(options.tx, options.ty);
            thisView.scale(options.scale);
            


        }

    },

    resetResizeParts: function () {
        var thisView = this;
        thisView.translate(0, 0);
        thisView.scale(0.1);
    },

    constantsObj: function () {
        var Obj = {A:100};
        return Obj;
    }


});


module.exports = EcoSystemView;
