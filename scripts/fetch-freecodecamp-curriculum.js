/**
 * Fetch freeCodeCamp Curriculum
 * 
 * This script fetches the Responsive Web Design certification from freeCodeCamp
 * and converts it to our course.json format.
 * 
 * Usage: node scripts/fetch-freecodecamp-curriculum.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// freeCodeCamp curriculum structure endpoint
const FREECODECAMP_API = 'https://api.github.com/repos/freeCodeCamp/freeCodeCamp/contents/curriculum/challenges/english';

/**
 * Fetch content from GitHub API
 */
function fetchGitHubContent(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'LEARN-IT-ALL-Curriculum-Converter'
      }
    };

    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    }).on('error', reject);
  });
}

/**
 * Find Responsive Web Design blocks
 */
async function findRespWebDesignBlocks() {
  console.log('Fetching freeCodeCamp curriculum structure...');
  
  const blocksDir = await fetchGitHubContent(`${FREECODECAMP_API}/blocks`);
  
  // Filter for responsive web design blocks (they start with specific patterns)
  const respWebDesignBlocks = blocksDir
    .filter(item => item.type === 'dir')
    .filter(item => {
      const name = item.name;
      // Responsive Web Design block patterns
      return name.includes('html') || 
             name.includes('css') || 
             name.includes('responsive') ||
             name.includes('accessibility') ||
             name.includes('flexbox') ||
             name.includes('grid');
    })
    .map(item => ({
      name: item.name,
      path: item.path,
      url: item.url
    }));

  console.log(`Found ${respWebDesignBlocks.length} Responsive Web Design blocks`);
  return respWebDesignBlocks;
}

/**
 * Fetch challenges from a block
 */
async function fetchBlockChallenges(blockUrl) {
  const files = await fetchGitHubContent(blockUrl);
  
  // Get all .md files (challenge files)
  const challengeFiles = files
    .filter(file => file.name.endsWith('.md'))
    .map(file => ({
      name: file.name,
      downloadUrl: file.download_url
    }));

  return challengeFiles;
}

/**
 * Download and parse a challenge markdown file
 */
async function fetchChallengeContent(downloadUrl) {
  return new Promise((resolve, reject) => {
    https.get(downloadUrl, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode}`));
        }
      });
    }).on('error', reject);
  });
}

/**
 * Parse freeCodeCamp markdown challenge
 */
function parseChallenge(markdown) {
  const lines = markdown.split('\n');
  
  // Extract frontmatter
  const frontmatterMatch = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return null;

  const frontmatter = {};
  frontmatterMatch[1].split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
      frontmatter[key.trim()] = value;
    }
  });

  // Extract sections
  const sections = {
    description: extractSection(markdown, '--description--'),
    instructions: extractSection(markdown, '--instructions--'),
    hints: extractSection(markdown, '--hints--'),
    seed: extractSection(markdown, '--seed--'),
    solutions: extractSection(markdown, '--solutions--')
  };

  return {
    id: frontmatter.id || '',
    title: frontmatter.title || 'Untitled',
    challengeType: parseInt(frontmatter.challengeType || '0'),
    dashedName: frontmatter.dashedName || '',
    ...sections
  };
}

/**
 * Extract a section from markdown
 */
function extractSection(markdown, sectionName) {
  const regex = new RegExp(`# ${sectionName}\\n([\\s\\S]*?)(?=\\n# --|$)`);
  const match = markdown.match(regex);
  return match ? match[1].trim() : '';
}

/**
 * Convert freeCodeCamp blocks to our course structure
 */
async function convertToOurFormat(blocks) {
  console.log('\nConverting to LEARN-IT-ALL format...');
  
  const course = {
    id: 'freecodecamp-responsive-web-design',
    title: 'Responsive Web Design (freeCodeCamp)',
    description: 'Learn HTML and CSS by building real projects. Master responsive web design, accessibility, and modern CSS techniques through hands-on coding challenges.',
    category: 'Web Development',
    difficulty: 'Beginner',
    estimatedHours: 300,
    language: 'html',
    prerequisites: [],
    tags: ['html', 'css', 'responsive-design', 'accessibility', 'flexbox', 'grid', 'web-design'],
    source: 'freeCodeCamp',
    sourceUrl: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/',
    license: 'BSD-3-Clause (code), CC BY-SA 4.0 (learning resources)',
    chapters: []
  };

  // Convert each block to a chapter
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    console.log(`\nProcessing block ${i + 1}/${blocks.length}: ${block.name}`);
    
    try {
      const challengeFiles = await fetchBlockChallenges(block.url);
      console.log(`  Found ${challengeFiles.length} challenges`);
      
      // Fetch first few challenges as samples (don't fetch all to avoid rate limits)
      const sampleChallenges = challengeFiles.slice(0, 3);
      const lessons = [];
      
      for (const file of sampleChallenges) {
        try {
          const content = await fetchChallengeContent(file.downloadUrl);
          const challenge = parseChallenge(content);
          
          if (challenge) {
            lessons.push(file.name.replace('.md', ''));
          }
          
          // Rate limiting - wait between requests
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (err) {
          console.log(`    Warning: Could not fetch ${file.name}: ${err.message}`);
        }
      }
      
      const chapter = {
        id: `chapter-${String(i + 1).padStart(2, '0')}`,
        title: formatBlockName(block.name),
        description: `Complete challenges in ${formatBlockName(block.name)}`,
        order: i + 1,
        lessons: lessons
      };
      
      course.chapters.push(chapter);
      
    } catch (err) {
      console.log(`  Error processing block: ${err.message}`);
    }
  }

  return course;
}

/**
 * Format block name for display
 */
function formatBlockName(dashedName) {
  return dashedName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Main execution
 */
async function main() {
  try {
    console.log('='.repeat(60));
    console.log('freeCodeCamp Curriculum Fetcher');
    console.log('='.repeat(60));
    
    // Find Responsive Web Design blocks
    const blocks = await findRespWebDesignBlocks();
    
    if (blocks.length === 0) {
      console.log('\nNo Responsive Web Design blocks found!');
      return;
    }
    
    // Convert to our format
    const course = await convertToOurFormat(blocks);
    
    // Save course.json
    const outputDir = path.join(__dirname, '..', 'content', 'courses', 'freecodecamp-responsive-web-design');
    const coursePath = path.join(outputDir, 'course.json');
    
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    fs.writeFileSync(coursePath, JSON.stringify(course, null, 2));
    
    console.log('\n' + '='.repeat(60));
    console.log('✅ SUCCESS!');
    console.log('='.repeat(60));
    console.log(`Course data saved to: ${coursePath}`);
    console.log(`\nCourse: ${course.title}`);
    console.log(`Chapters: ${course.chapters.length}`);
    console.log(`\nNext steps:`);
    console.log(`1. Review the course.json file`);
    console.log(`2. Create lesson and exercise directories`);
    console.log(`3. Fetch full challenge content (this was a sample)`);
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the script
main();
