# Node.js Fundamentals

## What is Node.js?
An app that is a runtime environment for the purpose of using JS outside the browser

## How does Node.js differ from running JavaScript in the browser?
Node.js allows the use of JS for a broader ranges of tasks beyond website manipulation and frees JS from the browser sandbox.

## What is the V8 engine, and how does Node use it?
It is what Node uses to parse and execute JS

## What are some key use cases for Node.js?
Node allows JS to be used for nearly anything that other languages would permit including writing server apps and managing files on the local machine

## Explain the difference between CommonJS and ES Modules. Give a code example of each.
There are several subtle differences and they have a different history but most apparent is CommonJS uses require() for importing and module.exports for exporting wheras modules uses Uses import and export keywords.

**CommonJS (default in Node.js):**
```js
const module = require('./module');
module.exports = function myFunction() {
  return 'Hello';
};
```

**ES Modules (supported in modern Node.js):**
```js
import module from './module.js';
export default function myFunction() {
  return 'Hello';
}
```
