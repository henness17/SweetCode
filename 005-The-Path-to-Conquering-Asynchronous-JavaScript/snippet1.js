// Define functions
var runThisFirst = function(callback){
    setTimeout(function(){ 
        x = 5;
        callback(); // runThisSecond is called
    }, 3000);
}

var runThisSecond = function(){
    alert(x);
}

// Run functions, pass runThisSecond as the callback argument 
var x;
runThisFirst(runThisSecond);