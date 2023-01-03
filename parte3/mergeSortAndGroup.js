const { data } = require('./cases');

const merge = (left, right) => {
  let arr = [];
  while (left.length && right.length) {
    if (left[0].date < right[0].date) {
      arr.push(left.shift());
    } else {
      arr.push(right.shift());
    }
  }

  return [...arr, ...left, ...right];
};

const mergeSort = (array) => {
  const half = array.length / 2;

  if (array.length < 2) {
    return array;
  }
  const left = array.splice(0, half);
  return merge(mergeSort(left), mergeSort(array));
};

const groupByDate = (array) => {
  let object = {};

  for (let element of array) {
    let month = element.date.getMonth() + 1;
    let year = element.date.getYear();
    let key = `${month}-${year}`;
    if (object[key]) {
      object[key].push(element);
    } else {
      object[key] = [];
      object[key].push(element);
    }
  }

  return object;
};

const mergeSortAndGroup = (array) => {
  let sorted = mergeSort(array);
  let grouped = groupByDate(sorted);
  return grouped;
};

module.exports = mergeSortAndGroup;
