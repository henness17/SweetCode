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
      resolve(y); // Return your promise!
    }, 1000);
  });
  return promise;
}

const main = async () => {
  var a = await somePromise();
  var b = await anotherPromise(a);
  alert(b);
}
main();