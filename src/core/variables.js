/**
 * src/core/variables.js
 * Notes about JavaScript variables and how to use them.
 */

// 1. Declaration keywords: var, let, const
var visitorCount = 0;
let currentMode = 'idle';
const defaultPort = 3000;

// 2. Hoisting and the Temporal Dead Zone
function explainHoisting() {
  console.log('var before declaration:', hoistedMessage); // undefined
  // console.log(blockMessage); // ReferenceError
  // console.log(constMessage); // ReferenceError

  var hoistedMessage = 'now visible after initialization';
  let blockMessage = 'not available until this line';
  const constMessage = 'also not available until this line';
  console.log('var after declaration:', hoistedMessage);
}

explainHoisting();

// 3. Scope: function vs block
function showScope(useBlock) {
  if (useBlock) {
    var functionVar = 'available throughout the function';
    let blockLetVar = 'available only inside the if block';
    const blockConstVar = 'also only inside the block';
    console.log(blockLetVar, blockConstVar);
  }

  console.log(functionVar);
  // console.log(blockLetVar); // ReferenceError
  // console.log(blockConstVar); // ReferenceError
}

showScope(true);

// 4. const with objects and arrays
const author = { name: 'Amina', age: 30 };
author.age = 31; // allowed: object contents can change

const tiles = [1, 2, 3];
tiles.push(4); // allowed: array contents can change

// 5. Variables can hold any type
let data = 100;
data = 'one hundred';
data = false;
data = null;
data = undefined;

// 6. Destructuring with defaults
const profile = { firstName: 'Nina', lastName: 'Jones', country: 'UK' };
const { firstName, country, city = 'Unknown' } = profile;

const marks = [10, 20, 30];
const [topMark, secondMark, ...restMarks] = marks;

// 7. Spread and rest
const userCopy = { ...profile, verified: true };
const moreMarks = [...marks, 40, 50];

function addNumbers(...values) {
  return values.reduce((total, value) => total + value, 0);
}

const sum = addNumbers(1, 2, 3, 4);

// 8. Swap values cleanly
let firstValue = 1;
let secondValue = 2;
[firstValue, secondValue] = [secondValue, firstValue];

// 9. Closure example for private state
function createCounter(initial = 0) {
  let count = initial;
  return {
    increment() {
      count += 1;
      return count;
    },
    decrement() {
      count -= 1;
      return count;
    },
    current() {
      return count;
    },
  };
}

const counter = createCounter(5);
counter.increment();
counter.increment();

// 10. Immutable update pattern with object spread
const state = {
  user: { name: 'Emma', roles: ['user'] },
  count: 0,
};

const nextState = {
  ...state,
  count: state.count + 1,
  user: {
    ...state.user,
    roles: [...state.user.roles, 'admin'],
  },
};

// 11. Computed property names
const scoreKey = 'score';
const finalResult = {
  [scoreKey]: 100,
};

export {
  visitorCount,
  currentMode,
  defaultPort,
  author,
  tiles,
  data,
  firstName,
  country,
  city,
  userCopy,
  moreMarks,
  sum,
  firstValue,
  secondValue,
  counter,
  nextState,
  finalResult,
};
