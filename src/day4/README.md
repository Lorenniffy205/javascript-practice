# Day 4 — JavaScript practice

## Goal

Learn event-driven automation, retry logic, timeouts, and report generation.

## Tasks for today

1. Run `node src/day4/day4.js`
2. Read the output in the terminal
3. Open `src/day4/day4.js`
4. Add a test case to `testCases`
5. Add a timeout or retry helper function
6. Save and run again

## Practice items

- Node.js `EventEmitter`
- event listeners and event names
- retry logic for flaky tests
- timeout wrapper with `Promise.race`
- summarizing results from event-driven runs
- writing JSON and HTML reports

## Why this helps

SDET automation often needs to handle:

- retries for flaky steps
- timeout failures
- pass/fail events
- test reporting for stakeholders

## Extra practice

- add a `test:timeout` listener
- add a `test:retry` listener
- improve report formatting in `src/day4/report.html`
- build a `runParallelTestSuite` helper

## Next step

After Day 4, move to Day 5 and practice:

- browser automation with Playwright or Puppeteer
- data-driven test scripts
- real UI event handling
