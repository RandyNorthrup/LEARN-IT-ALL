'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, isLoading }: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            {isLoading ? 'Clearing...' : 'Yes, Clear Progress'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [displayName, setDisplayName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  
  // Modal state
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'all' | 'course' | 'chapter' | 'lesson' | 'quiz' | null;
    title: string;
    message: string;
    targetId?: string;
  }>({
    isOpen: false,
    type: null,
    title: '',
    message: '',
  });
  
  const [isClearing, setIsClearing] = useState(false);
  const [courseId, setCourseId] = useState('python-basics');
  const [chapterId, setChapterId] = useState('');
  const [lessonId, setLessonId] = useState('');
  const [quizId, setQuizId] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      const response = await fetch('/api/settings');
      const data = await response.json();
      setDisplayName(data.displayName);
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    }
  }

  async function handleSaveUsername() {
    if (displayName.trim().length < 3) {
      setMessage('Username must be at least 3 characters');
      return;
    }

    setIsSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ displayName: displayName.trim() }),
      });

      if (response.ok) {
        const data = await response.json();
        setDisplayName(data.displayName);
        setMessage('Username updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Failed to update username');
      }
    } catch (error) {
      console.error('Failed to save username:', error);
      setMessage('Failed to update username');
    } finally {
      setIsSaving(false);
    }
  }

  function openModal(
    type: 'all' | 'course' | 'chapter' | 'lesson' | 'quiz',
    targetId?: string
  ) {
    const modalConfigs = {
      all: {
        title: 'Clear All Progress?',
        message: 'This will permanently delete all your progress across all courses, lessons, quizzes, and exercises. This action cannot be undone.',
      },
      course: {
        title: 'Clear Course Progress?',
        message: `This will permanently delete all progress for course "${courseId}". This includes all lessons, quizzes, and exercises within this course. This action cannot be undone.`,
      },
      chapter: {
        title: 'Clear Chapter Progress?',
        message: `This will permanently delete all progress for chapter "${chapterId}" in course "${courseId}". This includes all lessons and quizzes within this chapter. This action cannot be undone.`,
      },
      lesson: {
        title: 'Clear Lesson Progress?',
        message: `This will permanently delete progress for lesson "${lessonId}". This action cannot be undone.`,
      },
      quiz: {
        title: 'Clear Quiz Progress?',
        message: `This will permanently delete all attempts for quiz "${quizId}". This action cannot be undone.`,
      },
    };

    const config = modalConfigs[type];
    setModalState({
      isOpen: true,
      type,
      title: config.title,
      message: config.message,
      targetId,
    });
  }

  function closeModal() {
    setModalState({
      isOpen: false,
      type: null,
      title: '',
      message: '',
    });
  }

  async function handleConfirmClear() {
    if (!modalState.type) return;

    setIsClearing(true);

    try {
      const response = await fetch('/api/progress/clear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: modalState.type,
          courseId: modalState.type !== 'all' ? courseId : undefined,
          chapterId: modalState.type === 'chapter' ? chapterId : undefined,
          lessonId: modalState.type === 'lesson' ? lessonId : undefined,
          quizId: modalState.type === 'quiz' ? quizId : undefined,
        }),
      });

      if (response.ok) {
        setMessage('Progress cleared successfully!');
        setTimeout(() => setMessage(''), 3000);
        
        // Reset input fields
        if (modalState.type === 'chapter') setChapterId('');
        if (modalState.type === 'lesson') setLessonId('');
        if (modalState.type === 'quiz') setQuizId('');
      } else {
        setMessage('Failed to clear progress');
      }
    } catch (error) {
      console.error('Failed to clear progress:', error);
      setMessage('Failed to clear progress');
    } finally {
      setIsClearing(false);
      closeModal();
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/dashboard" className="text-blue-600 hover:underline">
            ← Back to Dashboard
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.includes('successfully') || message.includes('updated')
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message}
          </div>
        )}

        {/* Username Settings */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Profile Settings</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-2">
                Display Name
              </label>
              <input
                type="text"
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your display name"
              />
            </div>
            <button
              onClick={handleSaveUsername}
              disabled={isSaving}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Progress Management */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Progress Management</h2>
          <p className="text-gray-600 mb-6">
            Clear your learning progress for specific courses, chapters, lessons, or quizzes.
            <span className="text-red-600 font-semibold"> Warning: These actions cannot be undone.</span>
          </p>

          {/* Clear All Progress */}
          <div className="mb-6 p-4 border border-red-200 rounded-lg bg-red-50">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Clear All Progress</h3>
            <p className="text-gray-600 mb-4">
              Delete all your progress across all courses, lessons, quizzes, and exercises.
            </p>
            <button
              onClick={() => openModal('all')}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Clear All Progress
            </button>
          </div>

          {/* Clear Course Progress */}
          <div className="mb-6 p-4 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Clear Course Progress</h3>
            <p className="text-gray-600 mb-4">
              Delete all progress for a specific course.
            </p>
            <div className="flex gap-3">
              <input
                type="text"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                placeholder="Course ID (e.g., python-basics)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => openModal('course')}
                disabled={!courseId.trim()}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
              >
                Clear Course
              </button>
            </div>
          </div>

          {/* Clear Chapter Progress */}
          <div className="mb-6 p-4 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Clear Chapter Progress</h3>
            <p className="text-gray-600 mb-4">
              Delete all progress for a specific chapter within a course.
            </p>
            <div className="space-y-3">
              <input
                type="text"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                placeholder="Course ID (e.g., python-basics)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex gap-3">
                <input
                  type="text"
                  value={chapterId}
                  onChange={(e) => setChapterId(e.target.value)}
                  placeholder="Chapter ID (e.g., ch1-intro)"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => openModal('chapter')}
                  disabled={!courseId.trim() || !chapterId.trim()}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
                >
                  Clear Chapter
                </button>
              </div>
            </div>
          </div>

          {/* Clear Lesson Progress */}
          <div className="mb-6 p-4 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Clear Lesson Progress</h3>
            <p className="text-gray-600 mb-4">
              Delete progress for a specific lesson.
            </p>
            <div className="flex gap-3">
              <input
                type="text"
                value={lessonId}
                onChange={(e) => setLessonId(e.target.value)}
                placeholder="Lesson ID (e.g., lesson-001-what-is-python)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => openModal('lesson')}
                disabled={!lessonId.trim()}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50"
              >
                Clear Lesson
              </button>
            </div>
          </div>

          {/* Clear Quiz Progress */}
          <div className="mb-6 p-4 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Clear Quiz Progress</h3>
            <p className="text-gray-600 mb-4">
              Delete all attempts for a specific quiz.
            </p>
            <div className="flex gap-3">
              <input
                type="text"
                value={quizId}
                onChange={(e) => setQuizId(e.target.value)}
                placeholder="Quiz ID (e.g., quiz-01-chapter-1)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => openModal('quiz')}
                disabled={!quizId.trim()}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50"
              >
                Clear Quiz
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={modalState.isOpen}
        title={modalState.title}
        message={modalState.message}
        onConfirm={handleConfirmClear}
        onCancel={closeModal}
        isLoading={isClearing}
      />
    </div>
  );
}
