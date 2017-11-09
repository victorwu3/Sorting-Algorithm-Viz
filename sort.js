
    
var w = 800;
var h = 500;
var svg;
var data;
const scale = d3.scaleLinear().domain([1, 40]).range([10,400])


document.addEventListener('DOMContentLoaded', ()=> {
  
  svg = d3.select('#array')
          .append("svg")
          .attr('width', w)
          .attr('height', h);
          
  // debugger
  resetData();
  drawBars(data);
          
})

function resetData() {
  length = 40;
  
  data = [];
  
  for (var i = 0; i < length; i++) {
    data.push( { num: Math.ceil((Math.random() * length)) } )
  }
}

function drawBars(data) {
  var rects = svg.selectAll("rect").data(data).enter().append("rect");
  
  rects.attr("x", function(el, i) {
    return i * (w / data.length);
  });
  
  rects.attr("y", function(el, i) {
    return h - scale(el.num);
  });
  
  rects.attr("width", function(el, i) {
    return (w / data.length) - 3;
  });
  
  rects.attr("height", function(el, i) {
    return scale(el.num);
  });
  
  rects.attr("fill", "gray");
}