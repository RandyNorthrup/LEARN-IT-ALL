import Link from 'next/link';
import { Trophy, Code, Zap, Brain, Database, Globe } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  points: number;
  category: string;
  description: string;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  challenges: Challenge[];
}

const categories: Category[] = [
  {
    id: 'python',
    name: 'Python',
    icon: <Code className="h-6 w-6" />,
    color: 'from-blue-500 to-cyan-600',
    description: 'Python programming challenges from basics to advanced',
    challenges: [
      { id: 'py-1', title: 'List Comprehension Master', difficulty: 'Medium', points: 50, category: 'python', description: 'Transform nested loops into elegant list comprehensions' },
      { id: 'py-2', title: 'Decorator Design', difficulty: 'Hard', points: 100, category: 'python', description: 'Build a caching decorator with TTL support' },
      { id: 'py-3', title: 'Generator Pipeline', difficulty: 'Expert', points: 150, category: 'python', description: 'Create efficient data processing pipeline using generators' },
    ],
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: <Zap className="h-6 w-6" />,
    color: 'from-yellow-500 to-orange-600',
    description: 'JavaScript challenges for modern web development',
    challenges: [
      { id: 'js-1', title: 'Promise Chain Master', difficulty: 'Medium', points: 50, category: 'javascript', description: 'Handle complex async operations with promise chains' },
      { id: 'js-2', title: 'Closure Challenge', difficulty: 'Hard', points: 100, category: 'javascript', description: 'Build a module pattern using closures' },
      { id: 'js-3', title: 'Event Loop Expert', difficulty: 'Expert', points: 150, category: 'javascript', description: 'Predict execution order in complex async scenarios' },
    ],
  },
  {
    id: 'sql',
    name: 'SQL & Databases',
    icon: <Database className="h-6 w-6" />,
    color: 'from-purple-500 to-pink-600',
    description: 'Database design and query optimization challenges',
    challenges: [
      { id: 'sql-1', title: 'Join Mastery', difficulty: 'Medium', points: 50, category: 'sql', description: 'Complex multi-table joins and subqueries' },
      { id: 'sql-2', title: 'Query Optimization', difficulty: 'Hard', points: 100, category: 'sql', description: 'Optimize slow queries for better performance' },
      { id: 'sql-3', title: 'Schema Design', difficulty: 'Expert', points: 150, category: 'sql', description: 'Design normalized database schema from requirements' },
    ],
  },
  {
    id: 'react',
    name: 'React & Frontend',
    icon: <Globe className="h-6 w-6" />,
    color: 'from-cyan-500 to-blue-600',
    description: 'React components, hooks, and state management',
    challenges: [
      { id: 'react-1', title: 'Custom Hook Builder', difficulty: 'Medium', points: 50, category: 'react', description: 'Create reusable custom React hooks' },
      { id: 'react-2', title: 'State Management', difficulty: 'Hard', points: 100, category: 'react', description: 'Implement complex state with useReducer' },
      { id: 'react-3', title: 'Performance Optimization', difficulty: 'Expert', points: 150, category: 'react', description: 'Optimize large list rendering with virtualization' },
    ],
  },
  {
    id: 'algorithms',
    name: 'Algorithms & DS',
    icon: <Brain className="h-6 w-6" />,
    color: 'from-green-500 to-emerald-600',
    description: 'Data structures and algorithm challenges',
    challenges: [
      { id: 'algo-1', title: 'Binary Search Tree', difficulty: 'Medium', points: 50, category: 'algorithms', description: 'Implement BST with insert, delete, search' },
      { id: 'algo-2', title: 'Dynamic Programming', difficulty: 'Hard', points: 100, category: 'algorithms', description: 'Solve knapsack problem with memoization' },
      { id: 'algo-3', title: 'Graph Traversal', difficulty: 'Expert', points: 150, category: 'algorithms', description: 'Find shortest path in weighted graph' },
    ],
  },
  {
    id: 'system-design',
    name: 'System Design',
    icon: <Trophy className="h-6 w-6" />,
    color: 'from-indigo-500 to-violet-600',
    description: 'Large-scale system architecture challenges',
    challenges: [
      { id: 'sys-1', title: 'URL Shortener Design', difficulty: 'Medium', points: 50, category: 'system-design', description: 'Design scalable URL shortening service' },
      { id: 'sys-2', title: 'Cache Strategy', difficulty: 'Hard', points: 100, category: 'system-design', description: 'Design distributed caching system' },
      { id: 'sys-3', title: 'Social Media Feed', difficulty: 'Expert', points: 150, category: 'system-design', description: 'Design Twitter-like feed at scale' },
    ],
  },
];

function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const colors = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-orange-100 text-orange-800',
    Expert: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[difficulty as keyof typeof colors]}`}>
      {difficulty}
    </span>
  );
}

export default function ChallengesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/dashboard" className="text-blue-600 hover:underline mb-2 inline-block">
                ← Back to Dashboard
              </Link>
              <h1 className="text-4xl font-bold text-gray-900">Coding Challenges</h1>
              <p className="mt-1 text-gray-600">Test your skills with real-world coding problems</p>
            </div>
            <Trophy className="h-12 w-12 text-yellow-600" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Challenge Categories</h2>
          <p className="mt-2 text-lg text-gray-600">
            Select a category and start solving challenges to earn points
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-8">
          {categories.map((category) => (
            <div key={category.id} className="rounded-2xl bg-white p-6 shadow-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} text-white`}>
                  {category.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900">{category.name}</h3>
                  <p className="text-gray-600">{category.description}</p>
                </div>
                <div className="text-sm text-gray-500">
                  {category.challenges.length} challenges
                </div>
              </div>

              {/* Challenges Grid */}
              <div className="grid gap-4 md:grid-cols-3">
                {category.challenges.map((challenge) => (
                  <Link
                    key={challenge.id}
                    href={`/challenges/${category.id}/${challenge.id}`}
                    className="group border border-gray-200 rounded-lg p-4 hover:border-amber-500 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 group-hover:text-amber-600">
                        {challenge.title}
                      </h4>
                      <DifficultyBadge difficulty={challenge.difficulty} />
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1 text-amber-600 font-semibold">
                        <Trophy className="h-4 w-4" />
                        {challenge.points} pts
                      </span>
                      <span className="text-blue-600 group-hover:underline">
                        Start Challenge →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 rounded-2xl bg-white p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">How Challenges Work</h3>
          <div className="grid gap-6 md:grid-cols-4">
            <div>
              <div className="text-3xl font-bold text-amber-600 mb-2">1</div>
              <h4 className="font-semibold text-gray-900 mb-1">Pick a Challenge</h4>
              <p className="text-gray-600 text-sm">Choose from various difficulty levels and topics</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-600 mb-2">2</div>
              <h4 className="font-semibold text-gray-900 mb-1">Write Code</h4>
              <p className="text-gray-600 text-sm">Solve the problem using your coding skills</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-600 mb-2">3</div>
              <h4 className="font-semibold text-gray-900 mb-1">Pass Tests</h4>
              <p className="text-gray-600 text-sm">Your solution must pass all test cases</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-600 mb-2">4</div>
              <h4 className="font-semibold text-gray-900 mb-1">Earn Points</h4>
              <p className="text-gray-600 text-sm">Get points based on difficulty and efficiency</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
