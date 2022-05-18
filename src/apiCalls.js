// Your fetch requests will live here!

function getPromise(dataType) {
  return fetch(`https://fitlit-api.herokuapp.com/api/v1/${dataType}`).then(response => response.json())
}

function populateDatabases() {
  //populate all databases
  Promise.all([getPromise('users'), getPromise('sleep'), getPromise('activity'), getPromise('hydration')]).then(data => {
    userData = data[0];
    sleepData = data[1];
    activityData = data[2];
    hydratationData = data[3];
    console.log(userData);
  })


  //run the initial page setup stuff that happens on page load and won't write if we put it elsewhere because it's waiting for the fetch.
}

console.log('I will be a fetch request!')
module.exports = {
populateDatabases
}
