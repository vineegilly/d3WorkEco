var d3 = require( 'd3' );
//var EcoSystemModel = require('./EcoSystemView');
//var emptyArray = require('../model/EcoSystemModel').emptyArray;
//var beetle = require("../../assets/images/beetle.png");
var beetle = require("../../assets/images/beetle.png");
var grass = require("../../assets/images/grass.png");
var earthworm = require("../../assets/images/earthworm.png");
var flower = require("../../assets/images/flower.png");
var hawk = require("../../assets/images/hawk.png");
var mushroom = require("../../assets/images/mushroom.png");
var snake = require("../../assets/images/snake.png");
var tree = require("../../assets/images/tree.png");
var mouse = require("../../assets/images/mouse.png");
var butterfly = require("../../assets/images/butterfly.png");
var raccoon = require("../../assets/images/raccoon.png");
var deer = require("../../assets/images/deer.png");
var rabbit = require("../../assets/images/rabbit.png");
var coyote = require("../../assets/images/coyote.png");
var frog = require("../../assets/images/frog.png");
var songbird = require("../../assets/images/bird.png");

var legendStyle = {
  fill: "white",
  stroke: "black",
  opacity: 0.8
};
var userDefinedObj;

var strokeStyleArray = ['20, 5, 10, 5','4, 4, 4','10, 2, 2'];


function ChartLegend() {


  d3.legend = function( g,userDefined ) {
  userDefinedObj = userDefined;

    g.each( function() {
      var g = d3.select( this ),
        items = {},
        svg = d3.select( g.property( "nearestViewportElement" ) ),
        legendPadding = g.attr( "data-style-padding" ) || 5,
        lb = g.selectAll( ".legend-box" ).data( [ true ] ),
        li = g.selectAll( ".legend-items" ).data( [ true ] );

      // lb.enter().append( "rect" ).classed( "legend-box", true ).style( legendStyle );
      li.enter().append( "g" ).classed( "legend-items", true );

      svg.selectAll( "[data-legend]" ).each( function() {
        var self = d3.select( this );
        var str = self.attr("style");
        //var String=str.substring(str.lastIndexOf(":")+1,str.lastIndexOf(";"));
          //console.log(String);
        items[ self.attr( "data-legend" ) ] = {
          pos: self.attr( "data-legend-pos" ) || 374,
          //strokeStyle: String != undefined ? String : '',
          color: self.attr( "data-legend-color" ) != undefined ? self.attr( "data-legend-color" ) : self.style( "fill" ) != 'none' ? self.style( "fill" ) : self.style("stroke")
        }
      } );

      svg.selectAll(".legend")
      .attr("transform", "translate(730,54)")
      
      .attr("style", "outline: solid grey; outline-offset: 10px;");


       

      // svg.selectAll("[data-legend]")
      // .attr("transform", "translate(-30,0)");
      

      items = d3.entries( items ).sort( function( a, b ) { return a.value.pos - b.value.pos} );

      li.selectAll( "text" )
        .data( items, function( d ) { return d.key} )
        .call( function( d ) { d.enter().append( "text" )} )
        .call( function( d ) { d.exit().remove()} )
        .attr( "y", function( d, i ) { return (i*2.8)+1 + "em"} )
        .attr( "x", "-0.6em" )
        .style("font", "14pt verdana")
        .text( function( d ) {
            //if(d.key == "")

          for(var i=0;i <= userDefinedObj.length ; i++){

            if(userDefinedObj[i]== undefined){
              return "Grass";
            }
            if(d.key == userDefinedObj[i].key){
               return userDefinedObj[i].value;
            }


          }
          //return d.key;
        } );


      li.selectAll("image")
                    .data( items, function( d ) { return d.key} )
                    .call( function( d ) { d.enter().append( "image" )} )
                    .call( function( d ) { d.exit().remove()} )
                    .attr('x',"-3.5em" )
                    .attr('y',function( d, i ) { return (i*2.8)-0.5 + "em"} )
                    .attr('width', 40)
                    .attr('height', 40)
                    .attr("xlink:href",function( d, i ) {return eval(d.key)} );


//stroke="#000000" stroke-width="4" fill="none" style="stroke-dasharray: 12, 2, 12;"
      li.selectAll( "line" )
        .data( items, function( d ) { return d.key} )
        .call( function( d ) { d.enter().append( "line" )} )
        .call( function( d ) { d.exit().remove()} )
        .attr( "x1","12em")
        .attr( "y1", function( d, i ) { return (i*2.8)+0.8 + "em"} )
        .attr( "y2", function( d, i ) { return (i*2.8)+0.8 + "em"} )
        .attr("x2", 120)
        .attr("stroke-width", "2.5")
        .attr("stroke", "#000000")
        .style( "stroke-dasharray", function( d ,i) {
          return strokeStyleArray[i]
        } );



    } );

    return g;
  }

}

ChartLegend();

module.exports = ChartLegend; // Not strictly required
