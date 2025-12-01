/**
 * ONE-TIME SCRIPT: Parse build-your-own-x repository README
 * 
 * This script fetches the README.md from the build-your-own-x repository
 * and extracts all project tutorials into index.json format.
 * 
 * DO NOT USE FOR ONGOING CONTENT UPDATES - This is for initial setup only.
 * 
 * Usage: node scripts/parse-build-your-own-x.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const README_URL = 'https://raw.githubusercontent.com/codecrafters-io/build-your-own-x/master/README.md';
const OUTPUT_PATH = path.join(__dirname, '../content/projects/index.json');

/**
 * Fetch README content from GitHub
 */
function fetchReadme() {
  return new Promise((resolve, reject) => {
    https.get(README_URL, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

/**
 * Parse markdown to extract projects
 * Format: * [Language: Title](URL) or * [**Language**: _Title_](URL)
 */
function parseProjects(markdown) {
  const lines = markdown.split('\n');
  const projects = {};
  let currentCategory = null;
  let categoryId = null;

  // Category heading patterns - matches "#### Build your own `Category Name`"
  const categoryRegex = /^####\s+Build your own `([^`]+)`\s*$/;
  
  // Project patterns - handles both formats:
  // * [Language: Title](URL)
  // * [**Language**: _Title_](URL)
  const projectRegex1 = /^\*\s+\[\*\*([^*]+)\*\*:\s+_([^_]+)_\]\(([^)]+)\)/;
  const projectRegex2 = /^\*\s+\[([^:]+):\s+(.+)\]\(([^)]+)\)/;

  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Check for category heading
    const categoryMatch = trimmedLine.match(categoryRegex);
    if (categoryMatch) {
      const categoryName = categoryMatch[1];
      categoryId = categoryName
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
      
      currentCategory = categoryName;
      projects[categoryId] = [];
      continue;
    }

    // Check for project entry - try both formats
    let projectMatch = trimmedLine.match(projectRegex1);
    if (!projectMatch) {
      projectMatch = trimmedLine.match(projectRegex2);
    }
    
    if (projectMatch && currentCategory && categoryId) {
      const [, language, title, url] = projectMatch;
      projects[categoryId].push({
        title: title.trim(),
        url: url.trim(),
        language: language.trim(),
        category: categoryId
      });
    }
  }

  return projects;
}

/**
 * Build final index.json structure
 */
function buildIndex(projects) {
  const categories = Object.keys(projects);
  const totalProjects = categories.reduce((sum, cat) => sum + projects[cat].length, 0);

  return {
    meta: {
      source: "https://github.com/codecrafters-io/build-your-own-x",
      license: "CC0-1.0",
      description: "A compilation of well-written, step-by-step guides for re-creating technologies from scratch",
      lastUpdated: new Date().toISOString().split('T')[0],
      totalProjects,
      totalCategories: categories.length
    },
    categories,
    projects
  };
}

/**
 * Main execution
 */
async function main() {
  console.log('Fetching build-your-own-x README...');
  const readme = await fetchReadme();
  
  console.log('Parsing projects...');
  const projects = parseProjects(readme);
  
  console.log('Building index...');
  const index = buildIndex(projects);
  
  console.log(`Extracted ${index.meta.totalProjects} projects across ${index.meta.totalCategories} categories`);
  
  console.log('Writing index.json...');
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(index, null, 2));
  
  console.log('✅ Done! index.json created at:', OUTPUT_PATH);
  
  // Print category summary
  console.log('\nCategory Summary:');
  for (const cat of index.categories) {
    console.log(`  ${cat}: ${projects[cat].length} projects`);
  }
}

main().catch(console.error);
