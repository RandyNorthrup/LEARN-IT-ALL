'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, BookOpen, Code2 } from 'lucide-react';

interface LearningTrack {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  estimatedHours: number;
  technologies: string[];
  courses: string[];
  color: string;
}

export default function TracksPage() {
  const [tracks, setTracks] = useState<LearningTrack[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTracks() {
      try {
        const response = await fetch('/api/tracks');
        if (response.ok) {
          const data = await response.json();
          setTracks(data);
        }
      } catch (error) {
        console.error('Failed to fetch tracks:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTracks();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-2xl font-bold text-gray-700">Loading learning tracks...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <Link
                href="/dashboard"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold mb-2"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Link>
              <h1 className="text-4xl font-bold text-gray-900">Learning Tracks</h1>
              <p className="mt-2 text-lg text-gray-600">
                Follow structured paths to master full-stack development
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="rounded-2xl bg-white shadow-xl overflow-hidden transition-all hover:shadow-2xl"
            >
              {/* Track Header */}
              <div className={`bg-gradient-to-r ${track.color} p-8 text-white`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-3">{track.title}</h2>
                    <p className="text-lg opacity-90 mb-4">{track.description}</p>
                    
                    {/* Track Stats */}
                    <div className="flex flex-wrap gap-6 text-sm">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 mr-2" />
                        <span className="font-semibold">{track.estimatedHours} hours</span>
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="h-5 w-5 mr-2" />
                        <span className="font-semibold">{track.courses.length} courses</span>
                      </div>
                      <div className="flex items-center">
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full font-semibold capitalize">
                          {track.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Track Body */}
              <div className="p-8">
                {/* Technologies */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                    Technologies You&apos;ll Learn
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {track.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center px-3 py-1 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium"
                      >
                        <Code2 className="h-4 w-4 mr-1" />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Course Count */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                    Course Sequence
                  </h3>
                  <p className="text-gray-600">
                    This track includes <span className="font-bold text-gray-900">{track.courses.length} courses</span> designed to take you from beginner to job-ready developer.
                    Complete them in order for the best learning experience.
                  </p>
                </div>

                {/* Action Button */}
                <Link
                  href={`/tracks/${track.id}`}
                  className={`inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r ${track.color} text-white font-bold transition-all hover:scale-105 hover:shadow-lg`}
                >
                  View Track Details
                  <svg
                    className="ml-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 rounded-2xl bg-white p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">What are Learning Tracks?</h3>
          <p className="text-gray-600 mb-4">
            Learning tracks are carefully curated sequences of courses designed to take you from beginner to professional developer. 
            Each track focuses on a specific career path and includes all the courses, projects, and skills you need to succeed.
          </p>
          <p className="text-gray-600">
            <strong className="text-gray-900">Pro tip:</strong> Complete courses in the order they&apos;re presented for the best learning experience. 
            Each course builds upon the knowledge from previous courses in the track.
          </p>
        </div>
      </main>
    </div>
  );
}
