
export const bubbleSort = (data, speed, updateCounter, swapEl, redrawBars) => {
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
