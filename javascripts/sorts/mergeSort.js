export const mergeSort = (data, lower, higher, funqueue) => {
  if (lower < higher) {
      var mid = Math.floor((lower + higher) / 2);
      mergeSort(data, lower, mid, funqueue);
      mergeSort(data, mid + 1, higher, funqueue);
      merge(data, lower, mid, higher, funqueue);
  }
}

export const merge = (data, lower, mid, higher, funqueue) => {
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
