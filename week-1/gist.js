//callbacks
function sum(num1, num2, fntocall) {
    let result = num1 + num2;
    fntocall(result);
}

function displayResult(data) {
    console.log("Result of the sum is : " + data);
}

function displayResultPassive(data) {
    console.log("Sum's result is : " + data);
}

setTimeout(sum,4*1000);
// You are only allowed to call one function after this
// How will you displayResult of a sum
console.log(sum(2,7,displayResultPassive));
