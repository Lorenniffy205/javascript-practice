console.log('Day 3: Async, Promises and real-time flow');
console.log('-----------------------------------------');

const projectName = 'javascript-practice';
const day = 3;
let practiceStatus = 'in progress';

const testResults = [
  { id: 1, name: 'login test', duration: 120, passed: true },
  { id: 2, name: 'checkout test', duration: 210, passed: false },
  { id: 3, name: 'search test', duration: 90, passed: true },
  { id: 4, name: 'profile update test', duration: 150, passed: true },
];

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function simulateApiCall(data, delayMs = 500, fail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fail) {
        reject(new Error('Simulated API failure'));
        return;
      }
      resolve({ status: 200, data, timestamp: Date.now() });
    }, delayMs);
  });
}

function summarizeResults(results) {
  const total = results.length;
  const passed = results.filter(test => test.passed).length;
  const failed = total - passed;
  const totalDuration = results.reduce((sum, test) => sum + test.duration, 0);
  const averageDuration = total ? Math.round(totalDuration / total) : 0;
  return { total, passed, failed, totalDuration, averageDuration };
}

function formatSummary(summary) {
  return `Total: ${summary.total}, Passed: ${summary.passed}, Failed: ${summary.failed}, Total duration: ${summary.totalDuration}s, Avg: ${summary.averageDuration}s`;
}

async function loadResults() {
  console.log('Loading test results...');
  const response = await simulateApiCall(testResults, 600);
  console.log('Response status:', response.status);
  return response.data;
}

async function loadResultsWithRetry(maxRetries = 3) {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      attempt += 1;
      console.log(`Attempt ${attempt} to load results...`);
      const response = await simulateApiCall(testResults, 300, attempt < maxRetries - 1 && Math.random() < 0.6);
      return response.data;
    } catch (error) {
      console.warn('Retry failed:', error.message);
      if (attempt >= maxRetries) {
        throw error;
      }
      await delay(200);
    }
  }
}

function getSlowTests(results, threshold = 100) {
  return results.filter(test => test.duration >= threshold);
}

async function runParallelCalls() {
  const actions = ['refresh', 'verify', 'publish'].map((action, index) => {
    return simulateApiCall({ action }, 200 + index * 100, action === 'publish');
  });

  const results = await Promise.allSettled(actions);
  const success = results.filter(item => item.status === 'fulfilled').map(item => item.value.data);
  const failed = results.filter(item => item.status === 'rejected').map(item => item.reason.message);

  console.log('\nPromise.allSettled summary:');
  console.log(' successes:', success.length);
  console.log(' failures:', failed.length);
  console.log(' success payloads:', success);
  console.log(' failure messages:', failed);
}

async function runFirstSuccess() {
  const sources = [
    simulateApiCall({ source: 'A' }, 300, true),
    simulateApiCall({ source: 'B' }, 500),
    simulateApiCall({ source: 'C' }, 400, true),
  ];

  try {
    const first = await Promise.any(sources);
    console.log('\nPromise.any first successful response:', first.data);
  } catch (error) {
    console.error('Promise.any all rejected:', error.errors.map(e => e.message));
  }
}

async function runSequentialApiCalls() {
  const steps = [
    { action: 'login', delay: 200 },
    { action: 'fetch-user', delay: 250 },
    { action: 'fetch-tests', delay: 300 },
  ];

  const results = [];
  for (const step of steps) {
    const response = await simulateApiCall({ action: step.action }, step.delay);
    results.push(response.data);
    console.log(`Completed ${step.action}`);
  }

  return results;
}

async function runAsyncPractice() {
  console.log('Project:', projectName);
  console.log('Day:', day);
  console.log('Status:', practiceStatus);

  try {
    const results = await loadResults();
    const summary = summarizeResults(results);
    console.log('\nResult summary:', formatSummary(summary));

    const slowTests = getSlowTests(results);
    console.log('\nSlow tests:');
    slowTests.forEach(test => console.log(' ', `${test.name} (${test.duration}s)`));

    console.log('\nRunning Promise.allSettled example...');
    await runParallelCalls();

    console.log('\nRunning Promise.any example...');
    await runFirstSuccess();

    console.log('\nRunning sequential API calls...');
    const sequential = await runSequentialApiCalls();
    console.log('Sequential results:', sequential);

    console.log('\nRunning retry helper...');
    const retryResults = await loadResultsWithRetry(4);
    console.log('Retry loaded results count:', retryResults.length);
  } catch (error) {
    console.error('\nCaught async error:', error.message);
  } finally {
    practiceStatus = 'Day 3 complete';
    console.log('\nPractice status:', practiceStatus);
    console.log('Next: add an async test runner or a helper that simulates waiting for a UI update.');
  }
}

runAsyncPractice();
