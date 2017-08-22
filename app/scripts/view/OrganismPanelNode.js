var inherit = axon.inherit;
var Dimension2 = dot.Dimension2;
var Panel = require('../controls/Panel');
var TitleBarNode = require('./TitleBarNode');
var EcoSystemConstants = require('../model/EcoSystemConstants');
var Node = scenery.Node;
var VBox = scenery.VBox;
var OrganismModelFactory = require('../model/organisms/OrganismModelFactory');
var OrganismCreatorNode = require('./OrganismCreatorNode');
var SimFont = require('../core/SimFont');
var CheckBox = require('../controls/CheckBox');
var Text = scenery.Text;
var HBox = scenery.HBox;
var PlayerBox = require('./PlayerBox');
var Vector2 = dot.Vector2;

var GridLayout = require('../util/GridLayout');

// constants
var ORGANISMS_STR1 = "Organisms";
var ORGANISMS_STR2 = "Choose up to four organisms.";
var CHECK_BOX_OPTIONS = {boxWidth: 30};
var CONTROL_TEXT_OPTIONS = {font: new SimFont(15)};
var POPULATION_TEXT_OPTIONS = {font: new SimFont(25)};
var POPULATION_RANGE_STR = "Population Range";
var RAIN_STR = "Rain";
var PESTICIDE_STR = "PESTICIDE";
var TITLE_SIZE = new Dimension2(EcoSystemConstants.ORGANISM_PANEL_DIMENSION.width, 30);


/**
 *
 * @param {EcoSystemModel} ecoSystemModel
 * @param {GridPanelNode} gridPaneNode
 * @param {PopulationChartNode} populationChartNode
 * @param {Bounds2} motionBounds
 * @constructor
 */
function OrganismPanelNode(ecoSystemModel, gridPaneNode, populationChartNode, motionBounds) {
    var thisPanel = this;

    var creatorCallBack = function (organismInfo, pos) {
        var organismModel = OrganismModelFactory.getOrganism(ecoSystemModel, organismInfo, pos, motionBounds);
        return organismModel;
    };

    var canPlaceShapeCallBack = function (organismModel, droppedPoint) {
        if (gridPaneNode.isInside(droppedPoint)) {
            return true;
        }
        return false;
    };

    var organismInfos = ecoSystemModel.organismInfos;

    var organismNodes = [];

    organismInfos.forEach(function (organismInfo) {
        var organismModel = creatorCallBack(organismInfo, new Vector2(0, 0));
        var organismCreatorNode = new OrganismCreatorNode(organismModel, ecoSystemModel);

        if (organismInfos.length > 6) {
            organismCreatorNode.scale(0.8);
        }
        organismNodes.push(organismCreatorNode);
    });


    //create a empty object, the layout will assign the right x and y values
    var rectElements = organismInfos.map(function () {
        return {};
    });

    var appearanceLayerNode = new Node();

    var padding = [0.02, 0.2];

    if (organismInfos.length > 6) {
        padding = [0.01, 0.015];
    }

    var gridLayout = GridLayout();
    gridLayout
        .size([EcoSystemConstants.ORGANISM_PANEL_DIMENSION.width,
            EcoSystemConstants.ORGANISM_PANEL_DIMENSION.height + 60])
        .bands()
        .padding(padding);

    gridLayout(rectElements);


    for (var i = 0; i < rectElements.length; i++) {
        var rectElement = rectElements[i];
        var creatorNode = organismNodes[i];
        creatorNode.x = rectElement.x;
        creatorNode.y = rectElement.y;
        appearanceLayerNode.addChild(creatorNode);
    }

    var titleBarNode = new TitleBarNode(TITLE_SIZE, ORGANISMS_STR1,ORGANISMS_STR2);
    var rainProperty = ecoSystemModel.rainProperty;

    var checkBoxes = [];
    var rainCheckBoxControl = new CheckBox(new Text(RAIN_STR, CONTROL_TEXT_OPTIONS),
        rainProperty, CHECK_BOX_OPTIONS);
    /* var pesticideBoxControl = new CheckBox( new Text( PESTICIDE_STR, CONTROL_TEXT_OPTIONS ),
     pesticideSprayProperty, CHECK_BOX_OPTIONS );*/
    checkBoxes.push(rainCheckBoxControl);
//  checkBoxes.push( pesticideBoxControl );
    var checkBoxControlBox = new HBox({
        children: checkBoxes,
        spacing: 20
    });


    var playerBox = new PlayerBox(ecoSystemModel.playPauseProperty, ecoSystemModel.rainProperty, function () {

        populationChartNode.clearChart();
        ecoSystemModel.onClearPlay();

    });

    var panelContents = new VBox({
        children: [titleBarNode, appearanceLayerNode, playerBox],
        spacing: 8,
        resize: true
    });


    // vertical panel
    Panel.call(thisPanel, panelContents, {
        // panel options
        fill: EcoSystemConstants.GRID_BACKGROUND_COLOR,
        resize: true,
        yMargin: 5,
        cornerRadius: 0
    });


}

inherit(Panel, OrganismPanelNode, {});

module.exports = OrganismPanelNode;
