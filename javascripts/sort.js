var w = 800;
var h = 600;
var svg;
var data;
var state = {default: 0, selected: 1}
const scale = d3.scaleLinear().domain([1, 200]).range([5,550])
var nums;
var funqueue = [];
var tempdata;
var sort;
var speed;
var numblocks;
var count;
var array_length;

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
    speed = parseInt(document.querySelector("#speed").value)
    if (sort) {
      clearInterval(sort);
    }
    resetData();
    betterSelectionSort(data, speed);
  })
  document.querySelector("#insertion").addEventListener("click", () => {
    speed = parseInt(document.querySelector("#speed").value)
    if (sort) {
      clearInterval(sort);
    }
    resetData();
    insertionSort(data, speed);
  })
  document.querySelector("#bubble").addEventListener("click", () => {
    speed = parseInt(document.querySelector("#speed").value)
    if (sort) {
      clearInterval(sort);
    }
    resetData();
    bubbleSort(data, speed);
  })
  document.querySelector("#heap").addEventListener("click", () => {
    speed = parseInt(document.querySelector("#speed").value)
    if (sort) {
      clearInterval(sort);
      funqueue = []
    }
    resetData();
    tempData = Object.assign([], data);
    heapSort(data);
    sort = setInterval(function() {
      updateCounter();

      if (funqueue.length > 1) {
        redrawBars(funqueue.shift());
      } else {
        clearInterval(sort);
        var last = funqueue.pop();
        last.forEach(el => {
          el.color = "blue"
        })
        redrawBars(last)
      }
    }, speed)
  })
  document.querySelector("#cocktail").addEventListener("click", () => {
    speed = parseInt(document.querySelector("#speed").value)
    if (sort) {
      clearInterval(sort);
    }
    resetData();
    cocktailSort(data, speed);
  })
  document.querySelector("#bogo").addEventListener("click", () => {
    speed = parseInt(document.querySelector("#speed").value)
    if (sort) {
      clearInterval(sort);
    }
    resetData();
    bogoSort(data, speed);
  })
  document.querySelector("#merge").addEventListener("click", () => {
    speed = parseInt(document.querySelector("#speed").value)
    if (sort) {
      clearInterval(sort);
      funqueue = []
    }
    resetData();
    tempData = Object.assign([], data);
    mergeSort(tempData, 0, data.length - 1);


    sort = setInterval(function() {
      updateCounter();

      if (funqueue.length > 1) {
        redrawBars(funqueue.shift());
      } else {
        clearInterval(sort);
        var last = funqueue.pop();
        last.forEach(el => {
          el.color = "blue"
        })
        redrawBars(last)
      }
    }, speed)
  })
  document.querySelector("#quick").addEventListener("click", () => {
    speed = parseInt(document.querySelector("#speed").value)
    if (sort) {
      clearInterval(sort);
      funqueue = []
    }
    resetData();
    tempData = Object.assign([], data);
    quickSort(data, 0, data.length - 1);
    sort = setInterval(function() {
      updateCounter();

      if (funqueue.length > 1) {
        redrawBars(funqueue.shift());
      } else {
        clearInterval(sort);
        var last = funqueue.pop();
        last.forEach(el => {
          el.color = "blue"
        })
        redrawBars(last)
      }
    }, speed)
  })

  svg = d3.select('#array')
          .append("svg")
          .attr('width', w)
          .attr('height', h);

  resetData();

})

function updateCounter() {
  count++;
  document.querySelector("#counter").setAttribute("value", count);
}
function resetData() {
  numblocks = document.querySelector("#numblocks").value;
  length = numblocks > 200 ? 200 : numblocks;
  count=0;

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

function betterSelectionSort(data, speed) {
  var swap, i = 0, j = i + 1, min_idx = i
  swap = false;

  sort = setInterval(function() {
    updateCounter();
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
  }, speed);
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
        var tempobject = Object.assign({}, mergearr[a])
        tempobject.color="red"
        data[(lower+a)] = tempobject;
        var temp = Object.assign([], data)
        funqueue.push(temp)
        var tempobject2 = Object.assign({}, mergearr[a])
        tempobject2.color="lightgray"
        data[(lower+a)] = tempobject2
    }
    return data;

}

function insertionSort(data, speed) {
  var i = 0, j = 1;
  var swapped;
  data[0].color = "blue";

  sort = setInterval(function() {
    updateCounter();

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
  }, speed);
}

function bubbleSort(data, speed) {
  var i = 0;
  var sorted = true;
  var j = data.length - 1;

  sort = setInterval(function() {
    updateCounter();

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
  }, speed)
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

function partition(data, pivot, left, right){
  var pivotValue = data[pivot].num,
  partitionIndex = left;

  for(var i = left; i < right; i++){
    if(data[i].num < pivotValue){
      swapEl(i, partitionIndex);
      var tempobject = Object.assign({}, data[i]);
      tempobject.color = "red";
      var tempobject2 = Object.assign({}, data[pivot]);
      tempobject2.color = "green";
      data[i] = tempobject;
      data[pivot] = tempobject2;
      var temp = Object.assign([], data);
      funqueue.push(temp)
      var tempobject3 = Object.assign({}, data[i]);
      tempobject3.color = "lightgray"
      var tempobject4 = Object.assign({}, data[pivot]);
      tempobject4.color = "lightgray";
      data[i] = tempobject3;
      data[pivot] = tempobject4;
      partitionIndex++;
    }
  }
  swapEl(right, partitionIndex);
  var tempobject = Object.assign({}, data[right]);
  tempobject.color = "red";
  data[right] = tempobject;

  var temp = Object.assign([], data)
  funqueue.push(temp)

  var tempobject2 = Object.assign({}, data[right])
  tempobject2.color = "lightgray"
  data[right] = tempobject2
  return partitionIndex;
}

function cocktailSort(data, speed) {
	var swapped = 0;
  var ascending = true;
  var descending = false;
  var upper = data.length - 1
  var lower = 0;
  var ending = false;
  var i = 0;
  sort = setInterval(function() {
    updateCounter();

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

  }, speed)
}

function bogoSort(data, speed) {
  var sortedArray
  sort = setInterval(function() {
    updateCounter();
    shuffle(data)
    redrawBars(data)
    sortedArray = data.map(el=>el.num).sort((a,b)=>a-b);
    if (arraysEqual(data.map(el=>el.num), sortedArray)) {
      clearInterval(sort);
      data.forEach(el => {
        el.color = "blue"
      });
      redrawBars(data);
    }
  }, speed)
}

function arraysEqual(a, b) {

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function heapify(data, i) {
    var left = 2 * i + 1;
    var right = 2 * i + 2;
    var max = i;
    var tempobject = Object.assign({}, data[i])
    tempobject.color = "red"
    var temp = Object.assign([], data)

    if (left < data.length) {
      var tempobject = Object.assign({}, data[left])
      tempobject.color = "red"
      var temp = Object.assign([], data)

    }
    if (right < data.length) {
      var tempobject = Object.assign({}, data[right])
      tempobject.color = "red"
      var temp = Object.assign([], data)

    }
    funqueue.push(temp)
    var tempobject2 = Object.assign({}, data[i])
    tempobject2.color = "lightgray"
    data[i] = tempobject2

    if (left < array_length && data[left].num > data[max].num) {
        max = left;
    }

    if (right < array_length && data[right].num > data[max].num)     {
        max = right;
    }
    if (max != i) {
        swapEl(i, max);
        var tempobject = Object.assign({}, data[i]);
        tempobject.color = "red";
        var tempobject2 = Object.assign({}, data[max]);
        tempobject2.color = "red";
        data[i] = tempobject;
        data[max] = tempobject2;
        var temp = Object.assign([], data);
        funqueue.push(temp)
        var tempobject3 = Object.assign({}, data[i]);
        tempobject3.color = "lightgray"
        var tempobject4 = Object.assign({}, data[max]);
        tempobject4.color = "lightgray";
        data[i] = tempobject3;
        data[max] = tempobject4;
        heapify(data, max);
    }
}

function heapSort(data) {
  array_length = data.length

  var i = Math.floor(data.length / 2)

  for (i; i >= 0; i--){
      heapify(data, i)
    }

  for (i = data.length - 1; i >0; i--) {
          var tempobject = Object.assign({}, data[i]);
          tempobject.color = "red";
          var tempobject2 = Object.assign({}, data[0]);
          tempobject2.color = "green";
          data[i] = tempobject;
          data[0] = tempobject2;
          var temp = Object.assign([], data);
          funqueue.push(temp)
          var tempobject3 = Object.assign({}, data[i]);
          data[i].color = "blue"
          var tempobject4 = Object.assign({}, data[0]);
          tempobject4.color = "blue";
          data[0] = tempobject4;
          data[i].color = "blue"
          swapEl(0, i)
          array_length--;
          heapify(data, 0);
    }
  }

//
