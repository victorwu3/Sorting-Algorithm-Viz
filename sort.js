var w = 800;
var h = 500;
var svg;
var data;
var state = {default: 0, selected: 1}
const scale = d3.scaleLinear().domain([1, 40]).range([10,400])



document.addEventListener('DOMContentLoaded', ()=> {
  document.querySelector("#reset").addEventListener("click", () => {
    debugger
    resetData();
    drawBars(data);
  });

  svg = d3.select('#array')
          .append("svg")
          .attr('width', w)
          .attr('height', h);

  // debugger
  resetData();
  drawBars(data);
  selectionSort(data);
})

function resetData() {
  length = 40;

  data = [];

  for (var i = 0; i < length; i++) {
    data.push( { num: Math.ceil((Math.random() * length)) } )
  }
}

function swapEl(x, y) {
  var temp = data[x];
  data[x] = data[y];
  data[y] = temp;
  // data[x], data[y] = data[y], data[x];
}

function drawBars(data) {
  // reset drawing
  // document.getElementById("array").innerHTML = "";
  d3.select("svg").selectAll("*").remove();

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

function redrawBars(data) {
  var rects = svg.selectAll("rect").data(data).transition().duration(100);

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

function selectionSort(data) {
  var swap = false;
  var min;
  for (var i = 0; i < data.length - 1; i++) {

    min_idx = i;

    for (var j = i + 1; j < data.length; j++) {
      // debugger
      if (data[j].num < data[min_idx].num) {
        swap = true;
        min_idx = j;
      }

    }
    if (swap) {
      swapEl(min_idx, i);
    }

    myTimeout();
    // setTimeout(()=>{}, 50000);
  }

}

function myTimeout() {
  setTimeout(function() {redrawBars(data)}, 1000);
}
