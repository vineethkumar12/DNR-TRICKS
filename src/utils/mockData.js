import { EXAM_STATUS } from './constants.js';

export const mockUsers = [
  { id: 'u1', name: 'Aarav Mehta', email: 'student@dnr.test', password: 'student123', role: 'student', rollNo: 'DNR-2026-014' },
  { id: 'a1', name: 'Priya Raman', email: 'admin@dnr.test', password: 'admin123', role: 'admin' },
];

export const mockExams = [
  {
    id: 'ex1',
    title: 'Data Structures — Unit Test 2',
    subject: 'Computer Science',
    status: EXAM_STATUS.ACTIVE,
    durationMinutes: 30,
    totalMarks: 50,
    questionCount: 5,
    scheduledFor: '2026-09-18T10:00:00',
    instructions: [
      'The test is timed — once started, the timer cannot be paused.',
      'Each question carries 10 marks; there is no negative marking.',
      'Do not refresh or navigate away — your progress may be lost.',
      'Click Submit once you are done, or the test auto-submits at zero.',
    ],
  },
  {
    id: 'ex2',
    title: 'Operating Systems — Midterm',
    subject: 'Computer Science',
    status: EXAM_STATUS.UPCOMING,
    durationMinutes: 45,
    totalMarks: 100,
    questionCount: 5,
    scheduledFor: '2026-09-22T09:00:00',
    instructions: [
      'The test is timed — once started, the timer cannot be paused.',
      'Read every question fully before answering.',
      'Ensure a stable connection before you begin.',
    ],
  },
  {
    id: 'ex3',
    title: 'Discrete Mathematics — Quiz 3',
    subject: 'Mathematics',
    status: EXAM_STATUS.COMPLETED,
    durationMinutes: 20,
    totalMarks: 30,
    questionCount: 3,
    scheduledFor: '2026-09-10T11:00:00',
    resultId: 'r1',
  },
];

export const mockQuestions = {
  ex1: [
    { id: 'q1', prompt: 'Which data structure uses LIFO (Last In, First Out) ordering?', options: ['Queue', 'Stack', 'Linked List', 'Heap'], correct: 1, marks: 10 },
    { id: 'q2', prompt: 'What is the average time complexity of searching in a balanced binary search tree?', options: ['O(n)', 'O(1)', 'O(log n)', 'O(n log n)'], correct: 2, marks: 10 },
    { id: 'q3', prompt: 'Which traversal visits the root node between the left and right subtrees?', options: ['Pre-order', 'In-order', 'Post-order', 'Level-order'], correct: 1, marks: 10 },
    { id: 'q4', prompt: 'A hash table with poor hash distribution primarily suffers from:', options: ['Overflow', 'Underflow', 'Collisions', 'Fragmentation'], correct: 2, marks: 10 },
    { id: 'q5', prompt: 'Which structure is best suited for implementing a priority queue?', options: ['Array', 'Heap', 'Stack', 'Singly linked list'], correct: 1, marks: 10 },
  ],
  ex2: [
    { id: 'q1', prompt: 'Which scheduling algorithm can cause starvation of low-priority processes?', options: ['Round Robin', 'First Come First Served', 'Priority Scheduling', 'Shortest Job First (non-preemptive, fair variant)'], correct: 2, marks: 20 },
    { id: 'q2', prompt: 'A deadlock requires all of the following EXCEPT:', options: ['Mutual exclusion', 'Hold and wait', 'Preemption', 'Circular wait'], correct: 2, marks: 20 },
    { id: 'q3', prompt: 'Which memory management scheme suffers most from external fragmentation?', options: ['Paging', 'Segmentation', 'Fixed partitioning', 'Demand paging'], correct: 1, marks: 20 },
    { id: 'q4', prompt: 'A page fault occurs when:', options: ['A process requests more CPU time', 'A referenced page is not in main memory', 'Two processes write to the same file', 'The disk runs out of space'], correct: 1, marks: 20 },
    { id: 'q5', prompt: 'Which of these is a classic solution to the critical section problem?', options: ['Round robin scheduling', "Peterson's algorithm", 'LRU replacement', 'Belady\'s algorithm'], correct: 1, marks: 20 },
  ],
  ex3: [
    { id: 'q1', prompt: 'The power set of a set with n elements has how many elements?', options: ['n', 'n^2', '2^n', 'n!'], correct: 2, marks: 10 },
    { id: 'q2', prompt: 'A graph in which every pair of vertices is connected by an edge is called:', options: ['A tree', 'A complete graph', 'A bipartite graph', 'A planar graph'], correct: 1, marks: 10 },
    { id: 'q3', prompt: 'Which logical connective is true only when both operands are true?', options: ['OR', 'XOR', 'AND', 'NOT'], correct: 2, marks: 10 },
  ],
};

export const mockResults = [
  {
    id: 'r1',
    examId: 'ex3',
    examTitle: 'Discrete Mathematics — Quiz 3',
    studentId: 'u1',
    studentName: 'Aarav Mehta',
    score: 24,
    totalMarks: 30,
    submittedAt: '2026-09-10T11:19:00',
    correct: 8,
    incorrect: 2,
    unanswered: 0,
    totalQuestions: 10,
    breakdown: [
      { topic: 'Set Theory', score: 9, max: 10 },
      { topic: 'Graph Theory', score: 7, max: 10 },
      { topic: 'Logic & Proofs', score: 8, max: 10 },
    ],
  },
  {
    id: 'r2',
    examId: 'ex1',
    examTitle: 'Data Structures — Unit Test 2',
    studentId: 'u2',
    studentName: 'Ishaan Kapoor',
    score: 40,
    totalMarks: 50,
    submittedAt: '2026-09-18T10:27:00',
  },
  {
    id: 'r3',
    examId: 'ex1',
    examTitle: 'Data Structures — Unit Test 2',
    studentId: 'u3',
    studentName: 'Meera Nair',
    score: 45,
    totalMarks: 50,
    submittedAt: '2026-09-18T10:24:00',
  },
];

export const mockStudents = [
  { id: 'u1', name: 'Aarav Mehta', rollNo: 'DNR-2026-014', email: 'student@dnr.test', examsTaken: 4, avgScore: 82 },
  { id: 'u2', name: 'Ishaan Kapoor', rollNo: 'DNR-2026-015', email: 'ishaan@dnr.test', examsTaken: 5, avgScore: 76 },
  { id: 'u3', name: 'Meera Nair', rollNo: 'DNR-2026-016', email: 'meera@dnr.test', examsTaken: 5, avgScore: 91 },
  { id: 'u4', name: 'Kabir Sethi', rollNo: 'DNR-2026-017', email: 'kabir@dnr.test', examsTaken: 3, avgScore: 68 },
  { id: 'u5', name: 'Ananya Iyer', rollNo: 'DNR-2026-018', email: 'ananya@dnr.test', examsTaken: 4, avgScore: 88 },
];

export const mockReportSummary = {
  totalExams: mockExams.length,
  totalStudents: mockStudents.length,
  avgScoreAcrossExams: 79,
  passRate: 88,
  scoreTrend: [
    { label: 'Quiz 1', avg: 71 },
    { label: 'Quiz 2', avg: 75 },
    { label: 'Unit Test 1', avg: 68 },
    { label: 'Quiz 3', avg: 82 },
    { label: 'Unit Test 2', avg: 80 },
  ],
};
