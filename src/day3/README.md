# Day 3 — JavaScript practice

## Goal

Deepen your async skills with promises, retries, parallel operations, and real SDET data flow.

## Tasks for today

1. Run `node src/day3/day3.js`
2. Read the terminal output carefully
3. Open `src/day3/day3.js`
4. Add a new async helper function:
   - retry helper
   - timeout wrapper
   - parallel fetch helper
5. Add a new simulated API call to `runSequentialApiCalls`
6. Save and run again

## Practice items

- `Promise` constructor
- `async` / `await`
- `try` / `catch` / `finally`
- `Promise.allSettled`
- `Promise.any`
- sequential vs parallel async flow
- retry logic and backoff
- mock API responses with `setTimeout`

## Why this helps

Advanced test automation needs robust async control. Real SDET work includes:
- waiting for UI or network events
- handling partial failures
- retrying flaky operations
- combining multiple async sources
- summarizing test results after async work

## Extra practice

- add `Promise.allSettled` processing for multiple mock API tasks
- use `Promise.any` to accept the first successful response
- write a helper that cancels after a timeout
- simulate a failing API and recover gracefully

## Next step

After Day 3, move to Day 4 and practice:
- browser DOM automation
- event handling
- real test automation scripts
