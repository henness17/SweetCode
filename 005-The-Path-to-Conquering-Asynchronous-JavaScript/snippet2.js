var somePromise = new Promise((resolve, reject) => {
  var x = 5;
  // Now wait a bit for an "async" call
  setTimeout(function(){
    resolve(x); // Return your promise!
  }, 3000);
});

somePromise.then((somePromisesReturnValue) => {
  alert("Check it out: " + somePromisesReturnValue);
});