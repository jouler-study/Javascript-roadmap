// --- Example 1: Basic setTimeout vs Synchronous Code ---
console.log('--- Example 1: Basic setTimeout vs Synchronous Code ---');
console.log('A');
setTimeout(() => {
  console.log('B');
}, 0);
console.log('C');

// --- Example 2: Promises (Microtasks) vs setTimeout (Macrotasks) ---
setTimeout(() => {
  console.log('\n--- Example 2: Promises (Microtasks) vs setTimeout (Macrotasks) ---');
  console.log('Start');
  setTimeout(() => {
    console.log('Timeout');
  }, 0);
  Promise.resolve().then(() => {
    console.log('Promise');
  });
  console.log('End');
}, 100);

// --- Example 3: Nested Microtasks and Macrotasks ---
setTimeout(() => {
  console.log('\n--- Example 3: Nested Microtasks and Macrotasks ---');
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
}, 300);

// --- Example 4: Master Example (Mixing Sync, Microtasks, Macrotasks) ---
setTimeout(() => {
  console.log('\n--- Example 4: Master Example (Mixing Sync, Microtasks, Macrotasks) ---');
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
}, 600);

// --- Example 5: async/await, Promises, and setTimeout ---
setTimeout(() => {
  console.log('\n--- Example 5: async/await, Promises, and setTimeout ---');
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
}, 900);