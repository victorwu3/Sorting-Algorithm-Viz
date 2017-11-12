var w = 800;
var h = 700;
var svg;
var data;
var state = {default: 0, selected: 1}
const scale = d3.scaleLinear().domain([1, 40]).range([10,400])
var nums;
var funqueue = [];
var tempdata;
var sort;

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        swapEl(i,j)
    }
}

document.addEventListener('DOMContentLoaded', ()=> {
  document.querySelector("#reset").addEventListener("click", () => {
    if (sort) {
      clearInterval(sort);
    }
    resetData();
  });

  document.querySelector("#selection").addEventListener("click", () => {
    if (sort) {
      clearInterval(sort);
    }
    resetData();
    //
    // tempData = Object.assign([], data);
    // drawBars(tempData)
    betterSelectionSort(data);
  })
  document.querySelector("#insertion").addEventListener("click", () => {
    if (sort) {
      clearInterval(sort);
    }
    resetData();
    // tempData = Object.assign([], data);
    // drawBars(tempData)
    // debugger
    insertionSort(data);
  })
  document.querySelector("#bubble").addEventListener("click", () => {
    if (sort) {
      clearInterval(sort);
    }
    resetData();
    // tempData = Object.assign([], data);
    // drawBars(tempData)
    // debugger
    bubbleSort(data);
  })
  document.querySelector("#cocktail").addEventListener("click", () => {
    if (sort) {
      clearInterval(sort);
    }
    resetData();
    // tempData = Object.assign([], data);
    // drawBars(tempData)
    // debugger
    cocktailSort(data);
  })
  document.querySelector("#bogo").addEventListener("click", () => {
    if (sort) {
      clearInterval(sort);
    }
    resetData();
    // tempData = Object.assign([], data);
    // drawBars(tempData)
    // debugger
    bogoSort(data);
  })
  document.querySelector("#merge").addEventListener("click", () => {
    // debugger
    if (sort) {
      clearInterval(sort);
    }
    resetData();
    tempData = Object.assign([], data);
    // debugger
    mergeSort(tempData, 0, data.length - 1);

    sort = setInterval(function() {
      if (funqueue.length > 0) {
        redrawBars(funqueue.shift());
      } else {
        clearInterval(sort);
      }
    }, 30)
  })

  svg = d3.select('#array')
          .append("svg")
          .attr('width', w)
          .attr('height', h);

  resetData();

})

function resetData() {
  length = 64;

  data = [];

  for (var i = 0; i < length; i++) {
    data.push( { num: Math.ceil((Math.random() * length)), color: "gray" } )
  }
  nums = data.map( (el) => el.num )
  tempData = Object.assign([], data);
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

function redrawBars(data) {
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
      redrawBars(data);
      data[j].color = "gray";
    } else {
      data[i].color = "blue";
      redrawBars(data);
      clearInterval(sort);
    }

    j++;
  }, 30);
}

function compare(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}

function mergeSort(data, lower, higher) {
  if (lower < higher) {
      var mid = Math.floor((lower + higher) / 2);
      mergeSort(data, lower, mid);
      mergeSort(data, mid + 1, higher);
      merge(data, lower, mid, higher);
  }
}

function merge(data, lower, mid, higher) {
  // debugger
    var i = lower;
    var j = mid + 1;
    var k = 0;
    var mergearr = [];

    while (i <= mid && j <= higher) {
        if (data[i].num <= data[j].num) {
            mergearr[k] = data[i];
            k++;
            i++;
        } else {
            mergearr[k] = data[j];
            k++;
            j++;
        }
    }

    if (i === j) {
        while (j <= higher) {
            mergearr[k] = data[j];
            k++;
            j++;
        }
    } else {
        while (i <= mid) {
            mergearr[k] = data[i];
            k++;
            i++;
        }
    }

    for (var a = 0; a < k; a++) {
        data[(lower+a)] = mergearr[a];
        var temp = Object.assign([], data)
        // debugger
        // temp[(lower+a)].color = "red";
        // debugger
        // funqueue.push(wrapFunction(redrawBars, this, [temp] ))
        funqueue.push(temp)
    }


    // var a = 0;
    // sort = setInterval(function(){
    //   if (a < k) {
    //     data[(lower+a)] = mergearr[a];
    //     data[(lower+a)].color = "red";
    //     debugger
    //     redrawBars(data);
    //   } else {
    //     clearInterval(sort)
    //   }
    //   a++;
    // }, 500)




    return data;

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
        redrawBars(data);
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

    redrawBars(data);
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
        redrawBars(data);
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
    redrawBars(data);
  }, 30)
}

function quickSort(data, left, right){
   var len = data.length,
   pivot,
   partitionIndex;


  if(left < right){
    pivot = right;
    partitionIndex = partition(data, pivot, left, right);

   //sort left and right
   quickSort(data, left, partitionIndex - 1);
   quickSort(data, partitionIndex + 1, right);
  }
  return data;
}

function partition(arr, pivot, left, right){
   var pivotValue = arr[pivot],
       partitionIndex = left;

   for(var i = left; i < right; i++){
    if(arr[i] < pivotValue){
      swap(arr, i, partitionIndex);
      partitionIndex++;
    }
  }
  swap(right, partitionIndex);
  return partitionIndex;
}

function cocktailSort(data) {
	var swapped = 0;
  var ascending = true;
  var descending = false;
  var i = 0;
  sort = setInterval(function() {
    // debugger
    if (true) {
      // swapped = false;
      if (ascending) {
        if (i < data.length - 2) {
          if(data[i].num > data[i+1].num) {
            swapEl(i, i+1);
            // swapped = true;
            // data[i].color = "gray"
            // data[i+1].color = "gray"
            // i++
          } else {
            swapped++
          }
          // data[i].color = "gray"
          data[i].color = "red"
          data[i+1].color = "red"
          redrawBars(data);
          i++
        } else {
          if (swapped === data.length - 2) {
            clearInterval(sort);
          }
          i = data.length - 2
          ascending = false
          descending = true
          swapped = 0
        }
        // i++
      } else {

        if (i > 0) {
          if(data[i].num > data[i+1].num) {
            swapEl(i, i+1)
            // swapped = true;
            // redrawBars();
          } else {
            swapped++;
          }
          data[i].color = "red"
          data[i-1].color = "red"
          i--
        } else {
          if (swapped === data.length - 2) {
            clearInterval(sort);
          }
          swapped = 0
          i = 0
          ascending = true
          descending = false
        }
        // i--
      }
    } else {
      // clearInterval(sort);
    }
    redrawBars(data);
    data[i].color = "gray"
    data[i+1].color = "gray"
    if (i>0) data[i-1].color = "gray"
    // data[i-1].color="gray"
  }, 10)
}

function bogoSort(data) {
  sort = setInterval(function() {
    shuffle(data)
    redrawBars(data)
  }, 500)
}




//
