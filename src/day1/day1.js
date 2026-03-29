console.log('Day 1: JavaScript variables and data types');
console.log('------------------------------------------');

// 1. Declare variables with let and const
const projectName = 'javascript-practice';
const learningGoal = 'Finish Day 1 tasks';
let learningStage = 'Day 1: Basics';
let dailyProgress = 0;

console.log('Project:', projectName);
console.log('Goal:', learningGoal);
console.log('Stage:', learningStage);
console.log('Daily progress:', dailyProgress, 'points');

// 2. Primitive values
const studentName = 'Amina';
let studentExperience = 0; // start from zero
const isSDET = true;

console.log('Name:', studentName);
console.log('Experience:', studentExperience);
console.log('SDET learner:', isSDET);

// 3. Object and array examples
const profile = {
  name: studentName,
  role: 'SDET learner',
  city: 'Remote',
};

const toolList = ['VS Code', 'Node.js', 'Browser DevTools'];

toolList.push('GitHub');

console.log('Profile:', profile);
console.log('Tools:', toolList);

// 4. Destructuring values
const { name, role, city } = profile;
const [firstTool, secondTool] = toolList;

console.log('Name from profile:', name);
console.log('First tools:', firstTool, secondTool);

// 5. Simple function and type checks
function describeLearning(stage, experience) {
  return `${stage} — experience: ${experience} days`;
}

function addExperience(days) {
  studentExperience += days;
  dailyProgress += days;
  return studentExperience;
}

console.log(describeLearning(learningStage, studentExperience));
console.log('New experience after practice:', addExperience(1));
console.log('Daily progress:', dailyProgress, 'points');
console.log('Type of profile:', typeof profile);
console.log('Is toolList array?', Array.isArray(toolList));

// 6. Update a variable
learningStage = 'Day 1 complete';
console.log('Updated stage:', learningStage);

// 7. Use a constant object safely
const task = { name: 'Learn variables', done: false };
task.done = true;

console.log('Task status:', task);

console.log('Run the same file again after editing to build muscle memory.');
console.log('Next: practice let/const, arrays, objects, and small functions.');
