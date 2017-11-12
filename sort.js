var w = 800;
var h = 700;
var svg;
var data;
var state = {default: 0, selected: 1}
const scale = d3.scaleLinear().domain([1, 200]).range([5,650])
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
    betterSelectionSort(data);
  })
  document.querySelector("#insertion").addEventListener("click", () => {
    if (sort) {
      clearInterval(sort);
    }
    resetData();
    insertionSort(data);
  })
  document.querySelector("#bubble").addEventListener("click", () => {
    if (sort) {
      clearInterval(sort);
    }
    resetData();
    bubbleSort(data);
  })
  document.querySelector("#cocktail").addEventListener("click", () => {
    if (sort) {
      clearInterval(sort);
    }
    resetData();
    cocktailSort(data);
  })
  document.querySelector("#bogo").addEventListener("click", () => {
    if (sort) {
      clearInterval(sort);
    }
    resetData();
    bogoSort(data);
  })
  document.querySelector("#merge").addEventListener("click", () => {
    if (sort) {
      clearInterval(sort);
      funqueue = []
    }
    resetData();
    tempData = Object.assign([], data);
    mergeSort(tempData, 0, data.length - 1);

    sort = setInterval(function() {
      if (funqueue.length > 0) {
        redrawBars(funqueue.shift());
      } else {
        clearInterval(sort);
      }
    }, 20)
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
    data.push( { num: Math.ceil((Math.random() * 200)), color: "lightgray" } )
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

  rects.attr("fill", "lightgray");
}

function redrawBars(data) {
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
          data[min_idx].color = "lightgray";
          swapEl(min_idx, i);
        }
        data[i].color = "blue";
        swap = false;
        i++;
      }
      redrawBars(data);
      data[j].color = "lightgray";
    } else {
      data[i].color = "blue";
      redrawBars(data);
      clearInterval(sort);
    }

    j++;
  }, 20);
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
        // temp[(lower+a)].color = "red";
        // funqueue.push(wrapFunction(redrawBars, this, [temp] ))
        funqueue.push(temp.slice(0))
        // temp[(lower+a)].color = "lightgray";

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
  }, 20);
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
      data[i].color = "lightgray";
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
  }, 20)
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
  var upper = data.length - 1
  var lower = 0;
  var ending = false;
  var i = 0;
  sort = setInterval(function() {
    if (true) {
      if (ascending) {
        if (i < upper) {
          ending = false;
          if(data[i].num > data[i+1].num) {
            swapEl(i, i+1);
          } else {
            swapped++
          }
          data[i].color = "red"
          data[i+1].color = "red"
          redrawBars(data);
          i++
        } else {
          ending = true;
          upper--
          data[i].color="blue"
          i = upper
          ascending = false
          descending = true
          swapped = 0
          if (swapped === (upper-lower)) {
            data.forEach(el => {
              el.color = "blue"
            })
            clearInterval(sort);
          }
        }
      } else {

        if (i > lower) {
          ending = false
          if(data[i-1].num > data[i].num) {
            swapEl(i, i-1)
          } else {
            swapped++;
          }
          data[i].color = "red"
          data[i-1].color = "red"
          i--
        } else {
          ending = true
          data[i].color="blue"
          data[i+1].color="lightgray"

          lower++
          swapped = 0
          i = lower
          ascending = true
          descending = false
          if (swapped === (upper-lower)) {
            data.forEach(el => {
              el.color = "blue"
            })
            clearInterval(sort);
          }
        }
      }
    } else {
    }
    redrawBars(data);
    if (!ending) {
      data[i].color = "lightgray"
      if (i > lower) {
        data[i-1].color = "lightgray"
      }
      if (descending) {
        data[i+1].color = "lightgray"
      }
    } else {}

  }, 20)
}

function bogoSort(data) {
  sort = setInterval(function() {
    shuffle(data)
    redrawBars(data)
  }, 500)
}




//
