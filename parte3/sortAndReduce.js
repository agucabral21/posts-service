let sortArrayByDate = (array) => {
  return array.sort((a, b) => a.date - b.date);
};

let groupByDayMonth = (array) => {
  return array.reduce((acc, curr) => {
    let month = curr.date.getMonth() + 1;
    let year = curr.date.getYear();
    const key = `${month}/${year}`;
    if (acc[key]) {
      acc[key].push(curr);
    } else {
      acc[key] = [];
      acc[key].push(curr);
    }
    return acc;
  }, {});
};

let sortAndReduce = async (array) => {
  let sorted = sortArrayByDate(array);
  let grouped = groupByDayMonth(sorted);
  return grouped;
};

module.exports = sortAndReduce;
