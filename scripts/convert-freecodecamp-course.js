/**
 * Convert freeCodeCamp Course
 * 
 * Complete conversion of freeCodeCamp curriculum to LEARN-IT-ALL format.
 * This script:
 * 1. Reads freeCodeCamp markdown challenges
 * 2. Converts them to our lesson/exercise format
 * 3. Generates proper course structure with chapters
 * 4. Creates all necessary files (lessons, exercises, quizzes)
 * 5. Wires everything into the application
 * 
 * Usage: node scripts/convert-freecodecamp-course.js <superblock-name>
 * Example: node scripts/convert-freecodecamp-course.js responsive-web-design
 */

const fs = require('fs');
const path = require('path');

// Configuration
const FREECODECAMP_ROOT = path.join(__dirname, '..', 'temp-freecodecamp', 'curriculum', 'challenges', 'english');
const CONTENT_ROOT = path.join(__dirname, '..', 'content', 'courses');

// SuperBlock mappings from freeCodeCamp
const SUPERBLOCK_CONFIG = {
  'responsive-web-design': {
    id: 'freecodecamp-responsive-web-design',
    title: 'Responsive Web Design (freeCodeCamp)',
    description: 'Learn HTML and CSS by building real projects. Master responsive web design, accessibility, and modern CSS techniques.',
    difficulty: 'Beginner',
    estimatedHours: 300,
    language: 'html',
    tags: ['html', 'css', 'responsive-design', 'accessibility', 'flexbox', 'grid'],
    category: 'Web Development',
    blockPatterns: [
      'learn-html',
      'learn-basic-css',
      'learn-css',
      'css-flexbox',
      'css-grid',
      'accessibility',
      'responsive',
      'html-forms'
    ]
  },
  'javascript-algorithms-and-data-structures': {
    id: 'freecodecamp-javascript-algorithms',
    title: 'JavaScript Algorithms and Data Structures (freeCodeCamp)',
    description: 'Learn JavaScript fundamentals, ES6, algorithms, data structures, OOP, and functional programming.',
    difficulty: 'Beginner',
    estimatedHours: 300,
    language: 'javascript',
    tags: ['javascript', 'algorithms', 'data-structures', 'es6', 'oop', 'functional-programming'],
    category: 'Programming',
    blockPatterns: [
      'learn-introductory-javascript',
      'learn-basic-javascript',
      'learn-javascript',
      'es6',
      'regular-expressions',
      'debugging',
      'data-structures',
      'algorithm',
      'object-oriented',
      'functional-programming'
    ]
  },
  'front-end-development-libraries': {
    id: 'freecodecamp-frontend-libraries',
    title: 'Front End Development Libraries (freeCodeCamp)',
    description: 'Learn Bootstrap, jQuery, Sass, React, and Redux. Build front-end projects with modern libraries and frameworks.',
    difficulty: 'Intermediate',
    estimatedHours: 300,
    language: 'javascript',
    tags: ['react', 'redux', 'bootstrap', 'jquery', 'sass', 'frontend'],
    category: 'Web Development',
    blockPatterns: [
      'bootstrap',
      'jquery',
      'sass',
      'react',
      'redux'
    ]
  },
  'data-visualization': {
    id: 'freecodecamp-data-visualization',
    title: 'Data Visualization (freeCodeCamp)',
    description: 'Learn D3.js, JSON APIs, and AJAX. Create dynamic visualizations and work with external data sources.',
    difficulty: 'Intermediate',
    estimatedHours: 300,
    language: 'javascript',
    tags: ['d3js', 'data-visualization', 'json', 'ajax', 'apis'],
    category: 'Data Science',
    blockPatterns: [
      'data-visualization-with-d3',
      'json-apis-and-ajax'
    ]
  },
  'back-end-development-and-apis': {
    id: 'freecodecamp-backend-apis',
    title: 'Back End Development and APIs (freeCodeCamp)',
    description: 'Learn Node.js, Express, MongoDB, and Mongoose. Build RESTful APIs and full-stack applications.',
    difficulty: 'Intermediate',
    estimatedHours: 300,
    language: 'javascript',
    tags: ['nodejs', 'express', 'mongodb', 'apis', 'backend'],
    category: 'Backend Development',
    blockPatterns: [
      'managing-packages-with-npm',
      'basic-node-and-express',
      'mongodb-and-mongoose'
    ]
  },
  'quality-assurance': {
    id: 'freecodecamp-quality-assurance',
    title: 'Quality Assurance (freeCodeCamp)',
    description: 'Learn testing with Chai, advanced Node.js, and quality assurance best practices.',
    difficulty: 'Advanced',
    estimatedHours: 300,
    language: 'javascript',
    tags: ['testing', 'chai', 'mocha', 'qa', 'nodejs'],
    category: 'Software Engineering',
    blockPatterns: [
      'quality-assurance-and-testing-with-chai',
      'advanced-node-and-express'
    ]
  },
  'scientific-computing-with-python': {
    id: 'freecodecamp-python-scientific',
    title: 'Scientific Computing with Python (freeCodeCamp)',
    description: 'Learn Python fundamentals and scientific computing libraries. Master Python for data analysis and computation.',
    difficulty: 'Beginner',
    estimatedHours: 300,
    language: 'python',
    tags: ['python', 'scientific-computing', 'data-analysis', 'numpy'],
    category: 'Data Science',
    blockPatterns: [
      'learn-string-manipulation',
      'learn-how-to-work-with-numbers-and-strings',
      'learn-python',
      'python-for-everybody'
    ]
  },
  'data-analysis-with-python': {
    id: 'freecodecamp-python-data-analysis',
    title: 'Data Analysis with Python (freeCodeCamp)',
    description: 'Learn NumPy, Pandas, Matplotlib, and Seaborn. Master data analysis and visualization in Python.',
    difficulty: 'Intermediate',
    estimatedHours: 300,
    language: 'python',
    tags: ['python', 'numpy', 'pandas', 'matplotlib', 'data-analysis'],
    category: 'Data Science',
    blockPatterns: [
      'data-analysis-with-python',
      'numpy',
      'pandas'
    ]
  },
  'machine-learning-with-python': {
    id: 'freecodecamp-python-machine-learning',
    title: 'Machine Learning with Python (freeCodeCamp)',
    description: 'Learn TensorFlow, neural networks, and machine learning algorithms. Build AI models with Python.',
    difficulty: 'Advanced',
    estimatedHours: 300,
    language: 'python',
    tags: ['python', 'machine-learning', 'tensorflow', 'neural-networks', 'ai'],
    category: 'AI/ML',
    blockPatterns: [
      'tensorflow',
      'machine-learning',
      'neural-network'
    ]
  },
  'information-security': {
    id: 'freecodecamp-information-security',
    title: 'Information Security (freeCodeCamp)',
    description: 'Learn security best practices, penetration testing, and secure coding. Master information security fundamentals.',
    difficulty: 'Advanced',
    estimatedHours: 300,
    language: 'javascript',
    tags: ['security', 'penetration-testing', 'encryption', 'infosec'],
    category: 'Cybersecurity',
    blockPatterns: [
      'information-security-with-helmetjs',
      'python-for-penetration-testing'
    ]
  },
  'college-algebra-with-python': {
    id: 'freecodecamp-college-algebra-python',
    title: 'College Algebra with Python (freeCodeCamp)',
    description: 'Learn algebra concepts and solve problems using Python. Master mathematical problem-solving with programming.',
    difficulty: 'Beginner',
    estimatedHours: 300,
    language: 'python',
    tags: ['python', 'algebra', 'mathematics', 'problem-solving'],
    category: 'Mathematics',
    blockPatterns: [
      'learn-how-to-solve-for-x',
      'learn-fractions-and-decimals',
      'learn-functions-and-graphing',
      'learn-linear-functions',
      'learn-common-factors-and-square-roots',
      'learn-how-to-graph-systems-of-equations',
      'learn-how-to-solve-systems-of-equations',
      'learn-applications-of-linear-systems',
      'learn-quadratic-equations',
      'learn-parent-graphs-and-polynomials',
      'learn-business-applications',
      'learn-simple-and-compound-interest',
      'learn-exponents-and-logarithms',
      'college-algebra-with-python'
    ]
  },
  'foundational-c-sharp-with-microsoft': {
    id: 'freecodecamp-csharp-microsoft',
    title: 'Foundational C# with Microsoft (freeCodeCamp)',
    description: 'Learn C# programming fundamentals with Microsoft. Master console applications, logic, and debugging.',
    difficulty: 'Beginner',
    estimatedHours: 300,
    language: 'csharp',
    tags: ['csharp', 'dotnet', 'microsoft', 'programming'],
    category: 'Programming',
    blockPatterns: [
      'write-your-first-code-using-c-sharp',
      'create-and-run-simple-c-sharp-console-applications',
      'add-logic-to-c-sharp-console-applications',
      'work-with-variable-data-in-c-sharp',
      'create-methods-in-c-sharp-console-applications',
      'debug-c-sharp-console-applications'
    ]
  },
  'relational-database': {
    id: 'freecodecamp-relational-database',
    title: 'Relational Database (freeCodeCamp)',
    description: 'Learn PostgreSQL, SQL, and database design. Master relational databases and data management.',
    difficulty: 'Intermediate',
    estimatedHours: 300,
    language: 'sql',
    tags: ['sql', 'postgresql', 'database', 'data-management'],
    category: 'Databases',
    blockPatterns: [
      'learn-bash-by-building-a-boilerplate',
      'learn-relational-databases-by-building-a-mario-database',
      'learn-bash-scripting-by-building-five-programs',
      'learn-sql-by-building-a-student-database',
      'learn-advanced-bash-by-building-a-kitty-ipsum-translator',
      'learn-bash-and-sql-by-building-a-bike-rental-shop',
      'learn-nano-by-building-a-castle',
      'learn-git-by-building-an-sql-reference-object'
    ]
  }
};

/**
 * Parse freeCodeCamp markdown challenge
 */
function parseChallengeMD(content) {
  // Extract frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    return null;
  }

  const frontmatter = {};
  frontmatterMatch[1].split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      
      // Remove quotes
      value = value.replace(/^["']|["']$/g, '');
      
      // Parse numbers
      if (!isNaN(value) && value !== '') {
        value = parseInt(value, 10);
      }
      
      frontmatter[key] = value;
    }
  });

  // Extract content sections
  const sections = {
    description: extractSection(content, 'description'),
    instructions: extractSection(content, 'instructions'),
    hints: extractHints(content),
    seed: extractSeed(content),
    solution: extractSection(content, 'solutions'),
    tests: extractTests(content),
    quizQuestions: extractQuizQuestions(content)
  };

  return {
    ...frontmatter,
    ...sections
  };
}

/**
 * Extract section from markdown
 */
function extractSection(markdown, sectionName) {
  const regex = new RegExp(`# --${sectionName}--\\s*\\n([\\s\\S]*?)(?=\\n# --|$)`, 'i');
  const match = markdown.match(regex);
  return match ? match[1].trim() : '';
}

/**
 * Extract hints from markdown
 */
function extractHints(markdown) {
  const hintsSection = extractSection(markdown, 'hints');
  if (!hintsSection) return [];

  const hints = [];
  
  // Split by text descriptions and code blocks
  const blocks = hintsSection.split(/\n\n+/);
  
  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;
    
    // Skip if it's just a code block (JavaScript assertion)
    if (trimmed.match(/^```[a-z]*\n[\s\S]*?\n```$/)) {
      continue;
    }
    
    // If it contains a code block, extract only the text before it
    const textMatch = trimmed.match(/^(.*?)(?=\n```|$)/s);
    if (textMatch) {
      const hintText = textMatch[1].trim();
      if (hintText && !hintText.startsWith('```')) {
        hints.push(hintText);
      }
    }
  }

  return hints.length > 0 ? hints : [];
}

/**
 * Extract seed code
 */
function extractSeed(markdown) {
  const seedSection = extractSection(markdown, 'seed');
  if (!seedSection) return '';

  // Look for seed-contents section
  const contentsMatch = seedSection.match(/## --seed-contents--\s*\n([\s\S]*?)(?=\n## |$)/);
  if (contentsMatch) {
    // Extract code from markdown code blocks
    const codeMatch = contentsMatch[1].match(/```[a-z]*\n([\s\S]*?)\n```/);
    return codeMatch ? codeMatch[1].trim() : contentsMatch[1].trim();
  }

  return seedSection;
}

/**
 * Extract test cases
 */
function extractTests(markdown) {
  const hintsSection = extractSection(markdown, 'hints');
  if (!hintsSection) return [];

  const tests = [];
  const testBlocks = hintsSection.split(/\n(?=```)/);

  testBlocks.forEach((block, index) => {
    const codeMatch = block.match(/```[a-z]*\n([\s\S]*?)\n```/);
    const descMatch = block.match(/^(.*?)\n/);
    
    if (codeMatch) {
      tests.push({
        id: `test-${index + 1}`,
        description: descMatch ? descMatch[1].trim() : `Test ${index + 1}`,
        code: codeMatch[1].trim()
      });
    }
  });

  return tests;
}

/**
 * Extract quiz questions from --quizzes-- section
 */
function extractQuizQuestions(markdown) {
  const quizzesSection = extractSection(markdown, 'quizzes');
  if (!quizzesSection) return [];

  const questions = [];
  
  // Split by --quiz-- markers
  const quizBlocks = quizzesSection.split(/## --quiz--/);
  
  for (const quizBlock of quizBlocks) {
    if (!quizBlock.trim()) continue;

    // Extract questions from this quiz
    const questionBlocks = quizBlock.split(/### --question--/);
    
    for (const qBlock of questionBlocks) {
      if (!qBlock.trim()) continue;

      try {
        // Extract question text
        const textMatch = qBlock.match(/#### --text--\s*\n([\s\S]*?)(?=\n#### --)/);
        if (!textMatch) continue;

        const questionText = textMatch[1].trim();

        // Extract distractors (wrong answers)
        const distractorsMatch = qBlock.match(/#### --distractors--\s*\n([\s\S]*?)(?=\n#### --answer--)/);
        const distractors = [];
        
        if (distractorsMatch) {
          const distractorText = distractorsMatch[1].trim();
          // Split by --- separator
          const distractorParts = distractorText.split(/\n---\n/);
          distractorParts.forEach(part => {
            const cleaned = part.trim();
            if (cleaned) {
              distractors.push(cleaned);
            }
          });
        }

        // Extract correct answer
        const answerMatch = qBlock.match(/#### --answer--\s*\n([\s\S]*?)(?=\n### |$)/);
        const correctAnswer = answerMatch ? answerMatch[1].trim() : '';

        if (questionText && correctAnswer) {
          // Build choices array (all options)
          const choices = [...distractors, correctAnswer];
          
          // Find correct answer index
          const correctIndex = choices.indexOf(correctAnswer);

          questions.push({
            id: `q${questions.length + 1}`,
            question: questionText,
            choices: choices,
            correctAnswer: correctIndex,
            explanation: '' // freeCodeCamp doesn't include explanations
          });
        }
      } catch (err) {
        console.log(`    ⚠️  Error parsing quiz question: ${err.message}`);
      }
    }
  }

  return questions;
}

/**
 * Get all blocks in the freeCodeCamp directory
 */
function getBlocksInDirectory() {
  const blocksDir = path.join(FREECODECAMP_ROOT, 'blocks');
  
  if (!fs.existsSync(blocksDir)) {
    throw new Error(`Blocks directory not found: ${blocksDir}`);
  }

  return fs.readdirSync(blocksDir)
    .filter(item => {
      const itemPath = path.join(blocksDir, item);
      return fs.statSync(itemPath).isDirectory();
    })
    .map(blockName => ({
      name: blockName,
      path: path.join(blocksDir, blockName)
    }));
}

/**
 * Filter blocks by superblock patterns
 */
function filterBlocksForSuperBlock(blocks, config) {
  if (!config.blockPatterns || config.blockPatterns.length === 0) {
    return blocks;
  }

  return blocks.filter(block => {
    return config.blockPatterns.some(pattern => 
      block.name.toLowerCase().includes(pattern.toLowerCase())
    );
  });
}

/**
 * Read all challenges in a block
 */
function getChallengesInBlock(blockPath) {
  const files = fs.readdirSync(blockPath);
  
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => ({
      filename: file,
      path: path.join(blockPath, file)
    }));
}

/**
 * Convert challenge to lesson format
 */
function convertToLesson(challenge, lessonNumber, chapterNumber) {
  const lessonId = `lesson-${String(chapterNumber).padStart(3, '0')}-${String(lessonNumber).padStart(3, '0')}`;
  
  // Get description (overview of the challenge)
  const description = challenge.description || '';
  
  // Get instructions (what the student needs to do)
  const instructions = challenge.instructions || '';
  
  // Get hints from test descriptions
  const hints = challenge.hints || [];
  
  // Get starter code
  const starterCode = challenge.seed || '';
  
  // Get solution code
  const solution = challenge.solution || '';
  
  return {
    id: lessonId,
    title: challenge.title || 'Untitled Lesson',
    description,
    instructions,
    starterCode,
    solution,
    hints: Array.isArray(hints) ? hints : (hints ? [hints] : []),
    estimatedTime: 5,
    source: 'freeCodeCamp',
    sourceId: challenge.id || '',
    dashedName: challenge.dashedName || lessonId,
    challengeType: challenge.challengeType
  };
}

/**
 * Convert challenge to exercise format
 */
function convertToExercise(challenge, exerciseNumber, chapterNumber) {
  const exerciseId = `exercise-${String(chapterNumber).padStart(3, '0')}-${String(exerciseNumber).padStart(3, '0')}`;
  
  return {
    id: exerciseId,
    title: challenge.title || 'Untitled Exercise',
    description: challenge.instructions || challenge.description || '',
    difficulty: 'medium',
    estimatedTime: 10,
    starterCode: challenge.seed || '',
    solution: challenge.solution || '',
    hints: Array.isArray(challenge.hints) ? challenge.hints : [challenge.hints || ''],
    testCases: challenge.tests || [],
    source: 'freeCodeCamp',
    sourceId: challenge.id || '',
    language: challenge.language || 'javascript'
  };
}

/**
 * Format block name for display
 */
function formatBlockName(dashedName) {
  return dashedName
    .replace(/^(learn|quiz|workshop|lab|lecture|review|top)-/i, '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Determine block type
 */
function getBlockType(blockName) {
  const name = blockName.toLowerCase();
  
  if (name.startsWith('quiz-')) return 'quiz';
  if (name.startsWith('exam-')) return 'exam';
  if (name.startsWith('lab-')) return 'lab';
  if (name.startsWith('workshop-')) return 'workshop';
  if (name.startsWith('lecture-')) return 'lecture';
  if (name.startsWith('review-')) return 'review';
  if (name.startsWith('learn-')) return 'lesson';
  
  return 'lesson'; // Default
}

/**
 * Convert full superblock
 */
async function convertSuperBlock(superblockName) {
  const config = SUPERBLOCK_CONFIG[superblockName];
  
  if (!config) {
    throw new Error(`Unknown superblock: ${superblockName}. Available: ${Object.keys(SUPERBLOCK_CONFIG).join(', ')}`);
  }

  console.log('='.repeat(70));
  console.log(`Converting: ${config.title}`);
  console.log('='.repeat(70));

  // Create output directory
  const outputDir = path.join(CONTENT_ROOT, config.id);
  const lessonsDir = path.join(outputDir, 'lessons');
  const exercisesDir = path.join(outputDir, 'exercises');
  const quizzesDir = path.join(outputDir, 'quizzes');

  [outputDir, lessonsDir, exercisesDir, quizzesDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  // Get and filter blocks
  const allBlocks = getBlocksInDirectory();
  const blocks = filterBlocksForSuperBlock(allBlocks, config);

  console.log(`\nFound ${blocks.length} matching blocks (from ${allBlocks.length} total)`);

  const course = {
    id: config.id,
    title: config.title,
    description: config.description,
    category: config.category,
    difficulty: config.difficulty,
    estimatedHours: config.estimatedHours,
    language: config.language,
    prerequisites: [],
    tags: config.tags,
    source: 'freeCodeCamp',
    sourceUrl: `https://www.freecodecamp.org/learn/${superblockName}/`,
    license: 'BSD-3-Clause (code), CC BY-SA 4.0 (learning resources)',
    chapters: []
  };

  let totalLessons = 0;
  let totalExercises = 0;
  let totalQuizzes = 0;

  // Process each block
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const blockType = getBlockType(block.name);
    
    console.log(`\n[${i + 1}/${blocks.length}] Processing: ${block.name} (${blockType})`);

    try {
      const challenges = getChallengesInBlock(block.path);
      console.log(`  Found ${challenges.length} challenges`);

      if (challenges.length === 0) {
        console.log(`  ⚠️  Skipping empty block`);
        continue;
      }

      const chapter = {
        id: `chapter-${String(i + 1).padStart(2, '0')}`,
        title: formatBlockName(block.name),
        description: `Master ${formatBlockName(block.name)} through hands-on challenges`,
        order: i + 1,
        lessons: [],
        blockType: blockType
        // quizId will be added if this block contains a quiz
      };

      // Process challenges in this block
      for (let j = 0; j < challenges.length; j++) {
        const challengeFile = challenges[j];
        
        try {
          const content = fs.readFileSync(challengeFile.path, 'utf-8');
          const challenge = parseChallengeMD(content);

          if (!challenge) {
            console.log(`    ⚠️  Could not parse: ${challengeFile.filename}`);
            continue;
          }

          // Convert based on block type
          if (blockType === 'quiz' || blockType === 'exam') {
            // Save as quiz with extracted questions
            const quizId = `quiz-${String(i + 1).padStart(2, '0')}-${block.name}`;
            const quiz = {
              id: quizId,
              title: challenge.title || formatBlockName(block.name),
              description: challenge.description || '',
              questions: challenge.quizQuestions || [],
              passingScore: blockType === 'exam' ? 80 : 70,
              timeLimit: blockType === 'exam' ? 60 : 30,
              source: 'freeCodeCamp',
              sourceId: challenge.id || ''
            };

            fs.writeFileSync(
              path.join(quizzesDir, `${quizId}.json`),
              JSON.stringify(quiz, null, 2)
            );
            
            // Add quizId to chapter so UI can find it
            chapter.quizId = quizId;
            
            totalQuizzes++;
          } else {
            // Save as lesson
            const lesson = convertToLesson(challenge, j + 1, i + 1);
            const lessonFilename = `${lesson.id}-${challenge.dashedName || lesson.id}.md`;
            
            // Build lesson content sections
            let lessonMarkdown = `---
id: ${lesson.id}
title: ${lesson.title}
chapterId: chapter-${String(i + 1).padStart(2, '0')}
order: ${j + 1}
duration: 5
objectives:
  - ${lesson.title}
---

# ${lesson.title}

`;

            // Add description (overview)
            if (lesson.description) {
              lessonMarkdown += `${lesson.description}\n\n`;
            }

            // Add instructions (what to do)
            if (lesson.instructions) {
              lessonMarkdown += `## Instructions\n\n${lesson.instructions}\n\n`;
            }

            // Add starter code if present
            if (lesson.starterCode) {
              lessonMarkdown += `## Starter Code\n\n\`\`\`${challenge.language || 'html'}\n${lesson.starterCode}\n\`\`\`\n\n`;
            }

            // Add hints if present
            if (lesson.hints && lesson.hints.length > 0) {
              lessonMarkdown += `## Hints\n\n`;
              lesson.hints.forEach((hint, idx) => {
                lessonMarkdown += `${idx + 1}. ${hint}\n`;
              });
              lessonMarkdown += `\n`;
            }

            // Add solution if present
            if (lesson.solution) {
              lessonMarkdown += `## Solution\n\n\`\`\`${challenge.language || 'html'}\n${lesson.solution}\n\`\`\`\n\n`;
            }

            lessonMarkdown += `---

*Source: [freeCodeCamp](${course.sourceUrl})*
*Original Challenge ID: ${lesson.sourceId}*
`;

            fs.writeFileSync(
              path.join(lessonsDir, lessonFilename),
              lessonMarkdown
            );

            chapter.lessons.push(lessonFilename);
            totalLessons++;

            // Also create exercise if it has tests
            if (challenge.tests && challenge.tests.length > 0) {
              const exercise = convertToExercise(challenge, j + 1, i + 1);
              const exerciseFilename = `${exercise.id}-${challenge.dashedName || exercise.id}.json`;

              fs.writeFileSync(
                path.join(exercisesDir, exerciseFilename),
                JSON.stringify(exercise, null, 2)
              );

              totalExercises++;
            }
          }
        } catch (err) {
          console.log(`    ❌ Error processing ${challengeFile.filename}: ${err.message}`);
        }
      }

      if (chapter.lessons.length > 0 || blockType === 'quiz') {
        course.chapters.push(chapter);
      }

    } catch (err) {
      console.log(`  ❌ Error processing block: ${err.message}`);
    }
  }

  // Save course.json
  const coursePath = path.join(outputDir, 'course.json');
  fs.writeFileSync(coursePath, JSON.stringify(course, null, 2));

  console.log('\n' + '='.repeat(70));
  console.log('✅ CONVERSION COMPLETE');
  console.log('='.repeat(70));
  console.log(`Course: ${config.title}`);
  console.log(`Output: ${outputDir}`);
  console.log(`\nStatistics:`);
  console.log(`  Chapters: ${course.chapters.length}`);
  console.log(`  Lessons: ${totalLessons}`);
  console.log(`  Exercises: ${totalExercises}`);
  console.log(`  Quizzes: ${totalQuizzes}`);
  console.log(`\nFiles created:`);
  console.log(`  ${coursePath}`);
  console.log(`  ${lessonsDir}/ (${totalLessons} files)`);
  console.log(`  ${exercisesDir}/ (${totalExercises} files)`);
  console.log(`  ${quizzesDir}/ (${totalQuizzes} files)`);

  return course;
}

// Main execution
const superblock = process.argv[2];

if (!superblock) {
  console.error('Usage: node convert-freecodecamp-course.js <superblock-name>');
  console.error('\nAvailable superblocks:');
  Object.keys(SUPERBLOCK_CONFIG).forEach(key => {
    console.error(`  - ${key}`);
  });
  process.exit(1);
}

convertSuperBlock(superblock)
  .then(() => {
    console.log('\n✅ Done!');
  })
  .catch(err => {
    console.error('\n❌ Error:', err.message);
    console.error(err.stack);
    process.exit(1);
  });
