/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _modal = __webpack_require__(1);

var _mergeSort = __webpack_require__(2);

var _insertion = __webpack_require__(3);

var _selection = __webpack_require__(4);

var _bubble = __webpack_require__(5);

var _heap = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"/.sorts/heap\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var w = 800;
var h = 600;
var svg = void 0,
    data = void 0,
    nums = void 0,
    sort = void 0,
    speed = void 0,
    numblocks = void 0,
    count = void 0,
    array_length = void 0;
var state = { default: 0, selected: 1 };
var scale = d3.scaleLinear().domain([1, 200]).range([5, 550]);
var funqueue = [];

function shuffle(a) {
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    swapEl(i, j);
  }
}
var updateCounter = function updateCounter() {
  count++;
  document.querySelector("#counter").setAttribute("value", count);
};

function resetData() {
  var tempData = void 0;
  numblocks = document.querySelector("#numblocks").value;
  length = numblocks > 200 ? 200 : numblocks;
  count = 0;

  data = [];

  for (var i = 0; i < length; i++) {
    data.push({ num: Math.ceil(Math.random() * 200), color: "lightgray" });
  }
  nums = data.map(function (el) {
    return el.num;
  });
  tempData = Object.assign([], data);
  drawBars(data);
}

var swapEl = function swapEl(x, y) {
  var temp = data[x];
  data[x] = data[y];
  data[y] = temp;
};

function drawBars(data) {
  d3.select("svg").selectAll("*").remove();

  var rects = svg.selectAll("rect").data(data).enter().append("rect");

  rects.attr("x", function (el, i) {
    return i * (w / data.length);
  });

  rects.attr("y", function (el, i) {
    return h - scale(el.num);
  });

  rects.attr("width", function (el, i) {
    return w / data.length - 3;
  });

  rects.attr("height", function (el, i) {
    return scale(el.num);
  });

  rects.attr("fill", "lightgray");
}

var redrawBars = function redrawBars(data) {
  var rects = svg.selectAll("rect").data(data).transition().duration(50);

  rects.attr("x", function (el, i) {
    return i * (w / data.length);
  });

  rects.attr("y", function (el, i) {
    return h - scale(el.num);
  });

  rects.attr("width", function (el, i) {
    return w / data.length - 3;
  });

  rects.attr("height", function (el, i) {
    return scale(el.num);
  });

  rects.attr("fill", function (el, i) {
    return el.color;
  });
};

document.addEventListener('DOMContentLoaded', function () {
  (0, _modal.handleModalButtons)();
  document.querySelector("#reset").addEventListener("click", function () {
    if (sort) {
      clearInterval(sort);
    }
    resetData();
  });

  document.querySelector("#selection").addEventListener("click", function () {
    speed = parseInt(document.querySelector("#speed").value);
    if (sort) {
      clearInterval(sort);
    }
    resetData();
    (0, _selection.betterSelectionSort)(data, speed, updateCounter, swapEl, redrawBars);
  });
  document.querySelector("#insertion").addEventListener("click", function (sort) {
    speed = parseInt(document.querySelector("#speed").value);
    if (sort) {
      clearInterval(sort);
    }
    resetData();
    (0, _insertion.insertionSort)(data, speed, updateCounter, swapEl, redrawBars);
  });
  document.querySelector("#bubble").addEventListener("click", function (sort) {
    speed = parseInt(document.querySelector("#speed").value);
    if (sort) {
      clearInterval(sort);
    }
    resetData();
    (0, _bubble.bubbleSort)(data, speed);
  });
  document.querySelector("#heap").addEventListener("click", function (sort) {
    var tempData = void 0;
    speed = parseInt(document.querySelector("#speed").value);
    if (sort) {
      clearInterval(sort);
      funqueue = [];
    }
    resetData();
    tempData = Object.assign([], data);
    (0, _heap.heapSort)(data);
    sort = setInterval(function () {
      updateCounter();

      if (funqueue.length > 1) {
        redrawBars(funqueue.shift());
      } else {
        clearInterval(sort);
        var last = funqueue.pop();
        last.forEach(function (el) {
          el.color = "blue";
        });
        redrawBars(last);
      }
    }, speed);
  });
  document.querySelector("#cocktail").addEventListener("click", function (sort) {
    speed = parseInt(document.querySelector("#speed").value);
    if (sort) {
      clearInterval(sort);
    }
    resetData();
    cocktailSort(data, speed);
  });
  document.querySelector("#bogo").addEventListener("click", function (sort) {
    speed = parseInt(document.querySelector("#speed").value);
    if (sort) {
      clearInterval(sort);
    }
    resetData();
    bogoSort(data, speed);
  });
  document.querySelector("#merge").addEventListener("click", function (sort) {
    var tempData = void 0;
    speed = parseInt(document.querySelector("#speed").value);
    if (sort) {
      clearInterval(sort);
      var _funqueue = [];
    }
    resetData();
    tempData = Object.assign([], data);
    (0, _mergeSort.mergeSort)(tempData, 0, data.length - 1, funqueue);

    sort = setInterval(function () {
      updateCounter();

      if (funqueue.length > 1) {
        redrawBars(funqueue.shift());
      } else {
        clearInterval(sort);
        var last = funqueue.pop();
        last.forEach(function (el) {
          el.color = "blue";
        });
        redrawBars(last);
      }
    }, speed);
  });
  document.querySelector("#quick").addEventListener("click", function () {
    var tempData = void 0;
    speed = parseInt(document.querySelector("#speed").value);
    if (sort) {
      clearInterval(sort);
      funqueue = [];
    }
    resetData();
    tempData = Object.assign([], data);
    quickSort(data, 0, data.length - 1);
    sort = setInterval(function () {
      updateCounter();

      if (funqueue.length > 1) {
        redrawBars(funqueue.shift());
      } else {
        clearInterval(sort);
        var last = funqueue.pop();
        last.forEach(function (el) {
          el.color = "blue";
        });
        redrawBars(last);
      }
    }, speed);
  });

  svg = d3.select('#array').append("svg").attr('width', w).attr('height', h);

  resetData();
});

function quickSort(data, left, right) {
  var len = data.length,
      pivot,
      partitionIndex;

  if (left < right) {
    pivot = right;
    partitionIndex = partition(data, pivot, left, right);

    //sort left and right
    quickSort(data, left, partitionIndex - 1);
    quickSort(data, partitionIndex + 1, right);
  }
  return data;
}

function partition(data, pivot, left, right) {
  var pivotValue = data[pivot].num,
      partitionIndex = left;

  for (var i = left; i < right; i++) {
    if (data[i].num < pivotValue) {
      swapEl(i, partitionIndex);
      var tempobject = Object.assign({}, data[i]);
      tempobject.color = "red";
      var tempobject2 = Object.assign({}, data[pivot]);
      tempobject2.color = "green";
      data[i] = tempobject;
      data[pivot] = tempobject2;
      var temp = Object.assign([], data);
      funqueue.push(temp);
      var tempobject3 = Object.assign({}, data[i]);
      tempobject3.color = "lightgray";
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

  var temp = Object.assign([], data);
  funqueue.push(temp);

  var tempobject2 = Object.assign({}, data[right]);
  tempobject2.color = "lightgray";
  data[right] = tempobject2;
  return partitionIndex;
}

function cocktailSort(data, speed) {
  var swapped = 0;
  var ascending = true;
  var descending = false;
  var upper = data.length - 1;
  var lower = 0;
  var ending = false;
  var i = 0;
  sort = setInterval(function () {
    updateCounter();

    if (true) {
      if (ascending) {
        if (i < upper) {
          ending = false;
          if (data[i].num > data[i + 1].num) {
            swapEl(i, i + 1);
          } else {
            swapped++;
          }
          data[i].color = "red";
          data[i + 1].color = "red";
          redrawBars(data);
          i++;
        } else {
          ending = true;
          upper--;
          data[i].color = "blue";
          i = upper;
          ascending = false;
          descending = true;
          swapped = 0;
          if (swapped === upper - lower) {
            data.forEach(function (el) {
              el.color = "blue";
            });
            clearInterval(sort);
          }
        }
      } else {

        if (i > lower) {
          ending = false;
          if (data[i - 1].num > data[i].num) {
            swapEl(i, i - 1);
          } else {
            swapped++;
          }
          data[i].color = "red";
          data[i - 1].color = "red";
          i--;
        } else {
          ending = true;
          data[i].color = "blue";
          data[i + 1].color = "lightgray";

          lower++;
          swapped = 0;
          i = lower;
          ascending = true;
          descending = false;
          if (swapped === upper - lower) {
            data.forEach(function (el) {
              el.color = "blue";
            });
            clearInterval(sort);
          }
        }
      }
    } else {}
    redrawBars(data);
    if (!ending) {
      data[i].color = "lightgray";
      if (i > lower) {
        data[i - 1].color = "lightgray";
      }
      if (descending) {
        data[i + 1].color = "lightgray";
      }
    } else {}
  }, speed);
}

function bogoSort(data, speed) {
  var sortedArray;
  sort = setInterval(function () {
    updateCounter();
    shuffle(data);
    redrawBars(data);
    sortedArray = data.map(function (el) {
      return el.num;
    }).sort(function (a, b) {
      return a - b;
    });
    if (arraysEqual(data.map(function (el) {
      return el.num;
    }), sortedArray)) {
      clearInterval(sort);
      data.forEach(function (el) {
        el.color = "blue";
      });
      redrawBars(data);
    }
  }, speed);
}

function arraysEqual(a, b) {

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
//
// function heapify(data, i) {
//     var left = 2 * i + 1;
//     var right = 2 * i + 2;
//     var max = i;
//     var tempobject = Object.assign({}, data[i])
//     tempobject.color = "red"
//     var temp = Object.assign([], data)
//
//     if (left < data.length) {
//       var tempobject = Object.assign({}, data[left])
//       tempobject.color = "red"
//       var temp = Object.assign([], data)
//
//     }
//     if (right < data.length) {
//       var tempobject = Object.assign({}, data[right])
//       tempobject.color = "red"
//       var temp = Object.assign([], data)
//
//     }
//     funqueue.push(temp)
//     var tempobject2 = Object.assign({}, data[i])
//     tempobject2.color = "lightgray"
//     data[i] = tempobject2
//
//     if (left < array_length && data[left].num > data[max].num) {
//         max = left;
//     }
//
//     if (right < array_length && data[right].num > data[max].num)     {
//         max = right;
//     }
//     if (max != i) {
//         swapEl(i, max);
//         var tempobject = Object.assign({}, data[i]);
//         tempobject.color = "red";
//         var tempobject2 = Object.assign({}, data[max]);
//         tempobject2.color = "red";
//         data[i] = tempobject;
//         data[max] = tempobject2;
//         var temp = Object.assign([], data);
//         funqueue.push(temp)
//         var tempobject3 = Object.assign({}, data[i]);
//         tempobject3.color = "lightgray"
//         var tempobject4 = Object.assign({}, data[max]);
//         tempobject4.color = "lightgray";
//         data[i] = tempobject3;
//         data[max] = tempobject4;
//         heapify(data, max);
//     }
// }
//
// function heapSort(data) {
//   array_length = data.length
//
//   var i = Math.floor(data.length / 2)
//
//   for (i; i >= 0; i--){
//       heapify(data, i)
//     }
//
//   for (i = data.length - 1; i >0; i--) {
//           var tempobject = Object.assign({}, data[i]);
//           tempobject.color = "red";
//           var tempobject2 = Object.assign({}, data[0]);
//           tempobject2.color = "green";
//           data[i] = tempobject;
//           data[0] = tempobject2;
//           var temp = Object.assign([], data);
//           funqueue.push(temp)
//           var tempobject3 = Object.assign({}, data[i]);
//           data[i].color = "blue"
//           var tempobject4 = Object.assign({}, data[0]);
//           tempobject4.color = "blue";
//           data[0] = tempobject4;
//           data[i].color = "blue"
//           swapEl(0, i)
//           array_length--;
//           heapify(data, 0);
//     }
//   }

//

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var handleModalButtons = exports.handleModalButtons = function handleModalButtons() {
  var infoButton = document.querySelector('#info-modal');
  var modalDiv = document.querySelector('#modal-location');

  infoButton.addEventListener("click", function (e) {
    e.preventDefault();
    var html = '<div class="modal-backdrop"><div class="modal-inner"><h2>Sorting Algorithms</h2>';
    html += '<p>Each button will initiate a different sorting algorithm</p>';
    html += '<p>Selection Sort: O(n^2) - Finds the smallest element on every run through the list and places at the front</p>';
    html += '<p>Insertion Sort: O(n^2) - Inserts elements one element at a time</p>';
    html += '<p>Bubble Sort: O(n^2) - Repeatedly swaps adjacent elements if they are in wrong order</p>';
    html += '<p>Cocktail Sort: O(n^2) - A variation of bubble sort that sorts in both directions</p>';
    html += '<p>Merge Sort: O(n log n) - Divides the list into n sublists of 1 element then repeatedly merges sublists into sorted sublists until final sorted list</p>';
    html += '<p>Quick Sort: O(n^2) - Divides list into two smaller sub-arrays of low and high elements, then recursively calls quick sort on sub-arrays</p>';
    html += '<p>Heap Sort: O(n log n) - Builds a max heap from the input data then builds a sorted list with the max element and repeatedly heapifying result.</p>';
    html += '<p>Bogo Sort: O(n log n) - Randomly generates a permutation of the list</p>';
    html += '<div class="close-modal">X</div>';
    html += '</div></div>';
    modalDiv.innerHTML = html;
    document.querySelector('.modal-backdrop').addEventListener("click", function (e) {
      e.preventDefault();
      modalDiv.innerHTML = '';
    });
  });
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var mergeSort = exports.mergeSort = function mergeSort(data, lower, higher, funqueue) {
    if (lower < higher) {
        var mid = Math.floor((lower + higher) / 2);
        mergeSort(data, lower, mid, funqueue);
        mergeSort(data, mid + 1, higher, funqueue);
        merge(data, lower, mid, higher, funqueue);
    }
};

var merge = exports.merge = function merge(data, lower, mid, higher, funqueue) {
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
        var tempobject = Object.assign({}, mergearr[a]);
        tempobject.color = "red";
        data[lower + a] = tempobject;
        var temp = Object.assign([], data);
        funqueue.push(temp);
        var tempobject2 = Object.assign({}, mergearr[a]);
        tempobject2.color = "lightgray";
        data[lower + a] = tempobject2;
    }
    return data;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var insertionSort = exports.insertionSort = function insertionSort(data, speed, updateCounter, swapEl, redrawBars) {
  var count = void 0;
  var i = 0,
      j = 1;
  var swapped = void 0;
  data[0].color = "blue";

  sort = setInterval(function () {
    updateCounter();

    if (swapped === false) {
      i = j - 1;
    }
    if (j < data.length) {
      if (i >= 0) {
        if (data[i].num >= data[i + 1].num) {
          data[i + 1].color = "red";
          swapped = true;
          swapEl(i + 1, i);
          data[i + 1].color = "blue";
        } else {
          swapped = false;
          j++;
        }
        redrawBars(data);
        data[i + 1].color = "blue";
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
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var betterSelectionSort = exports.betterSelectionSort = function betterSelectionSort(data, speed, updateCounter, swapEl, redrawBars) {
  var swap,
      i = 0,
      j = i + 1,
      min_idx = i;
  swap = false;

  sort = setInterval(function () {
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
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var bubbleSort = exports.bubbleSort = function bubbleSort(data, speed, updateCounter, swapEl, redrawBars) {
  var i = 0;
  var sorted = true;
  var j = data.length - 1;

  sort = setInterval(function () {
    updateCounter();

    if (i < j) {
      data[i].color = "red";
      data[i + 1].color = "red";
      if (data[i].num >= data[i + 1].num) {
        sorted = false;
        redrawBars(data);
        swapEl(i, i + 1);
      }
      data[i].color = "lightgray";
      i++;
    } else {
      data[j].color = "blue";
      if (!sorted) {
        i = 0;
        j--;
        sorted = true;
      } else {
        data.forEach(function (el) {
          el.color = "blue";
        });
        clearInterval(sort);
      }
    }
    redrawBars(data);
  }, speed);
};

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map