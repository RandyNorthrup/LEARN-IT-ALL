import Link from 'next/link';
import { Gamepad2, Zap, Brain, Target, Code, Puzzle, Rocket } from 'lucide-react';

interface Game {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  icon: React.ReactNode;
  color: string;
}

const games: Game[] = [
  {
    id: 'lunar-lander',
    title: 'Lunar Lander',
    description: 'Master physics and precision landing. Control thrust and rotation to safely land your spacecraft on the platform.',
    difficulty: 'Medium',
    icon: <Rocket className="h-8 w-8" />,
    color: 'from-orange-500 to-red-600',
  },
  {
    id: 'code-lander',
    title: 'Code Lander',
    description: 'Land your spacecraft by writing code to control thrust and rotation. Learn physics and programming together.',
    difficulty: 'Hard',
    icon: <Code className="h-8 w-8" />,
    color: 'from-purple-500 to-pink-600',
  },
  {
    id: 'code-hunter',
    title: 'Code Hunter',
    description: 'Find and fix bugs in Python code snippets. Race against time to spot syntax errors, logic bugs, and improve code quality.',
    difficulty: 'Easy',
    icon: <Target className="h-8 w-8" />,
    color: 'from-blue-500 to-cyan-600',
  },
  {
    id: 'syntax-speed',
    title: 'Syntax Speed',
    description: 'Type code snippets as fast as you can with perfect accuracy. Improve your typing speed and muscle memory for common patterns.',
    difficulty: 'Easy',
    icon: <Zap className="h-8 w-8" />,
    color: 'from-green-500 to-emerald-600',
  },
  {
    id: 'logic-maze',
    title: 'Logic Maze',
    description: 'Navigate through a maze using Python logic and conditionals. Plan your path using if-else statements and loops.',
    difficulty: 'Medium',
    icon: <Brain className="h-8 w-8" />,
    color: 'from-purple-500 to-pink-600',
  },
  {
    id: 'code-builder',
    title: 'Code Builder',
    description: 'Build working programs from scrambled code blocks. Drag and drop code snippets into the correct order to solve problems.',
    difficulty: 'Medium',
    icon: <Puzzle className="h-8 w-8" />,
    color: 'from-orange-500 to-red-600',
  },
  {
    id: 'algorithm-arena',
    title: 'Algorithm Arena',
    description: 'Optimize algorithms for speed and efficiency. Compete to write the fastest sorting, searching, and data processing code.',
    difficulty: 'Hard',
    icon: <Code className="h-8 w-8" />,
    color: 'from-indigo-500 to-violet-600',
  },
];

function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const colors = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[difficulty as keyof typeof colors]}`}>
      {difficulty}
    </span>
  );
}

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/dashboard" className="text-blue-600 hover:underline mb-2 inline-block">
                ← Back to Dashboard
              </Link>
              <h1 className="text-4xl font-bold text-gray-900">Coding Games</h1>
              <p className="mt-1 text-gray-600">Learn programming through interactive games and challenges</p>
            </div>
            <Gamepad2 className="h-12 w-12 text-purple-600" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Choose Your Game</h2>
          <p className="mt-2 text-lg text-gray-600">
            Select a game to start learning and having fun
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <Link
              key={game.id}
              href={`/games/${game.id}`}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all hover:scale-105 hover:shadow-2xl"
            >
              <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${game.color}`} />
              
              <div className="mt-4">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${game.color} text-white mb-4`}>
                  {game.icon}
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{game.title}</h3>
                  <DifficultyBadge difficulty={game.difficulty} />
                </div>
                
                <p className="text-gray-600 mb-4">{game.description}</p>
                
                <div className="flex items-center text-sm font-semibold text-purple-600 group-hover:text-purple-700">
                  Play Game
                  <svg
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
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
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 rounded-2xl bg-white p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">How to Play</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">1</div>
              <h4 className="font-semibold text-gray-900 mb-1">Choose a Game</h4>
              <p className="text-gray-600 text-sm">Pick a game that matches your skill level and interests</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">2</div>
              <h4 className="font-semibold text-gray-900 mb-1">Complete Challenges</h4>
              <p className="text-gray-600 text-sm">Solve coding puzzles and complete objectives to earn points</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">3</div>
              <h4 className="font-semibold text-gray-900 mb-1">Track Progress</h4>
              <p className="text-gray-600 text-sm">View your scores, achievements, and unlock new levels</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
