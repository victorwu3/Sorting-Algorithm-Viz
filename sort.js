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
  // selectionSort(data);
  betterSelectionSort(data);
})

function resetData() {
  length = 50;

  data = [];

  for (var i = 0; i < length; i++) {
    data.push( { num: Math.ceil((Math.random() * length)), color: "gray" } )
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

function redrawBars() {
  var rects = svg.selectAll("rect").data(data).transition().duration(50);

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

  rects.attr("fill", function(el, i) {
    return el.color;
  });
}


// var i = 0
// function selectionSort(data) {
//   var swap = false;
//   var min_idx = i;
//
//   setTimeout(function() {
//
//     if (i < data.length) {
//       for (var j = i + 1; j < data.length; j++) {
//         // debugger
//         data[j].color = "red";
//         if (data[j].num < data[min_idx].num) {
//           swap = true;
//           min_idx = j;
//         }
//         data[j].color = "gray"
//       }
//       if (swap) {
//         swapEl(min_idx, i);
//       }
//
//       redrawBars();
//       i++;
//       selectionSort(data);
//     }
//   }, 100);
// }


function betterSelectionSort(data) {
  var swap, i = 0, j = i + 1, min_idx = i
  swap = false;

  sort = setInterval(function() {
    if (j >= data.length) {
      min_idx = i;
      j = i + 1;
    }

    if (i < data.length - 1) {
      data[j].color = "red";
      if (data[j].num <= data[min_idx].num) {
        swap = true;
        min_idx = j;
      }
      if (j === data.length - 1) {
        if (swap) {
          data[min_idx].color = "gray";
          swapEl(min_idx, i);
        }
        data[i].color = "blue";
        swap = false;
        i++;
      }
      redrawBars();
      data[j].color = "gray";
    } else {
      data[i].color = "blue";
      redrawBars();
      clearInterval(sort);
    }

    j++;
  }, 20);
}
