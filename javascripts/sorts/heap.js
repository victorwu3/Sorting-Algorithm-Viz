export const heapSort= (data) => {
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

  export const heapify = (data, i) => {
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
