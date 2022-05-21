// Your fetch requests will live here!

function getPromise(dataType) {
  return fetch(`https://fitlit-api.herokuapp.com/api/v1/${dataType}`).then(response => response.json())
}
//Able to tack on 

  //populate all databases
let allData = Promise.all([getPromise('users'), getPromise('sleep'), getPromise('activity'), getPromise('hydration')]);



export {
allData
}
