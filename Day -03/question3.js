function makeGreeter (greeting){
  return function (name) {
    return greeting + " " + name;
  };
}
const greet = makeGreeter("Hello")
console.log(greet("Asha"))