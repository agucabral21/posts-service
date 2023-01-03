const { case1 } = require('./cases');
const sortAndReduce = require('./sortAndReduce');
const mergeSortAndGroup = require('./mergeSortAndGroup');

async function main() {
  console.time('Time sortAndReduceResult');
  let sortAndReduceResult = await sortAndReduce(case1);
  console.timeEnd('Time sortAndReduceResult');

  console.time('Time mergeSortAndGroupResult');
  let mergeSortAndGroupResult = await mergeSortAndGroup(case1);
  console.timeEnd('Time mergeSortAndGroupResult');

  //Muestro resultados
  console.log(sortAndReduceResult);
  console.log(mergeSortAndGroupResult);
}

main();
