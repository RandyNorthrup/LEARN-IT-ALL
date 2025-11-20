'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Zap, Trophy, Clock } from 'lucide-react';

const codeSnippets = [
  'print("Hello, World!")',
  'for i in range(10):',
  'def calculate_sum(a, b):',
  'return a + b',
  'if x > 0:',
  'numbers = [1, 2, 3, 4, 5]',
  'name = input("Enter name: ")',
  'result = sum(numbers)',
  'import random',
  'while True:',
];

export default function SyntaxSpeedGame() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [currentSnippet, setCurrentSnippet] = useState('');
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [correctCount, setCorrectCount] = useState(0);
  const [wpm, setWpm] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (gameStarted && !gameOver && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameOver(true);
            calculateWPM();
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
    setCorrectCount(0);
    setWpm(0);
    setUserInput('');
    setCurrentSnippet(codeSnippets[Math.floor(Math.random() * codeSnippets.length)]);
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  function calculateWPM() {
    const timeElapsed = (60 - timeLeft) / 60;
    if (timeElapsed > 0) {
      const words = correctCount * 5;
      setWpm(Math.round(words / timeElapsed));
    }
  }

  function handleInputChange(value: string) {
    setUserInput(value);

    if (value === currentSnippet) {
      const points = currentSnippet.length;
      setScore((prev) => prev + points);
      setCorrectCount((prev) => prev + 1);
      setUserInput('');
      setCurrentSnippet(codeSnippets[Math.floor(Math.random() * codeSnippets.length)]);
    }
  }

  function getCharacterClass(index: number): string {
    if (index >= userInput.length) return 'text-gray-400';
    if (userInput[index] === currentSnippet[index]) return 'text-green-600';
    return 'text-red-600';
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Link href="/games" className="text-blue-600 hover:underline mb-2 inline-block">
            ← Back to Games
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
                <Zap className="h-10 w-10 text-green-600" />
                Syntax Speed
              </h1>
              <p className="mt-1 text-gray-600">Type code as fast as you can with perfect accuracy</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {!gameStarted ? (
          <div className="rounded-2xl bg-white p-8 shadow-xl text-center">
            <Zap className="h-20 w-20 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Syntax Speed!</h2>
            <p className="text-gray-600 mb-6 text-lg">
              Type Python code snippets as accurately and quickly as possible.
              Each character typed correctly earns you points. You have 60 seconds!
            </p>
            <button
              onClick={startGame}
              className="px-8 py-4 bg-green-600 text-white rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors"
            >
              Start Game
            </button>
          </div>
        ) : gameOver ? (
          <div className="rounded-2xl bg-white p-8 shadow-xl text-center">
            <Trophy className="h-20 w-20 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Game Over!</h2>
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div>
                <div className="text-4xl font-bold text-green-600">{score}</div>
                <p className="text-gray-600">Points</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600">{correctCount}</div>
                <p className="text-gray-600">Snippets</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600">{wpm}</div>
                <p className="text-gray-600">WPM</p>
              </div>
            </div>
            <button
              onClick={startGame}
              className="px-8 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
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
                <Clock className="h-6 w-6 text-green-600" />
                <span className="font-bold text-gray-900">Time: {timeLeft}s</span>
              </div>
              <div className="text-sm text-gray-600">
                Completed: {correctCount}
              </div>
            </div>

            {/* Typing Challenge */}
            <div className="rounded-2xl bg-white p-8 shadow-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Type this code:</h3>
              
              {/* Display Code to Type */}
              <div className="bg-gray-900 rounded-lg p-6 mb-6 min-h-24 flex items-center justify-center">
                <div className="font-mono text-2xl tracking-wide">
                  {currentSnippet.split('').map((char, index) => (
                    <span key={index} className={getCharacterClass(index)}>
                      {char}
                    </span>
                  ))}
                </div>
              </div>

              {/* Input Field */}
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={(e) => handleInputChange(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-mono text-lg focus:border-green-500 focus:outline-none"
                placeholder="Start typing..."
                spellCheck={false}
                autoComplete="off"
              />

              <p className="mt-4 text-sm text-gray-600 text-center">
                Type exactly what you see above. Green = correct, Red = incorrect
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
