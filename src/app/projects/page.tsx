'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  projectCount: number;
}

interface Project {
  title: string;
  url: string;
  language: string;
  category: string;
}

interface ProjectsResponse {
  meta: {
    total: number;
    filters: {
      category: string;
      language: string;
      search: string | null;
    };
  };
  projects: Project[];
}

interface CategoriesResponse {
  meta: {
    source: string;
    license: string;
    description: string;
    totalProjects: number;
    totalCategories: number;
  };
  categories: Category[];
}

export default function ProjectsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState<CategoriesResponse['meta'] | null>(null);

  // Load categories on mount
  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch('/api/projects');
        const data: CategoriesResponse = await res.json();
        setCategories(data.categories);
        setMeta(data.meta);
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    }
    loadCategories();
  }, []);

  // Load projects when filters change
  useEffect(() => {
    async function loadProjects() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (selectedCategory !== 'all') {
          params.append('category', selectedCategory);
        }
        if (searchTerm) {
          params.append('search', searchTerm);
        }
        
        const res = await fetch(`/api/projects?${params}`);
        const data: ProjectsResponse = await res.json();
        setProjects(data.projects || []);
      } catch (error) {
        console.error('Failed to load projects:', error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }
    
    if (selectedCategory !== 'all' || searchTerm) {
      loadProjects();
    } else {
      setLoading(false);
    }
  }, [selectedCategory, searchTerm]);

  // Calculate unique languages (safe with empty array default)
  const languages = projects.length > 0 
    ? [...new Set(projects.map(p => p.language))].sort()
    : [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Build Your Own
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {meta?.description || 'Step-by-step guides for building technologies from scratch'}
              </p>
            </div>
            <Link 
              href="/dashboard"
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>

          {/* Search Bar */}
          <div className="mt-6">
            <input
              type="text"
              placeholder="Search projects or languages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Stats */}
          {meta && (
            <div className="mt-4 flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <span>{meta.totalProjects} Projects</span>
              <span>{meta.totalCategories} Categories</span>
              <a 
                href={meta.source}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Source Repository ↗
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <aside className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Categories
              </h2>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 font-medium'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>All Projects</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {meta?.totalProjects || 0}
                    </span>
                  </div>
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 font-medium'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="truncate">{category.name}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {category.projectCount}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content - Projects */}
          <main className="lg:col-span-3">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 dark:border-gray-700 border-t-blue-600"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading projects...</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  {searchTerm 
                    ? `No projects found matching "${searchTerm}"`
                    : 'Select a category to view projects'
                  }
                </p>
              </div>
            ) : (
              <>
                {/* Results header */}
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {projects.length} {projects.length === 1 ? 'Project' : 'Projects'}
                  </h2>
                  {languages.length > 0 && (
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {languages.length} {languages.length === 1 ? 'language' : 'languages'}
                    </div>
                  )}
                </div>

                {/* Project Cards */}
                <div className="grid grid-cols-1 gap-4">
                  {projects.map((project, index) => (
                    <a
                      key={`${project.category}-${index}`}
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {project.title}
                          </h3>
                          <div className="mt-2 flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-medium">
                              {project.language}
                            </span>
                            <span className="text-gray-500 dark:text-gray-500">
                              {project.category.replace(/-/g, ' ')}
                            </span>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <svg
                            className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
