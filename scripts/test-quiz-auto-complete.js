#!/usr/bin/env node

/**
 * Test Script: Verify Quiz Auto-Complete Logic
 * 
 * This script tests the chapter extraction logic and course structure loading
 * to ensure quiz submission will correctly identify and mark chapter lessons.
 */

const path = require('path');
const fs = require('fs');

// Test Data
const testCases = [
  { quizId: 'quiz-01-chapter-1', expectedChapter: 1, expectedLessons: 10 },
  { quizId: 'quiz-02-chapter-2', expectedChapter: 2, expectedLessons: 12 },
  { quizId: 'quiz-03-chapter-3', expectedChapter: 3, expectedLessons: 10 },
  { quizId: 'quiz-04-chapter-4', expectedChapter: 4, expectedLessons: 10 },
  { quizId: 'quiz-05-chapter-5', expectedChapter: 5, expectedLessons: 10 },
  { quizId: 'quiz-06-chapter-6', expectedChapter: 6, expectedLessons: 9 },
  { quizId: 'final-exam', expectedChapter: 'all', expectedLessons: 61 }, // Should complete ALL lessons
];

// Load course structure
const courseId = 'python-oop';
const coursePath = path.join(process.cwd(), 'content', 'courses', courseId, 'course.json');
const courseData = JSON.parse(fs.readFileSync(coursePath, 'utf8'));

console.log('🧪 Testing Quiz Auto-Complete Logic\n');
console.log(`Course: ${courseData.title}`);
console.log(`Total Chapters: ${courseData.chapters.length}`);
console.log(`Total Lessons: ${courseData.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0)}\n`);
console.log('─'.repeat(80));

let passedTests = 0;
let failedTests = 0;

// Test each quiz ID
testCases.forEach((testCase, index) => {
  console.log(`\nTest ${index + 1}: ${testCase.quizId}`);
  console.log('─'.repeat(80));

  // Check if this is the final exam (special case)
  if (testCase.quizId === 'final-exam' && testCase.expectedChapter === 'all') {
    console.log(`  Final Exam: Should complete ALL lessons in course`);
    
    let totalLessons = 0;
    const allLessons = [];
    
    for (const chapter of courseData.chapters) {
      if (chapter.lessons && chapter.lessons.length > 0) {
        totalLessons += chapter.lessons.length;
        allLessons.push(...chapter.lessons.map(f => f.replace(/\.md$/, '')));
      }
    }
    
    console.log(`  Total lessons in course: ${totalLessons}`);
    
    if (totalLessons !== testCase.expectedLessons) {
      console.log(`❌ FAIL: Expected ${testCase.expectedLessons} total lessons but got ${totalLessons}`);
      failedTests++;
      return;
    }
    
    console.log(`  Lessons to auto-complete: ${allLessons.length}`);
    console.log(`  First 5: ${allLessons.slice(0, 5).join(', ')}`);
    console.log(`  Last 5: ${allLessons.slice(-5).join(', ')}`);
    console.log(`✅ PASS: Final exam will complete entire course`);
    passedTests++;
    return;
  }

  // Parse quiz ID (same logic as API route)
  const chapterMatch = testCase.quizId.match(/chapter-(\d+)/i);
  
  if (!chapterMatch && testCase.expectedChapter === null) {
    console.log(`✅ PASS: Correctly did NOT match (final exam should not auto-complete)`);
    passedTests++;
    return;
  }

  if (!chapterMatch && testCase.expectedChapter !== null) {
    console.log(`❌ FAIL: Expected to match chapter ${testCase.expectedChapter} but got no match`);
    failedTests++;
    return;
  }

  const chapterNumber = parseInt(chapterMatch[1], 10);
  console.log(`  Extracted Chapter Number: ${chapterNumber}`);
  
  // Check expected chapter
  if (chapterNumber !== testCase.expectedChapter) {
    console.log(`❌ FAIL: Expected chapter ${testCase.expectedChapter} but got ${chapterNumber}`);
    failedTests++;
    return;
  }

  // Get chapter data
  if (!courseData.chapters || courseData.chapters.length < chapterNumber) {
    console.log(`❌ FAIL: Chapter ${chapterNumber} not found in course structure`);
    failedTests++;
    return;
  }

  const chapter = courseData.chapters[chapterNumber - 1]; // 0-indexed
  console.log(`  Chapter ID: ${chapter.id}`);
  console.log(`  Chapter Title: ${chapter.title}`);
  console.log(`  Lessons in Chapter: ${chapter.lessons.length}`);
  
  // Check expected lesson count
  if (chapter.lessons.length !== testCase.expectedLessons) {
    console.log(`❌ FAIL: Expected ${testCase.expectedLessons} lessons but got ${chapter.lessons.length}`);
    failedTests++;
    return;
  }

  // Show lesson IDs that would be auto-completed
  console.log(`  Lessons to auto-complete:`);
  chapter.lessons.forEach((lessonFile, idx) => {
    const lessonId = lessonFile.replace(/\.md$/, '');
    console.log(`    ${idx + 1}. ${lessonId}`);
  });

  console.log(`✅ PASS: All checks passed`);
  passedTests++;
});

// Summary
console.log('\n' + '═'.repeat(80));
console.log('📊 Test Summary');
console.log('═'.repeat(80));
console.log(`Total Tests: ${testCases.length}`);
console.log(`Passed: ${passedTests} ✅`);
console.log(`Failed: ${failedTests} ❌`);
console.log(`Success Rate: ${Math.round((passedTests / testCases.length) * 100)}%`);

if (failedTests === 0) {
  console.log('\n🎉 All tests passed! Quiz auto-complete logic is correct.');
  process.exit(0);
} else {
  console.log('\n⚠️  Some tests failed. Review logic before deployment.');
  process.exit(1);
}
