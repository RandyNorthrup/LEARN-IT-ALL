'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Target, Clock, Trophy } from 'lucide-react';

interface Bug {
  code: string;
  bugLine: number;
  description: string;
  hint: string;
  fix: string;
}

const bugChallenges: Bug[] = [
  {
    code: `def greet(name)
    print(f"Hello, {name}!")
    
greet("Python")`,
    bugLine: 1,
    description: 'Missing colon after function definition',
    hint: 'Function definitions need a colon at the end',
    fix: 'def greet(name):',
  },
  {
    code: `numbers = [1, 2, 3, 4, 5]
for num in numbers
    print(num * 2)`,
    bugLine: 2,
    description: 'Missing colon after for statement',
    hint: 'Loop statements require a colon',
    fix: 'for num in numbers:',
  },
  {
    code: `x = 10
y = 20
if x > y
    print("x is greater")
else:
    print("y is greater")`,
    bugLine: 3,
    description: 'Missing colon after if statement',
    hint: 'Conditional statements need colons',
    fix: 'if x > y:',
  },
  {
    code: `def calculate_sum(a, b):
    result = a + b
    return result
    
total = calculate_sum(5)
print(total)`,
    bugLine: 5,
    description: 'Missing second argument to function',
    hint: 'Function expects two arguments',
    fix: 'total = calculate_sum(5, 10)',
  },
  {
    code: `numbers = [1, 2, 3, 4, 5]
total = 0
for num in numbers:
    total = total + num
    
print("Sum is:" total)`,
    bugLine: 6,
    description: 'Missing comma in print statement',
    hint: 'Multiple arguments to print need commas',
    fix: 'print("Sum is:", total)',
  },
];

export default function CodeHunterGame() {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (gameStarted && !gameOver && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameOver(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameStarted, gameOver, timeLeft]);

  function startGame() {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(60);
    setCurrentChallenge(0);
    setShowHint(false);
    setSelectedLine(null);
    setMessage('');
  }

  function checkAnswer() {
    if (selectedLine === null) {
      setMessage('Please select a line number first!');
      return;
    }

    const challenge = bugChallenges[currentChallenge];
    if (selectedLine === challenge.bugLine) {
      setScore((prev) => prev + (showHint ? 5 : 10));
      setMessage('Correct! Bug found!');
      
      setTimeout(() => {
        if (currentChallenge < bugChallenges.length - 1) {
          setCurrentChallenge((prev) => prev + 1);
          setSelectedLine(null);
          setShowHint(false);
          setMessage('');
        } else {
          setGameOver(true);
        }
      }, 1500);
    } else {
      setMessage('Wrong line! Try again.');
      setScore((prev) => Math.max(0, prev - 2));
    }
  }

  const challenge = bugChallenges[currentChallenge];
  const codeLines = challenge.code.split('\n');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100">
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Link href="/games" className="text-blue-600 hover:underline mb-2 inline-block">
            ← Back to Games
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
                <Target className="h-10 w-10 text-blue-600" />
                Code Hunter
              </h1>
              <p className="mt-1 text-gray-600">Find and fix bugs in Python code</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {!gameStarted ? (
          <div className="rounded-2xl bg-white p-8 shadow-xl text-center">
            <Target className="h-20 w-20 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Code Hunter!</h2>
            <p className="text-gray-600 mb-6 text-lg">
              Find bugs in Python code as fast as you can. Each correct answer gives you 10 points.
              Using hints reduces points to 5. You have 60 seconds. Good luck!
            </p>
            <button
              onClick={startGame}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
            >
              Start Game
            </button>
          </div>
        ) : gameOver ? (
          <div className="rounded-2xl bg-white p-8 shadow-xl text-center">
            <Trophy className="h-20 w-20 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Game Over!</h2>
            <div className="text-6xl font-bold text-blue-600 mb-4">{score}</div>
            <p className="text-gray-600 mb-2">Final Score</p>
            <p className="text-gray-600 mb-6">
              You found {currentChallenge} out of {bugChallenges.length} bugs!
            </p>
            <button
              onClick={startGame}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Play Again
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Stats Bar */}
            <div className="flex gap-4 justify-between items-center bg-white rounded-lg p-4 shadow-lg">
              <div className="flex items-center gap-2">
                <Trophy className="h-6 w-6 text-yellow-500" />
                <span className="font-bold text-gray-900">Score: {score}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-6 w-6 text-blue-600" />
                <span className="font-bold text-gray-900">Time: {timeLeft}s</span>
              </div>
              <div className="text-sm text-gray-600">
                Challenge {currentChallenge + 1} of {bugChallenges.length}
              </div>
            </div>

            {/* Challenge */}
            <div className="rounded-2xl bg-white p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Find the Bug!</h3>
              <p className="text-gray-600 mb-4">Click on the line number where you think the bug is located.</p>

              {/* Code Display */}
              <div className="bg-gray-900 rounded-lg p-4 mb-4">
                {codeLines.map((line, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedLine(index + 1)}
                    className={`w-full text-left font-mono text-sm py-1 px-2 hover:bg-gray-800 rounded transition-colors ${
                      selectedLine === index + 1 ? 'bg-blue-600 text-white' : 'text-gray-300'
                    }`}
                  >
                    <span className="inline-block w-8 text-gray-500">{index + 1}</span>
                    {line}
                  </button>
                ))}
              </div>

              {message && (
                <div className={`mb-4 p-4 rounded-lg ${
                  message.includes('Correct') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                }`}>
                  {message}
                </div>
              )}

              {showHint && (
                <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800"><strong>Hint:</strong> {challenge.hint}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={checkAnswer}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Submit Answer
                </button>
                <button
                  onClick={() => setShowHint(true)}
                  disabled={showHint}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50"
                >
                  Show Hint (-5 pts)
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
