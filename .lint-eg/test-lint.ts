// Test file for ESLint - DELETE ME AFTER TESTING

// Bad formatting - mixed quotes, spacing, semicolons
const   foo="bar"
const baz = "test";
const obj={a:1,b:2,c:3}

// Unused variables
const unusedVar = 'never used'
let anotherUnused = 123

// Explicit any (should warn/error)
function badFunction(param: any) {
  console.log(param)
  return param
}

// Missing return type
function noReturnType(x: number) {
  return x * 2
}

// Inconsistent indentation
function badIndent() {
return "bad"
}

// Trailing spaces and multiple empty lines



const multipleEmptyLines = true


// Bad async/await - floating promise
async function badAsync() {
  const promise = Promise.resolve(123)
  promise // Should await this!
}

// Mixed operators without spaces
const calc=1+2*3/4-5

// Object with bad spacing
const settings = {name:"test",value:42,enabled:true}

// Array with inconsistent formatting
const arr = [1,2,3,
4,5,6]

// No semicolon
const noSemi = 'test'

// Double equals instead of triple
if (foo == "bar") {
  console.log("bad comparison")
}

// Var instead of const/let
var oldStyle = "don't use var"

// Export with bad formatting
export   {foo,baz,calc,noSemi,obj,badFunction,noReturnType,settings,arr}

