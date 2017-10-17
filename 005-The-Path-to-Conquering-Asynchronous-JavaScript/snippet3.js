function anotherPromise(somePromisesReturnValue) {
  var promise = new Promise((resolve, reject) => {
    var y = somePromisesReturnValue + 1; // 6
    // Now wait a bit for an "async" call
    setTimeout(function() {
      alert("Resolving: " + y);
      resolve(y); // Return your promise!
    }, 1000);
  });
  return promise;
}

somePromise().then(anotherPromise); 