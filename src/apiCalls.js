// Your fetch requests will live here!
import User from './User';

function getPromise(dataType) {
  let users = fetch(`https://fitlit-api.herokuapp.com/api/v1/${dataType}`).then(response => response.json())
}

function initialSetup() {
  //populate all databases
  Promise.all([getPromise(users), getPromise(sleep), getPromise(activity), getPromise(hydration)])
  //run the initial page setup stuff that happens on page load and won't write if we put it elsewhere because it's waiting for the fetch.
}

console.log('I will be a fetch request!')
