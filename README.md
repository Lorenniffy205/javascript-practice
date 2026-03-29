# Software Development Engineer in Test (SDET) Guide

## Overview
This document serves as a comprehensive guide for aspiring Software Development Engineers in Test (SDETs). It covers essential practices, recommended learning paths, project structure, and practical examples.

## Why JavaScript for SDETs?
JavaScript is a versatile language that is widely used in web development. As an SDET, knowing JavaScript allows you to write comprehensive tests for web applications and engage with developers using the same language.

## ISTQB Certification
The ISTQB (International Software Testing Qualifications Board) certification is a globally recognized credential for software testers. It helps validate your testing skills and knowledge, opening doors to career advancement.

## Quick start for this practice repo
- `npm install` (optional, no dependencies yet)
- `npm run day1`
- After Day 1, run `npm run day2`
- Open `src/day1/day1.js` and `src/day2/day2.js`
- Edit the files and rerun to learn by doing

## Learning Path
| Stage                | Topics                                | Resources                             |
|---------------------|---------------------------------------|---------------------------------------|
| Beginner            | JavaScript Basics                     | [MDN Web Docs](https://developer.mozilla.org) |
| Intermediate        | Testing Frameworks (Jest, Mocha)     | [Jest Documentation](https://jestjs.io/docs/getting-started) |
| Advanced            | API Testing, CI/CD                   | [Postman Learning Center](https://learning.postman.com) |

## Project Structure
```
/project-root
    ├── src
    │   └── (source code)
    ├── tests
    │   ├── api
    │   ├── unit
    │   └── integration
    └── README.md
```

## Getting Started Guide
1. Clone the repository: `git clone https://github.com/sdet-kadarisuresh/javascript-practice.git`
2. Install dependencies: `npm install`
3. Run tests: `npm test`

## Practical Examples
### API Testing
```javascript
const fetch = require('node-fetch');

async function testApi() {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.assert(data.success, 'API call failed');
}
testApi();
```

### Array Manipulation
```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]
```

### Async Patterns
```javascript
async function fetchData() {
    const data = await fetch('https://api.example.com/data');
    return data.json();
}
```

## Core Concepts Breakdown
- **Testing Frameworks:** Understanding the life cycles of testing frameworks.
- **Test Automation:** Importance of automating tests to improve efficiency.
- **Continuous Integration:** Setting up CI pipelines for automated testing.

## Daily Challenges
To enhance your skills, take on daily challenges such as:
- Writing test cases for new features.
- Refactoring tests for better readability.
- Exploring new libraries or frameworks.

## Resources
- [ISTQB Official Site](https://www.istqb.org/)
- [JavaScript Info](https://javascript.info/)
- [Scrum Guide](https://scrumguides.org/)

## Contributing Guidelines
1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Push to the branch and create a pull request.

## Career Impact
A well-versed SDET can significantly impact the quality of software products and streamline the development process. This guide aims to equip you with the knowledge and skills to succeed as an SDET.

## Conclusion
Following this guide will help you build a strong foundation as a Software Development Engineer in Test and prepare you for the challenges ahead. 
