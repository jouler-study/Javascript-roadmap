# JavaScript Event Loop Examples

This document contains several examples demonstrating how the JavaScript event loop works with synchronous code, macrotasks, microtasks, async/await, and user events.

---

## Example 1: Basic setTimeout vs Synchronous Code

```js
console.log('A');

setTimeout(() => {
  console.log('B');
}, 0);

console.log('C');
```

**How it runs:**
1. `'A'` is logged (sync)
2. `setTimeout` callback is registered (macrotask)
3. `'C'` is logged (sync)
4. Event loop runs the macrotask: `'B'`

**Expected output:**
```
A
C
B
```

---

## Example 2: Promises (Microtasks) vs setTimeout (Macrotasks)

```js
console.log('Start');

setTimeout(() => {
  console.log('Timeout');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise');
});

console.log('End');
```

**How it runs:**
1. `'Start'` is logged (sync)
2. `setTimeout` registered (macrotask)
3. Promise `.then` registered (microtask)
4. `'End'` is logged (sync)
5. Microtasks run: `'Promise'`
6. Macrotask runs: `'Timeout'`

**Expected output:**
```
Start
End
Promise
Timeout
```

---

## Example 3: Nested Microtasks and Macrotasks

```js
console.log('1');

setTimeout(() => {
  console.log('2');
  Promise.resolve().then(() => {
    console.log('3');
  });
}, 0);

Promise.resolve().then(() => {
  console.log('4');
  setTimeout(() => {
    console.log('5');
  }, 0);
});

console.log('6');
```

**How it runs:**
1. `'1'` is logged (sync)
2. `setTimeout` for `'2'` registered (macrotask)
3. Promise `.then` for `'4'` registered (microtask)
4. `'6'` is logged (sync)
5. Microtasks run: `'4'`, then `setTimeout` for `'5'` registered (macrotask)
6. Macrotask runs: `'2'`, then Promise `.then` for `'3'` registered (microtask)
7. Microtasks run: `'3'`
8. Macrotask runs: `'5'`

**Expected output:**
```
1
6
4
2
3
5
```

---

## Example 4: Master Example (Mixing Sync, Microtasks, Macrotasks)

```js
console.log('A');

setTimeout(() => {
  console.log('B');
  Promise.resolve().then(() => {
    console.log('C');
  });
}, 0);

Promise.resolve().then(() => {
  console.log('D');
  setTimeout(() => {
    console.log('E');
  }, 0);
});

queueMicrotask(() => {
  console.log('F');
});

console.log('G');
```

**How it runs:**
1. `'A'` is logged (sync)
2. `setTimeout` for `'B'` registered (macrotask)
3. Promise `.then` for `'D'` registered (microtask)
4. `queueMicrotask` for `'F'` registered (microtask)
5. `'G'` is logged (sync)
6. Microtasks run: `'D'` (registers `setTimeout` for `'E'`), `'F'`
7. Macrotask runs: `'B'`, then Promise `.then` for `'C'` registered (microtask)
8. Microtasks run: `'C'`
9. Macrotask runs: `'E'`

**Expected output:**
```
A
G
D
F
B
C
E
```

---

## Example 5: async/await, Promises, and setTimeout

```js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}

async function async2() {
  console.log("async2");
}

console.log("script start");

setTimeout(function () {
  console.log("setTimeout");
}, 0);

async1();

new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});

console.log("script end");
```

**How it runs:**
1. `'script start'` (sync)
2. `'async1 start'` (sync)
3. `'async2'` (sync)
4. `'promise1'` (sync)
5. `'script end'` (sync)
6. Microtasks: `'async1 end'`, `'promise2'`
7. Macrotask: `'setTimeout'`

**Expected output:**
```
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
```