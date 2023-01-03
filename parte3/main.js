const { data } = require('./cases');
const sortAndReduce = require('./sortAndReduce');
const mergeSortAndGroup = require('./mergeSortAndGroup');

async function main() {
  console.time('Execution Time sortAndReduceResult');

  let sortAndReduceResult = await sortAndReduce(data);

  console.timeEnd('Execution Time sortAndReduceResult');

  console.time('Execution Time mergeSortAndGroupResult');

  let mergeSortAndGroupResult = await mergeSortAndGroup(data);

  console.timeEnd('Execution Time mergeSortAndGroupResult');

  console.log(sortAndReduceResult);
  console.log(mergeSortAndGroupResult);
}

main();
