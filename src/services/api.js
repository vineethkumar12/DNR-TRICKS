import {
  mockUsers,
  mockExams,
  mockQuestions,
  mockResults,
  mockStudents,
  mockReportSummary,
} from '../utils/mockData.js';

// Simulated network latency so loading states feel real.
const delay = (ms = 350) => new Promise((res) => setTimeout(res, ms));

export const api = {
  async login(email, password) {
    await delay();
    const user = mockUsers.find((u) => u.email === email && u.password === password);
    if (!user) throw new Error('Invalid email or password.');
    const { password: _pw, ...safeUser } = user;
    return safeUser;
  },

  async register({ name, email, password, rollNo }) {
    await delay();
    if (mockUsers.some((u) => u.email === email)) {
      throw new Error('An account with this email already exists.');
    }
    return { id: `u${Date.now()}`, name, email, role: 'student', rollNo };
  },

  async getExams() {
    await delay();
    return mockExams;
  },

  async getExamById(id) {
    await delay();
    const exam = mockExams.find((e) => e.id === id);
    if (!exam) throw new Error('Exam not found.');
    return exam;
  },

  async getQuestions(examId) {
    await delay();
    return mockQuestions[examId] || [];
  },

  async submitExam(examId, answers) {
    await delay(600);
    const questions = mockQuestions[examId] || [];
    let score = 0;
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;
    questions.forEach((q) => {
      const given = answers[q.id];
      if (given === undefined || given === null) {
        unanswered += 1;
      } else if (given === q.correct) {
        score += q.marks;
        correct += 1;
      } else {
        incorrect += 1;
      }
    });
    const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);
    return {
      id: `r${Date.now()}`,
      examId,
      score,
      totalMarks,
      correct,
      incorrect,
      unanswered,
      totalQuestions: questions.length,
      submittedAt: new Date().toISOString(),
    };
  },

  async getResultByExam(examId) {
    await delay();
    return mockResults.find((r) => r.examId === examId) || null;
  },

  async getAllResults() {
    await delay();
    return mockResults;
  },

  async getStudents() {
    await delay();
    return mockStudents;
  },

  async getReportSummary() {
    await delay();
    return mockReportSummary;
  },

  async createExam(payload) {
    await delay(500);
    return { id: `ex${Date.now()}`, ...payload };
  },
};
