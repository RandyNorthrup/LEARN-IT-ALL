import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const INDEX_PATH = path.join(process.cwd(), 'content', 'projects', 'index.json');

interface ProjectData {
  meta: {
    source: string;
    license: string;
    description: string;
    lastUpdated: string;
    totalProjects: number;
    totalCategories: number;
  };
  categories: string[];
  projects: {
    [category: string]: Array<{
      title: string;
      url: string;
      language: string;
      category: string;
    }>;
  };
}

// Cache the project data to avoid repeated file reads
let cachedData: ProjectData | null = null;
let lastModified = 0;

function loadProjectData(): ProjectData {
  const stats = fs.statSync(INDEX_PATH);
  
  // Return cache if file hasn't changed
  if (cachedData && stats.mtimeMs === lastModified) {
    return cachedData;
  }
  
  // Load fresh data
  const fileContent = fs.readFileSync(INDEX_PATH, 'utf-8');
  cachedData = JSON.parse(fileContent);
  lastModified = stats.mtimeMs;
  
  return cachedData!;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const language = searchParams.get('language');
    const search = searchParams.get('search')?.toLowerCase();
    
    const data = loadProjectData();
    
    // If no filters, return metadata and categories list
    if (!category && !language && !search) {
      return NextResponse.json({
        meta: data.meta,
        categories: data.categories.map(cat => ({
          id: cat,
          name: cat.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          projectCount: data.projects[cat]?.length || 0
        }))
      });
    }
    
    // Filter projects
    let filteredProjects: Array<{
      title: string;
      url: string;
      language: string;
      category: string;
    }> = [];
    
    // If category specified, only search that category
    if (category && data.projects[category]) {
      filteredProjects = data.projects[category];
    } else {
      // Otherwise, search all categories
      filteredProjects = Object.values(data.projects).flat();
    }
    
    // Apply language filter
    if (language) {
      const langLower = language.toLowerCase();
      filteredProjects = filteredProjects.filter(project => 
        project.language.toLowerCase().includes(langLower)
      );
    }
    
    // Apply search filter
    if (search) {
      filteredProjects = filteredProjects.filter(project => 
        project.title.toLowerCase().includes(search) ||
        project.language.toLowerCase().includes(search)
      );
    }
    
    return NextResponse.json({
      meta: {
        total: filteredProjects.length,
        filters: {
          category: category || 'all',
          language: language || 'all',
          search: search || null
        }
      },
      projects: filteredProjects
    });
    
  } catch (error) {
    console.error('Error loading projects:', error);
    return NextResponse.json(
      { error: 'Failed to load projects' },
      { status: 500 }
    );
  }
}
