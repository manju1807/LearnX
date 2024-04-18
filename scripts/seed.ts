const { PrismaClient } = require('@prisma/client');

const database = new PrismaClient();

async function main() {
  try {
    await database.question.createMany({
      data: [
        {
          question: 'What is the time complexity of quicksort?',
          options: ['O(n log n)', 'O(n^2)', 'O(n)', 'O(log n)'],
          correctAns: 0,
          categoryId: '80c6e42b-5e81-4660-8eeb-3d939fa5a20e',
        },
        {
          question:
            'Which data structure uses LIFO (Last In, First Out) principle?',
          options: ['Stack', 'Queue', 'Linked List', 'Binary Tree'],
          correctAns: 0,
          categoryId: '80c6e42b-5e81-4660-8eeb-3d939fa5a20e',
        },
        {
          question:
            'Which search algorithm is used for searching in a sorted array?',
          options: [
            'Binary Search',
            'Linear Search',
            'Depth-First Search',
            'Breadth-First Search',
          ],
          correctAns: 0,
          categoryId: '80c6e42b-5e81-4660-8eeb-3d939fa5a20e',
        },
        {
          question: 'Which sorting algorithm has the worst time complexity?',
          options: [
            'Bubble Sort',
            'Quick Sort',
            'Merge Sort',
            'Insertion Sort',
          ],
          correctAns: 1, // Correct answer is at index 1 (Quick Sort)
          categoryId: '80c6e42b-5e81-4660-8eeb-3d939fa5a20e',
        },
        {
          question: 'What is the purpose of a binary tree?',
          options: [
            'To store hierarchical data',
            'To implement sorting algorithms',
            'To search in constant time',
            'To store key-value pairs',
          ],
          correctAns: 0,
          categoryId: '80c6e42b-5e81-4660-8eeb-3d939fa5a20e',
        },
        {
          question: 'What is the purpose of a linked list?',
          options: [
            'To store sequential data',
            'To implement stacks',
            'To perform sorting',
            'To search efficiently',
          ],
          correctAns: 0,
          categoryId: '80c6e42b-5e81-4660-8eeb-3d939fa5a20e',
        },
        {
          question: 'What data structure is used to implement recursion?',
          options: ['Stack', 'Queue', 'Linked List', 'Binary Tree'],
          correctAns: 0,
          categoryId: '80c6e42b-5e81-4660-8eeb-3d939fa5a20e',
        },
        {
          question: 'What is the primary advantage of a hash table?',
          options: [
            'Fast data retrieval',
            'Low memory consumption',
            'Simple implementation',
            'Preserves order of elements',
          ],
          correctAns: 0,
          categoryId: '80c6e42b-5e81-4660-8eeb-3d939fa5a20e',
        },
        {
          question: 'What is the time complexity of a linear search?',
          options: ['O(n)', 'O(log n)', 'O(n^2)', 'O(1)'],
          correctAns: 0,
          categoryId: '80c6e42b-5e81-4660-8eeb-3d939fa5a20e',
        },
        {
          question:
            'Which data structure is typically used for implementing undo functionality in text editors?',
          options: ['Stack', 'Queue', 'Linked List', 'Binary Tree'],
          correctAns: 0,
          categoryId: '80c6e42b-5e81-4660-8eeb-3d939fa5a20e',
        },
        {
          question: 'What is the purpose of a callback function in JavaScript?',
          options: [
            'To handle asynchronous operations',
            'To declare variables',
            'To create loops',
            'To style HTML elements',
          ],
          correctAns: 0,
          categoryId: '711bdefb-23ad-4545-b4d8-52f88f949006',
        },
        {
          question:
            "What is the correct syntax for a 'for' loop in JavaScript?",
          options: [
            'for (var i = 0; i < array.length; i++) {}',
            'for (i = 0; i < array.length; i++) {}',
            'for (i = 0; i++) {}',
            'for (var i < array.length; i++) {}',
          ],
          correctAns: 0,
          categoryId: '711bdefb-23ad-4545-b4d8-52f88f949006',
        },
        {
          question: 'What does DOM stand for in JavaScript?',
          options: [
            'Document Object Model',
            'Data Object Model',
            'Design Object Model',
            'Development Object Model',
          ],
          correctAns: 0,
          categoryId: '711bdefb-23ad-4545-b4d8-52f88f949006',
        },
        {
          question:
            'Which sorting algorithm is NOT commonly implemented in JavaScript?',
          options: [
            'Quick Sort',
            'Merge Sort',
            'Bubble Sort',
            'Insertion Sort',
          ],
          correctAns: 2, // Correct answer is at index 2 (Bubble Sort)
          categoryId: '711bdefb-23ad-4545-b4d8-52f88f949006',
        },
        {
          question: "What is the purpose of 'this' keyword in JavaScript?",
          options: [
            'Refers to the current object',
            'Declares a function',
            'Used to define variables',
            'Used for conditional statements',
          ],
          correctAns: 0,
          categoryId: '711bdefb-23ad-4545-b4d8-52f88f949006',
        },
        {
          question: 'What is the primary use of AJAX in web development?',
          options: [
            'To send and receive data asynchronously',
            'To style HTML elements',
            'To define variables',
            'To create animations',
          ],
          correctAns: 0,
          categoryId: '711bdefb-23ad-4545-b4d8-52f88f949006',
        },
        {
          question:
            "What is the purpose of the 'typeof' operator in JavaScript?",
          options: [
            'To determine the type of a variable',
            'To create new variables',
            'To define functions',
            'To perform arithmetic operations',
          ],
          correctAns: 0,
          categoryId: '711bdefb-23ad-4545-b4d8-52f88f949006',
        },
        {
          question: "What is the result of '5' + 5 in JavaScript?",
          options: ["'55'", '10', "'10'", 'Error'],
          correctAns: 0,
          categoryId: '711bdefb-23ad-4545-b4d8-52f88f949006',
        },
        {
          question:
            'Which event is triggered when a user clicks on an HTML element?',
          options: ['click', 'hover', 'submit', 'load'],
          correctAns: 0,
          categoryId: '711bdefb-23ad-4545-b4d8-52f88f949006',
        },
        {
          question: 'What is the purpose of a closure in JavaScript?',
          options: [
            "To access outer function's variables from inner functions",
            'To define variables globally',
            'To create loops',
            'To handle errors',
          ],
          correctAns: 0,
          categoryId: '711bdefb-23ad-4545-b4d8-52f88f949006',
        },
      ],
    }),
      console.log('Success');
  } catch (error) {
    console.log('Error seeding the database categories', error);
  } finally {
    await database.$disconnect();
  }
}

main();

// await database.category.createMany({
//   data: [
//     { name: 'ReactJS' },
//     { name: 'NextJS' },
//     { name: 'HTML & CSS' },
//     { name: 'Nodejs' },
//     { name: 'Python' },
//     { name: 'Django' },
//     { name: 'Java' },
//     { name: 'Kotlin' },
//     { name: 'Golang' },
//     { name: 'Javascript' },
//     { name: 'Web development' },
//     { name: 'Programming' },
//     { name: 'Data Structures & Algorithm' },
//     { name: 'MERN Stack' },
//     { name: 'Full stack Development' },
//   ],
// });

// await database.notesCategory.createMany({
//   data: [
//     {
//       name: 'ReactJS',
//     },
//     {
//       name: 'DSA',
//     },
//     {
//       name: 'JavaScript',
//     },
//     {
//       name: 'Nodejs',
//     },
//     {
//       name: 'Java',
//     },
//     {
//       name: 'NextJS',
//     },
//     {
//       name: 'HTML & CSS',
//     },
//   ],
// });

// await database.TestCategory.createMany({
//   data: [{ name: 'Data Structures & Algorithm' }, { name: 'JavaScripts' }],
// });

// data: [
//       {
//         question: 'What is the time complexity of quicksort?',
//         options: ['O(n log n)', 'O(n^2)', 'O(n)', 'O(log n)'],
//         correctAns: 0,
//         categoryId: '80c6e42b-5e81-4660-8eeb-3d939fa5a20e',
//       },
//       {
//         question:
//           'Which data structure uses LIFO (Last In, First Out) principle?',
//         options: ['Stack', 'Queue', 'Linked List', 'Binary Tree'],
//         correctAns: 0,
//         categoryId: '80c6e42b-5e81-4660-8eeb-3d939fa5a20e',
//       },
//       {
//         question:
//           'Which search algorithm is used for searching in a sorted array?',
//         options: [
//           'Binary Search',
//           'Linear Search',
//           'Depth-First Search',
//           'Breadth-First Search',
//         ],
//         correctAns: 0,
//         categoryId: '80c6e42b-5e81-4660-8eeb-3d939fa5a20e',
//       },
//       {
//         question: 'Which sorting algorithm has the worst time complexity?',
//         options: [
//           'Bubble Sort',
//           'Quick Sort',
//           'Merge Sort',
//           'Insertion Sort',
//         ],
//         correctAns: 1, // Correct answer is at index 1 (Quick Sort)
//         categoryId: '80c6e42b-5e81-4660-8eeb-3d939fa5a20e',
//       },
//       {
//         question: 'What is the purpose of a binary tree?',
//         options: [
//           'To store hierarchical data',
//           'To implement sorting algorithms',
//           'To search in constant time',
//           'To store key-value pairs',
//         ],
//         correctAns: 0,
//         categoryId: '80c6e42b-5e81-4660-8eeb-3d939fa5a20e',
//       },
//       {
//         question: 'What is the purpose of a linked list?',
//         options: [
//           'To store sequential data',
//           'To implement stacks',
//           'To perform sorting',
//           'To search efficiently',
//         ],
//         correctAns: 0,
//         categoryId: '80c6e42b-5e81-4660-8eeb-3d939fa5a20e',
//       },
//       {
//         question: 'What data structure is used to implement recursion?',
//         options: ['Stack', 'Queue', 'Linked List', 'Binary Tree'],
//         correctAns: 0,
//         categoryId: '80c6e42b-5e81-4660-8eeb-3d939fa5a20e',
//       },
//       {
//         question: 'What is the primary advantage of a hash table?',
//         options: [
//           'Fast data retrieval',
//           'Low memory consumption',
//           'Simple implementation',
//           'Preserves order of elements',
//         ],
//         correctAns: 0,
//         categoryId: '80c6e42b-5e81-4660-8eeb-3d939fa5a20e',
//       },
//       {
//         question: 'What is the time complexity of a linear search?',
//         options: ['O(n)', 'O(log n)', 'O(n^2)', 'O(1)'],
//         correctAns: 0,
//         categoryId: '80c6e42b-5e81-4660-8eeb-3d939fa5a20e',
//       },
//       {
//         question:
//           'Which data structure is typically used for implementing undo functionality in text editors?',
//         options: ['Stack', 'Queue', 'Linked List', 'Binary Tree'],
//         correctAns: 0,
//         categoryId: '80c6e42b-5e81-4660-8eeb-3d939fa5a20e',
//       },

//       {
//         question: 'What is the purpose of a callback function in JavaScript?',
//         options: [
//           'To handle asynchronous operations',
//           'To declare variables',
//           'To create loops',
//           'To style HTML elements',
//         ],
//         correctAns: 0,
//         categoryId: '711bdefb-23ad-4545-b4d8-52f88f949006',
//       },
//       {
//         question:
//           "What is the correct syntax for a 'for' loop in JavaScript?",
//         options: [
//           'for (var i = 0; i < array.length; i++) {}',
//           'for (i = 0; i < array.length; i++) {}',
//           'for (i = 0; i++) {}',
//           'for (var i < array.length; i++) {}',
//         ],
//         correctAns: 0,

//         categoryId: '711bdefb-23ad-4545-b4d8-52f88f949006',
//       },
//       {
//         question: 'What does DOM stand for in JavaScript?',
//         options: [
//           'Document Object Model',
//           'Data Object Model',
//           'Design Object Model',
//           'Development Object Model',
//         ],
//         correctAns: 0,
//         categoryId: '711bdefb-23ad-4545-b4d8-52f88f949006',
//       },
//       {
//         question:
//           'Which sorting algorithm is NOT commonly implemented in JavaScript?',
//         options: [
//           'Quick Sort',
//           'Merge Sort',
//           'Bubble Sort',
//           'Insertion Sort',
//         ],
//         correctAns: 2, // Correct answer is at index 2 (Bubble Sort)
//         categoryId: '711bdefb-23ad-4545-b4d8-52f88f949006',
//       },
//       {
//         question: "What is the purpose of 'this' keyword in JavaScript?",
//         options: [
//           'Refers to the current object',
//           'Declares a function',
//           'Used to define variables',
//           'Used for conditional statements',
//         ],
//         correctAns: 0,
//         categoryId: '711bdefb-23ad-4545-b4d8-52f88f949006',
//       },
//       {
//         question: 'What is the primary use of AJAX in web development?',
//         options: [
//           'To send and receive data asynchronously',
//           'To style HTML elements',
//           'To define variables',
//           'To create animations',
//         ],
//         correctAns: 0,
//         categoryId: '711bdefb-23ad-4545-b4d8-52f88f949006',
//       },
//       {
//         question:
//           "What is the purpose of the 'typeof' operator in JavaScript?",
//         options: [
//           'To determine the type of a variable',
//           'To create new variables',
//           'To define functions',
//           'To perform arithmetic operations',
//         ],
//         correctAns: 0,

//         categoryId: '711bdefb-23ad-4545-b4d8-52f88f949006',
//       },
//       {
//         question: "What is the result of '5' + 5 in JavaScript?",
//         options: ["'55'", '10', "'10'", 'Error'],
//         correctAns: 0,
//         categoryId: '711bdefb-23ad-4545-b4d8-52f88f949006',
//       },
//       {
//         question:
//           'Which event is triggered when a user clicks on an HTML element?',
//         options: ['click', 'hover', 'submit', 'load'],
//         correctAns: 0,
//         categoryId: '711bdefb-23ad-4545-b4d8-52f88f949006',
//       },
//       {
//         question: 'What is the purpose of a closure in JavaScript?',
//         options: [
//           "To access outer function's variables from inner functions",
//           'To define variables globally',
//           'To create loops',
//           'To handle errors',
//         ],
//         correctAns: 0,
//         categoryId: '711bdefb-23ad-4545-b4d8-52f88f949006',
//       },
//     ],
