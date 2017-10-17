function somePromise() {
  var promise = new Promise((resolve, reject) => {
    var x = 5;
    // Now wait a bit for an "async" call
    setTimeout(function() {
      resolve(x); // Return your promise!
    }, 3000);
  });
  return promise;
}

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

var chainValue = somePromise().then(anotherPromise);
alert(chainValue); // This is executing before chainValue is resolved