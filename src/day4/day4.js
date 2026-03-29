import { EventEmitter } from 'events';
import { writeFile } from 'fs/promises';

const projectName = 'javascript-practice';
const day = 4;
let practiceStatus = 'in progress';
const maxRetries = 2;
const timeoutMs = 220;

const testCases = [
  { id: 1, name: 'login flow', duration: 100 },
  { id: 2, name: 'checkout flow', duration: 180 },
  { id: 3, name: 'search flow', duration: 90 },
  { id: 4, name: 'profile update', duration: 140 },
];

const eventBus = new EventEmitter();

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const withTimeout = (promise, ms) =>
  Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), ms)
    ),
  ]);

function randomOutcome(chance = 0.75) {
  return Math.random() < chance;
}

function formatTest(test) {
  return `${test.id}. ${test.name} (${test.duration}ms)`;
}

async function simulateTestRun(test) {
  await delay(test.duration);
  if (!randomOutcome()) {
    throw new Error('failed');
  }
  return { ...test, passed: true, finishedAt: Date.now() };
}

function createResult(test, passed, reason = '') {
  return { ...test, passed, reason, finishedAt: Date.now() };
}

async function runTestCase(test, attempt = 1) {
  const metadata = { ...test, attempt };
  eventBus.emit('test:start', metadata);

  try {
    const result = await withTimeout(simulateTestRun(test), timeoutMs);
    const finalResult = { ...result, attempt };
    eventBus.emit('test:pass', finalResult);
    return finalResult;
  } catch (error) {
    const result = createResult(test, false, error.message);
    const eventName = error.message === 'timeout' ? 'test:timeout' : 'test:fail';
    eventBus.emit(eventName, { ...result, attempt });
    return { ...result, attempt };
  }
}

async function executeWithRetry(test) {
  let attempt = 0;
  let result = null;

  while (attempt < maxRetries + 1) {
    attempt += 1;
    result = await runTestCase(test, attempt);

    if (result.passed) {
      return result;
    }

    if (attempt <= maxRetries) {
      eventBus.emit('test:retry', { ...result, nextAttempt: attempt + 1 });
      await delay(120);
    }
  }

  return { ...result, final: true };
}

async function runTestSuite(tests) {
  const results = [];
  for (const test of tests) {
    const result = await executeWithRetry(test);
    results.push(result);
  }
  eventBus.emit('suite:complete', results);
  return results;
}

function summarize(results) {
  const total = results.length;
  const passed = results.filter(result => result.passed).length;
  const failed = total - passed;
  const timeouts = results.filter(r => r.reason === 'timeout').length;
  const retries = results.reduce((sum, result) => sum + (result.attempt - 1), 0);
  const duration = results.reduce((sum, result) => sum + result.duration, 0);
  return { total, passed, failed, timeouts, retries, duration };
}

function buildHtmlReport(report) {
  const rows = report.tests
    .map(
      test => `<tr><td>${test.id}</td><td>${test.name}</td><td>${test.duration}</td><td>${test.passed}</td><td>${test.reason || ''}</td><td>${test.attempt}</td></tr>`
    )
    .join('');

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Day 4 Test Report</title>
  <style>body{font-family:Arial,sans-serif;}table{border-collapse:collapse;width:100%;}td,th{border:1px solid #ccc;padding:8px;text-align:left;}</style>
</head>
<body>
  <h1>Day 4 Test Report</h1>
  <p>Project: ${report.projectName}</p>
  <p>Day: ${report.day}</p>
  <p>Completed at: ${report.completedAt}</p>
  <p>Passed: ${report.summary.passed} / ${report.summary.total}</p>
  <p>Timeouts: ${report.summary.timeouts}</p>
  <p>Retries: ${report.summary.retries}</p>
  <table>
    <thead><tr><th>ID</th><th>Name</th><th>Duration</th><th>Passed</th><th>Reason</th><th>Attempts</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>
</body>
</html>`;
}

function setupListeners() {
  eventBus.on('test:start', test => {
    console.log('Starting:', formatTest(test));
  });

  eventBus.on('test:pass', result => {
    console.log('PASS:', result.name, `(attempt ${result.attempt})`);
  });

  eventBus.on('test:fail', result => {
    console.log('FAIL:', result.name, `(attempt ${result.attempt})`, '-', result.reason);
  });

  eventBus.on('test:timeout', result => {
    console.log('TIMEOUT:', result.name, `(attempt ${result.attempt})`);
  });

  eventBus.on('test:retry', result => {
    console.log('RETRY:', result.name, `after attempt ${result.attempt - 1}, next attempt ${result.nextAttempt}`);
  });

  eventBus.on('suite:complete', results => {
    console.log('Test suite complete:', results.length, 'tests');
  });
}

async function writeReport(results) {
  const summary = summarize(results);
  const report = {
    projectName,
    day,
    completedAt: new Date().toISOString(),
    summary,
    tests: results,
  };

  await writeFile('src/day4/report.json', JSON.stringify(report, null, 2));
  await writeFile('src/day4/report.html', buildHtmlReport(report));
  console.log('Saved reports to src/day4/report.json and src/day4/report.html');
}

async function runDay4() {
  console.log('Day 4: Event-driven automation and test reporting');
  console.log('------------------------------------------------');
  console.log('Project:', projectName);
  console.log('Day:', day);
  console.log('Status:', practiceStatus);

  setupListeners();

  const results = await runTestSuite(testCases);
  await writeReport(results);

  practiceStatus = 'Day 4 complete';
  console.log('\nPractice status:', practiceStatus);
  console.log('Next: add an event for retry backoff, build a timeout wrapper, or add a HTML report style.');
}

runDay4().catch(error => {
  console.error('Day 4 script error:', error);
});
