
export const insertionSort = (data, speed, updateCounter, swapEl, redrawBars) => {
  let count;
  let i = 0, j = 1;
  let swapped;
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
