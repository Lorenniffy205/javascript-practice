console.log('Day 2: JavaScript functions and arrays');
console.log('---------------------------------------');

const projectName = 'javascript-practice';
const day = 2;
let practiceStatus = 'in progress';

const testTasks = [
  { id: 1, title: 'Review Day 1', completed: true, minutes: 20, type: 'review' },
  { id: 2, title: 'Write a helper function', completed: false, minutes: 30, type: 'code' },
  { id: 3, title: 'Use map and filter', completed: false, minutes: 25, type: 'practice' },
  { id: 4, title: 'Compute summaries with reduce', completed: false, minutes: 20, type: 'analysis' },
];

function formatTask({ id, title, completed, minutes }) {
  return `${id}. ${title} [${completed ? 'done' : 'todo'}] (${minutes}m)`;
}

const renderTask = task => formatTask(task);

const getPendingTasks = tasks => tasks.filter(task => !task.completed);
const getCompletedTasks = tasks => tasks.filter(task => task.completed);
const getTaskTitles = tasks => tasks.map(({ title }) => title);
const totalMinutes = tasks => tasks.reduce((sum, { minutes }) => sum + minutes, 0);
const findTaskById = (tasks, id) => tasks.find(task => task.id === id);
const allTasksCompleted = tasks => tasks.every(task => task.completed);
const hasPendingTasks = tasks => tasks.some(task => !task.completed);

function updateTaskStatus(tasks, id, completed = true) {
  return tasks.map(task => {
    if (task.id === id) {
      return { ...task, completed };
    }
    return task;
  });
}

const addTask = (tasks, newTask) => [...tasks, newTask];

function buildSummary(tasks) {
  const completed = getCompletedTasks(tasks).length;
  const pending = getPendingTasks(tasks).length;
  const minutes = totalMinutes(tasks);
  return `Task summary: ${completed} done, ${pending} todo, ${minutes} total minutes`;
}

console.log('Project:', projectName);
console.log('Day:', day);
console.log('Status:', practiceStatus);

console.log('\nAll tasks:');
testTasks.forEach(task => console.log(' ', renderTask(task)));

const pendingTasks = getPendingTasks(testTasks);
console.log('\nPending tasks (filter):', pendingTasks.length);
pendingTasks.forEach(task => console.log(' ', renderTask(task)));

const taskTitles = getTaskTitles(testTasks);
console.log('\nTask titles (map):', taskTitles.join(', '));

const summary = buildSummary(testTasks);
console.log('\n' + summary);

const foundTask = findTaskById(testTasks, 2);
console.log('\nfindTaskById(2):', foundTask ? formatTask(foundTask) : 'not found');

const hasPending = hasPendingTasks(testTasks);
console.log('Has pending tasks?', hasPending);

const allComplete = allTasksCompleted(testTasks);
console.log('All tasks complete?', allComplete);

const updatedTasks = updateTaskStatus(testTasks, 2, true);
console.log('\nUpdated task 2 to done:');
updatedTasks.forEach(task => console.log(' ', renderTask(task)));

const moreTasks = addTask(updatedTasks, { id: 5, title: 'Write a test case', completed: false, minutes: 15, type: 'coding' });
console.log('\nAdded a new task with addTask():');
moreTasks.forEach(task => console.log(' ', renderTask(task)));

const sortedByMinutes = [...moreTasks].sort((a, b) => a.minutes - b.minutes);
console.log('\nTasks sorted by minutes:');
sortedByMinutes.forEach(task => console.log(' ', renderTask(task)));

practiceStatus = 'Day 2 complete';
console.log('\nPractice status:', practiceStatus);
console.log('Next: change a function or add a new helper that works with the task data.');
