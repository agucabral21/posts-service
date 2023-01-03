const { data } = require('./cases');

const merge = (left, right) => {
  let arr = [];
  //mientras las dos mitades tengan elementos
  while (left.length && right.length) {
    //Comparo el primer elemento de cada lado e inserto el de menor valor, quitandolo de dicho arreglo
    if (left[0].date < right[0].date) {
      arr.push(left.shift());
    } else {
      arr.push(right.shift());
    }
  }
  //devuelvo el arreglo nuevo, y los restos de los otros dos arreglos
  return [...arr, ...left, ...right];
};

const mergeSort = (array) => {
  //parte recursiva que divide los arreglos en dos hasta llegar a elementos simples
  const half = array.length / 2;

  if (array.length < 2) {
    return array;
  }
  const left = array.splice(0, half);
  return merge(mergeSort(left), mergeSort(array));
};

const groupByDate = (array) => {
  let object = {};
  //para cada elemento tomo su mes y año e insterto en el nuevo objeto en la propiedad que tiene como key `${month}-${year}`
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
