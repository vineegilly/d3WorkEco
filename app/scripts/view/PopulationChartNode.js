var inherit = axon.inherit;
var DOM = scenery.DOM;
var Node = scenery.Node;
var Panel = require('../controls/Panel');
var EcoSystemConstants = require('../model/EcoSystemConstants');
var d3 = require('d3');
var OrganismRuleConstants = require('../model/OrganismRuleConstants');
var ChartLegend = require('./ChartLegend');



// constants
var POPULATION_CHART_ID = "populationChartDiv";
var MARGINS = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 75
};

var CHART_WIDTH = EcoSystemConstants.CHART_NODE_DIMENSION.width;
var CHART_HEIGHT = EcoSystemConstants.CHART_NODE_DIMENSION.height;
var organismsInfoLocal;
var strokeStyleArray = ['20, 5, 10, 5','4, 4, 4','10, 2, 2'];


function PopulationChartNode(organismsInfo) {


  organismsInfoLocal = organismsInfo;

    var thisPanel = this;
    // vertical panel
    Node.call(thisPanel);

    function deferedInitialization() {

        var element = document.createElement('div');
        $(element).attr('id', POPULATION_CHART_ID);

        element.style.width = EcoSystemConstants.CHART_NODE_DIMENSION.width;
        element.style.height = EcoSystemConstants.CHART_NODE_DIMENSION.height;
        var domContent = new DOM(element);
        var populationChartDiv = d3.select(element);

        thisPanel.svgSelection = populationChartDiv.append("svg")
            .attr("width", CHART_WIDTH)
            .attr("height", CHART_HEIGHT + 40);

        thisPanel.buildChart();

        thisPanel.addChild(domContent);
        thisPanel.prevCollectionCount = 0;
    }

    deferedInitialization();


}

inherit(Node, PopulationChartNode, {

    buildChart: function () {
        var self = this;
        var svgSelection = this.svgSelection;
        this.xScale = d3.scale.linear()
            .range([MARGINS.left, CHART_WIDTH - MARGINS.right])
            .domain([0, EcoSystemConstants.TOTAL_LIFE_SPAN]);

        // number of organisms
        this.yScale = d3.scale.linear().range([CHART_HEIGHT - MARGINS.top, MARGINS.bottom])
            .domain([0, 50]);


            //var x = d3.time.scale().range([0, width]);
            //var y = d3.scale.linear().range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(this.xScale)
            .orient("bottom")
            .ticks(12)
            .tickFormat(function (d) {
                if (d === 0) {
                    return "0";
                }
                return d / 1000;
            })
            .tickSize(20)
            .outerTickSize(1.5);


        var yAxis = d3.svg.axis()
            .scale(this.yScale)
            .orient("left")
            .ticks(10)
            .tickSize(20)
            .outerTickSize(1.5);


                    // function for the x grid lines
        function make_x_axis() {
            return d3.svg.axis()
                .scale(self.xScale)
                .orient("bottom")
                .ticks(12)
        }

        // function for the y grid lines
        function make_y_axis() {
          return d3.svg.axis()
              .scale(self.yScale)
              .orient("left")
              .ticks(10)
        }


          // Draw the x Grid lines
    var Xgrid = svgSelection.append("svg:g")
        .attr("class", "grid")
        .attr("transform", "translate(0,"+ (CHART_HEIGHT - MARGINS.top) + ")")
        .call(make_x_axis()
            .tickSize(-(CHART_HEIGHT - MARGINS.top-MARGINS.bottom), 0, 0)
            .tickFormat("")
        )

        Xgrid.selectAll("line").style("stroke", "lightgrey");


    // Draw the y Grid lines
    var Ygrid = svgSelection.append("svg:g")            
        .attr("class", "grid")
        .attr("transform", "translate("+(MARGINS.left+0)+",0)")
        .call(make_y_axis()
            .tickSize(-(CHART_WIDTH - MARGINS.left - MARGINS.right), 0, 0)
            .tickFormat("")
        )

        Ygrid.selectAll("line").style("stroke", "lightgrey");

        function customXAxis(g) {
          g.call(xAxis);
          g.selectAll(".tick line").attr("stroke", "#000000").attr("stroke");
          g.selectAll(".tick line").attr("transform", "translate(0,-10)");
          g.selectAll(".tick text").attr("x", 1).attr("dy", 14);
          g.selectAll(".tick text").style("font", "12pt verdana");
          g.selectAll(".tick text").filter(function(d){ return d==0;}).attr("x", -20).attr("dy", 14);
        
        }


        var xa = svgSelection.append("svg:g")
            .attr("transform", "translate(0," + (CHART_HEIGHT - MARGINS.bottom) + ")")
            .call(customXAxis);

        xa.select("path").attr("marker-end", "url(#arrowheadX)");


        function customYAxis(g) {
              g.call(yAxis);
              //g.select(".domain").remove();
              g.selectAll(".tick line").attr("stroke", "#000000").attr("stroke");
              g.selectAll(".tick line").attr("transform", "translate(10,0)");
              g.selectAll(".tick text").attr("x", -14).attr("dy", 5);
              g.selectAll(".tick text").style("font", "12pt verdana");
              g.selectAll(".tick text").filter(function(d){ return d==0;}).attr("x", -15).attr("dy", 37);

            }


           


        var ya = svgSelection.append("svg:g")
            .attr("transform", "translate(" + ((MARGINS.left)) + ",0)")
            .call(customYAxis);

        ya.select("path").attr("marker-end", "url(#arrowheadY)");


          
                
        

        svgSelection.append("text")      // text label for the x axis
                .attr("x", 460 )
                .attr("y",  756 )
                .style("font", "12pt verdana")
                .style("font-weight", "bold")
                .text("Time (months)");

        

          

        svgSelection.append("defs").append("marker")
                .attr("id", "arrowheadX")
                .attr("refX", 16)
                .attr("refY", 10)
                .attr("markerWidth", 150)
                .attr("markerHeight", 125)
                .attr("markerUnits","strokeWidth")
                .attr("orient", 0)
                .append("path")
                .attr("d", "m3.013916,3.499997l-0.013913,11.5l16,-5.830165l-15.986087,-5.669835z");



        svgSelection.append("defs").append("marker")
                .attr("id", "arrowheadY")
                .attr("refX", -660)
                .attr("refY", 8)
                .attr("markerWidth", 150)
                .attr("markerHeight", 125)
                .attr("markerUnits","strokeWidth")
                .attr("orient", -90)
                .append("path")
                .attr("d", "m3.013916,3.499997l-0.013913,11.5l16,-5.830165l-15.986087,-5.669835z");



            svgSelection.append("text")   // text label for the y axis
        .attr("transform", "rotate(-90)")
        .attr("y", 12)
        .attr("x",-370)
        .attr("dy", "1em")
        .style("font", "12pt verdana")
        .style("font-weight", "bold")
        .text("Population");

        this.organismLifeLine = d3.svg.line().interpolate("basis")
            .x(function (d) {
                return self.xScale(d.time)
            })
            .y(function (d) {
                return self.yScale(d.count)
            });

        this.legend = svgSelection.append("g")
            .attr("class", "legend")
            .attr("transform", "translate(220,20)")
            .style("font-size", "12px")
            .style("font-size", "20px")
            .attr("data-style-padding", 50);

                    
    },

    //private
    drawLegends: function () {
        //setTimeout(function() { self.addLifeLineSnapShot(dt);}, 2000);
        this.legend.call(d3.legend,organismsInfoLocal);
        //this.legendImage.call(d3.legend,organismsInfoLocal);
    },

    /**
     *
     * @param organismSnapShotCollection
     */
    updateChart: function (organismSnapShotCollection) {
      
        if (this.prevCollectionCount === organismSnapShotCollection.length) {
            return ;
        }
        var self = this;
        var groupedElements = _.groupBy(organismSnapShotCollection, function (organismSnapShot) {
            return organismSnapShot.name;
        });

        var data = [];
        //console.log(groupedElements);

        _.each(groupedElements, function (organismSnapShots, name) {
            data.push({name: name, points: organismSnapShots});
            //console.log(data);
        });

        var svgSelection = this.svgSelection;

        // draw the lines
        
        var lines = svgSelection.selectAll(".line").data(data).attr("class", "line");

// transition from previous paths to new paths
        lines.transition().duration(EcoSystemConstants.SNAPSHOT_CAPTURE_ELAPSE)
            .attr("d", function (d) {
                return self.organismLifeLine(d.points);
            })
             .attr("fill", "none")
             .attr("stroke", function (d) {
                 return OrganismRuleConstants[d.name].color;
             })
            .style("stroke-dasharray",function (d,i) {
                return strokeStyleArray[i]
            })

            .attr("stroke-width", 2.5);
            //.attr("transform", "translate(-10,0)");


// enter any new lines
        lines.enter()
            .append("path")
            .attr("class", "line")
            .attr("data-legend", function (d) {
                return d.name
            })

            .attr("d", function (d) {
            //  console.log(d.points);
                return self.organismLifeLine(d.points);
            })
            

// exit
        lines.exit().remove();

        this.prevCollectionCount = organismSnapShotCollection.length;

        this.drawLegends();

    },

    clearChart: function () {
        this.svgSelection.selectAll(".line").remove();
        this.drawLegends();
        this.svgSelection.selectAll(".legend").attr("style", "outline: white; outline-offset: 0px; ");
    }


});

module.exports = PopulationChartNode;
