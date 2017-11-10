var w = 800;
var h = 500;
var svg;
var data;
var state = {default: 0, selected: 1}
const scale = d3.scaleLinear().domain([1, 40]).range([10,400])
var nums;


document.addEventListener('DOMContentLoaded', ()=> {
  document.querySelector("#reset").addEventListener("click", () => {
    // debugger
    resetData();
  });

  document.querySelector("#selection").addEventListener("click", () => {
    resetData();
    betterSelectionSort(data);
  })
  document.querySelector("#insertion").addEventListener("click", () => {
    resetData();
    insertionSort(data);
  })
  document.querySelector("#bubble").addEventListener("click", () => {
    resetData();
    bubbleSort(data);
  })

  svg = d3.select('#array')
          .append("svg")
          .attr('width', w)
          .attr('height', h);

  // debugger
  resetData();

  // insertionSort(data);
  // bubbleSort(data);
  // betterSelectionSort(data);
  data = mergeSort(data, compare);
  redrawBars();
})

function resetData() {
  length = 64;

  data = [];

  for (var i = 0; i < length; i++) {
    data.push( { num: Math.ceil((Math.random() * length)), color: "gray" } )
  }
  nums = data.map( (el) => el.num )
  drawBars(data);
}

function swapEl(x, y) {
  var temp = data[x];
  data[x] = data[y];
  data[y] = temp;
}

function drawBars(data) {
  // reset drawing
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
  // debugger
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
  }, 30);
}

function compare(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}

function mergeSort(data, compare) {
  if (data.length <= 1) return data;

  const midpoint = Math.floor(data.length / 2);
  const sortedLeft = mergeSort(data.slice(0, midpoint), compare);
  const sortedRight = mergeSort(data.slice(midpoint), compare);
  // debugger
  return merge(sortedLeft, sortedRight, compare);
}

function merge(left, right, func) {
  let merged = [];

    while (left.length && right.length) {
      left[0].color = "red";
      right[0].color = "red";
      switch (compare(left[0].num, right[0].num)) {
        case -1:
          merged.push(left.shift());
          break
        case 0:
          merged.push(left.shift());
          break
        case 1:
          merged.push(right.shift());
          break
      }
      debugger
    }

  merged = merged.concat(left).concat(right);
  debugger
  redrawBars();
  return merged

}

function insertionSort(data) {
  var i = 0, j = 1;
  var swapped;
  data[0].color = "blue";

  sort = setInterval(function() {
    if (swapped === false) {
      i = j - 1;
    }
    if (j < data.length) {
      if (i >= 0) {
        if (data[i].num >= data[i+1].num) {
          data[i+1].color = "red";
          swapped = true;
          swapEl(i+1, i);
          data[i+1].color="blue"
        } else {
          swapped = false;
          j++;
        }
        redrawBars();
        data[i+1].color="blue"
        i--;
      } else {
        j++;
        i = j - 1;
      }
    } else {
      clearInterval(sort);
    }
    data[0].color = "blue";

    redrawBars();
  }, 30);
}

function bubbleSort(data) {
  var i = 0;
  var sorted = true;
  var j = data.length - 1;

  sort = setInterval(function() {
    if (i < j) {
      data[i].color = "red";
      data[i+1].color = "red";
      if (data[i].num >= data[i+1].num) {
        sorted = false;
        redrawBars();
        swapEl(i, i+1);
      }
      data[i].color = "gray";
      i++
    } else {
      data[j].color = "blue"
      if (!sorted) {
        i = 0;
        j--;
        sorted=true;
      }
      else {
        data.forEach(el => {
          el.color = "blue"
        })
        clearInterval(sort);
      }
    }
    redrawBars();
  }, 30)
}

function betterMergeSort(data) {

  var n = 1, i = 1;
  sort = setInterval(function() {
    if (n < 6) {
      if (i <= (data.length / (Math.pow(2,n)))) {





      } else {
        i = 1;
        n++;
      }
      redrawBars();
      i++;
    } else {
      clearInterval(sort);
    }

    redrawBars();

  }, 30);

}











//
