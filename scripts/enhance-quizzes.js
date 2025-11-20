#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Question type distribution for 50 questions
// 25 multiple-choice, 10 true-false, 5 multiple-select, 5 code-completion, 3 coding-exercise, 2 multi-part
const TARGET_DISTRIBUTION = {
  'multiple-choice': 25,
  'true-false': 10,
  'multiple-select': 5,
  'code-completion': 5,
  'coding-exercise': 3,
  'multi-part': 2
};

// Enhanced question templates by chapter
const ENHANCEMENTS = {
  'quiz-02-chapter-2': {
    topic: 'Variables',
    trueFalseQuestions: [
      { q: 'Variable names in Python are case-sensitive', a: true, exp: 'Python is case-sensitive, so "age" and "Age" are different variables.' },
      { q: 'You must declare variable types in Python before using them', a: false, exp: 'Python is dynamically typed - types are inferred automatically.' },
      { q: 'Variable names can start with a number', a: false, exp: 'Variable names must start with a letter or underscore.' },
      { q: 'The underscore (_) is a valid character in variable names', a: true, exp: 'Underscores are commonly used in Python variable names (snake_case).' },
      { q: 'You can reassign a variable to a different type in Python', a: true, exp: 'Python allows dynamic typing - variables can be reassigned to any type.' },
      { q: 'Reserved keywords like "class" can be used as variable names', a: false, exp: 'Reserved keywords are protected and cannot be used as variable names.' },
      { q: 'Variable names are stored in memory along with their values', a: true, exp: 'Python stores both the variable name and its value in memory.' },
      { q: 'Multiple variables can reference the same object in memory', a: true, exp: 'Python uses references, so multiple variables can point to the same object.' },
      { q: 'The del keyword can be used to delete a variable', a: true, exp: 'The del statement removes a variable from the namespace.' },
      { q: 'Variables declared inside a function are global by default', a: false, exp: 'Variables inside functions are local unless declared with the global keyword.' }
    ],
    multipleSelectQuestions: [
      { q: 'Which are valid variable naming conventions?', opts: ['snake_case', 'camelCase', 'PascalCase', '2fast'], correct: ['snake_case', 'camelCase', 'PascalCase'], exp: 'All three are valid formats, though snake_case is preferred in Python. Names starting with numbers are invalid.' },
      { q: 'Which characters can appear in a Python variable name?', opts: ['Letters', 'Numbers', 'Underscores', 'Hyphens'], correct: ['Letters', 'Numbers', 'Underscores'], exp: 'Variable names can contain letters, numbers, and underscores, but not hyphens.' },
      { q: 'Which are mutable data types in Python?', opts: ['list', 'tuple', 'dict', 'set'], correct: ['list', 'dict', 'set'], exp: 'Lists, dictionaries, and sets are mutable. Tuples are immutable.' },
      { q: 'Which operations can change a variable\'s type?', opts: ['Reassignment', 'Type conversion', 'Arithmetic', 'Deletion'], correct: ['Reassignment', 'Type conversion'], exp: 'Reassignment and explicit type conversion can change a variable\'s type.' },
      { q: 'Which are valid ways to create multiple variables?', opts: ['a = b = c = 0', 'a, b, c = 1, 2, 3', 'a; b; c = 1', 'a = 1; b = 2; c = 3'], correct: ['a = b = c = 0', 'a, b, c = 1, 2, 3', 'a = 1; b = 2; c = 3'], exp: 'Python supports chained assignment, tuple unpacking, and semicolon-separated statements.' }
    ],
    codeCompletionQuestions: [
      { q: 'Complete the code to create a variable named "count" with value 10:', starter: '___ = ___', answer: 'count = 10', acceptable: ['count = 10', 'count=10'], exp: 'Variables are created using the assignment operator (=).' },
      { q: 'Complete the code to swap two variables:', starter: 'a, b = ___, ___', answer: 'a, b = b, a', acceptable: ['a, b = b, a', 'a,b=b,a'], exp: 'Python allows tuple unpacking for swapping variables in one line.' },
      { q: 'Complete the code to create a constant:', starter: '___ = 3.14', answer: 'PI = 3.14', acceptable: ['PI = 3.14', 'PI=3.14', 'PI = 3.14159'], exp: 'Constants in Python are named using ALL_CAPS by convention.' },
      { q: 'Complete the code to unpack a list:', starter: 'first, ___, last = [1, 2, 3]', answer: 'first, second, last = [1, 2, 3]', acceptable: ['first, second, last = [1, 2, 3]', 'first,second,last=[1,2,3]'], exp: 'Sequence unpacking assigns list elements to variables.' },
      { q: 'Complete the code to delete a variable:', starter: '___ x', answer: 'del x', acceptable: ['del x', 'del x'], exp: 'The del keyword removes a variable from memory.' }
    ],
    codingExercises: [
      { q: 'Variable Swap', desc: 'Write code to swap the values of two variables a and b without using a third variable.', starter: 'a = 5\\nb = 10\\n# Swap a and b\\n', tests: [{ desc: 'a becomes 10', exp: '10' }, { desc: 'b becomes 5', exp: '5' }] },
      { q: 'Multiple Assignment', desc: 'Create three variables x, y, z all initialized to 0 in one line.', starter: '# Create x, y, z = 0\\n', tests: [{ desc: 'All variables are 0', exp: '0' }] },
      { q: 'Type Conversion', desc: 'Convert the string "42" to an integer and store in variable num.', starter: 'text = "42"\\n# Convert to integer\\n', tests: [{ desc: 'num is integer 42', exp: '42' }] }
    ]
  },
  // Similar patterns for other quizzes
  'quiz-03-chapter-3': {
    topic: 'Computing Fundamentals',
    trueFalseQuestions: [
      { q: 'Binary uses only 0s and 1s', a: true, exp: 'Binary is a base-2 number system using only 0 and 1.' },
      { q: 'Hexadecimal uses base 10', a: false, exp: 'Hexadecimal is base 16, using digits 0-9 and letters A-F.' },
      { q: 'RAM is volatile memory', a: true, exp: 'RAM loses its contents when power is turned off.' },
      { q: 'The CPU executes instructions', a: true, exp: 'The CPU (Central Processing Unit) executes program instructions.' },
      { q: 'Hard drives are faster than RAM', a: false, exp: 'RAM is much faster than hard drives or SSDs.' },
      { q: 'All data in computers is stored as binary', a: true, exp: 'All digital data is ultimately represented as binary (0s and 1s).' },
      { q: 'The operating system manages hardware resources', a: true, exp: 'The OS controls hardware and provides services to applications.' },
      { q: '8 bits equal 1 byte', a: true, exp: 'A byte consists of 8 bits.' },
      { q: 'Input devices only include keyboards', a: false, exp: 'Input devices include keyboards, mice, scanners, cameras, etc.' },
      { q: 'Algorithms are step-by-step procedures', a: true, exp: 'An algorithm is a defined sequence of steps to solve a problem.' }
    ]
  }
};

function convertQuestionsToMixedTypes(quiz, quizId) {
  const enhancements = ENHANCEMENTS[quizId];
  if (!enhancements) return quiz;

  const questions = quiz.questions;
  const newQuestions = [];
  
  // Keep first 25 as multiple-choice
  newQuestions.push(...questions.slice(0, 25));
  
  // Add 10 true-false questions (replace q26-q35)
  if (enhancements.trueFalseQuestions) {
    enhancements.trueFalseQuestions.forEach((tf, idx) => {
      newQuestions.push({
        id: `q${26 + idx}`,
        question: tf.q,
        type: 'true-false',
        points: 10,
        correctAnswer: tf.a,
        explanation: tf.exp
      });
    });
  }
  
  // Add 5 multiple-select questions (q36-q40)
  if (enhancements.multipleSelectQuestions) {
    enhancements.multipleSelectQuestions.forEach((ms, idx) => {
      newQuestions.push({
        id: `q${36 + idx}`,
        question: ms.q,
        type: 'multiple-select',
        points: 15,
        options: ms.opts.map((opt, i) => ({ id: String.fromCharCode(97 + i), text: opt })),
        correctAnswers: ms.correct.map(c => String.fromCharCode(97 + ms.opts.indexOf(c))),
        explanation: ms.exp
      });
    });
  }
  
  // Add 5 code-completion questions (q41-q45)
  if (enhancements.codeCompletionQuestions) {
    enhancements.codeCompletionQuestions.forEach((cc, idx) => {
      newQuestions.push({
        id: `q${41 + idx}`,
        question: cc.q,
        type: 'code-completion',
        points: 15,
        starterCode: cc.starter,
        correctAnswer: cc.answer,
        acceptableAnswers: cc.acceptable,
        explanation: cc.exp,
        language: 'python'
      });
    });
  }
  
  // Add 3 coding-exercise questions (q46-q48)
  if (enhancements.codingExercises) {
    enhancements.codingExercises.forEach((ce, idx) => {
      newQuestions.push({
        id: `q${46 + idx}`,
        question: ce.q,
        type: 'coding-exercise',
        points: 20,
        description: ce.desc,
        starterCode: ce.starter,
        language: 'python',
        testCases: ce.tests.map((t, i) => ({
          id: `t${i + 1}`,
          description: t.desc,
          expectedOutput: t.exp,
          isHidden: false
        })),
        hints: []
      });
    });
  }
  
  // Add 2 multi-part questions (q49-q50)
  newQuestions.push({
    id: 'q49',
    question: `${enhancements.topic} Fundamentals - Part 1`,
    type: 'multi-part',
    points: 15,
    parts: [
      questions[0] ? { ...questions[0], id: 'q49a', points: 5 } : null,
      questions[1] ? { ...questions[1], id: 'q49b', points: 5 } : null,
      {
        id: 'q49c',
        type: 'true-false',
        question: `${enhancements.topic} concepts are important for programming`,
        points: 5,
        correctAnswer: true,
        explanation: 'Understanding fundamentals is crucial for effective programming.'
      }
    ].filter(Boolean)
  });
  
  newQuestions.push({
    id: 'q50',
    question: `${enhancements.topic} Application`,
    type: 'multi-part',
    points: 15,
    parts: [
      questions[2] ? { ...questions[2], id: 'q50a', points: 10 } : null,
      {
        id: 'q50b',
        type: 'true-false',
        question: 'Practice is essential for mastery',
        points: 5,
        correctAnswer: true,
        explanation: 'Consistent practice is key to mastering programming concepts.'
      }
    ].filter(Boolean)
  });
  
  quiz.questions = newQuestions;
  return quiz;
}

// Main execution
const quizzesDir = path.join(__dirname, '../content/courses/python-basics/quizzes');
const quizzesToUpdate = [
  'quiz-02-chapter-2.json',
  'quiz-03-chapter-3.json'
];

quizzesToUpdate.forEach(filename => {
  const filePath = path.join(quizzesDir, filename);
  const quiz = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const quizId = filename.replace('.json', '');
  
  const updatedQuiz = convertQuestionsToMixedTypes(quiz, quizId);
  
  fs.writeFileSync(filePath, JSON.stringify(updatedQuiz, null, 2));
  console.log(`✓ Updated ${filename}`);
});

console.log('\\nDone! Updated quizzes with diverse question types.');
