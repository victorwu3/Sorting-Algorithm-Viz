
export const betterSelectionSort = (data, speed, updateCounter, swapEl, redrawBars) => {
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
