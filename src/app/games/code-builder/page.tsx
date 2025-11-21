'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Puzzle, Trophy, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';

interface CodeBlock {
  id: string;
  code: string;
  indent: number;
}

interface Challenge {
  title: string;
  description: string;
  blocks: CodeBlock[];
  correctOrder: string[];
  expectedOutput: string;
}

const challenges: Challenge[] = [
  {
    title: 'Print Hello World',
    description: 'Arrange the code blocks to print "Hello, World!"',
    blocks: [
      { id: 'b1', code: 'print("Hello, World!")', indent: 0 },
      { id: 'b2', code: '# This is wrong', indent: 0 },
    ],
    correctOrder: ['b1'],
    expectedOutput: 'Hello, World!',
  },
  {
    title: 'Calculate Sum',
    description: 'Create a function that adds two numbers',
    blocks: [
      { id: 'b1', code: 'def add_numbers(a, b):', indent: 0 },
      { id: 'b2', code: 'return a + b', indent: 1 },
      { id: 'b3', code: 'result = add_numbers(5, 3)', indent: 0 },
      { id: 'b4', code: 'print(result)', indent: 0 },
      { id: 'b5', code: 'return a - b', indent: 1 },
    ],
    correctOrder: ['b1', 'b2', 'b3', 'b4'],
    expectedOutput: '8',
  },
  {
    title: 'Loop Through List',
    description: 'Print each number in a list multiplied by 2',
    blocks: [
      { id: 'b1', code: 'numbers = [1, 2, 3]', indent: 0 },
      { id: 'b2', code: 'for num in numbers:', indent: 0 },
      { id: 'b3', code: 'print(num * 2)', indent: 1 },
      { id: 'b4', code: 'print(num)', indent: 1 },
      { id: 'b5', code: 'num = num * 2', indent: 1 },
    ],
    correctOrder: ['b1', 'b2', 'b3'],
    expectedOutput: '2\n4\n6',
  },
];

export default function CodeBuilderGame() {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedBlocks, setSelectedBlocks] = useState<string[]>([]);
  const [availableBlocks, setAvailableBlocks] = useState<CodeBlock[]>(
    [...challenges[0].blocks].sort(() => Math.random() - 0.5)
  );
  const [message, setMessage] = useState('');
  const [score, setScore] = useState(0);

  const challenge = challenges[currentChallenge];

  function resetChallenge() {
    setSelectedBlocks([]);
    setAvailableBlocks([...challenge.blocks].sort(() => Math.random() - 0.5));
    setMessage('');
  }

  function addBlock(blockId: string) {
    setSelectedBlocks([...selectedBlocks, blockId]);
    setAvailableBlocks(availableBlocks.filter(b => b.id !== blockId));
  }

  function removeBlock(blockId: string) {
    const block = challenge.blocks.find(b => b.id === blockId);
    if (block) {
      setSelectedBlocks(selectedBlocks.filter(id => id !== blockId));
      setAvailableBlocks([...availableBlocks, block]);
    }
  }

  function moveBlockUp(index: number) {
    if (index > 0) {
      const newBlocks = [...selectedBlocks];
      [newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]];
      setSelectedBlocks(newBlocks);
    }
  }

  function moveBlockDown(index: number) {
    if (index < selectedBlocks.length - 1) {
      const newBlocks = [...selectedBlocks];
      [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
      setSelectedBlocks(newBlocks);
    }
  }

  function checkSolution() {
    const isCorrect = 
      selectedBlocks.length === challenge.correctOrder.length &&
      selectedBlocks.every((id, index) => id === challenge.correctOrder[index]);

    if (isCorrect) {
      setMessage('✅ Correct! Well done!');
      setScore(score + 10);
      
      setTimeout(() => {
        if (currentChallenge < challenges.length - 1) {
          const nextChallenge = currentChallenge + 1;
          setCurrentChallenge(nextChallenge);
          setSelectedBlocks([]);
          setAvailableBlocks([...challenges[nextChallenge].blocks].sort(() => Math.random() - 0.5));
          setMessage('');
        } else {
          setMessage('🎉 You completed all challenges!');
        }
      }, 2000);
    } else {
      setMessage('❌ Not quite right. Try again!');
      setScore(Math.max(0, score - 2));
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100">
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Link href="/games" className="text-blue-600 hover:underline mb-2 inline-block">
            ← Back to Games
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
                <Puzzle className="h-10 w-10 text-orange-600" />
                Code Builder
              </h1>
              <p className="mt-1 text-gray-600">Build programs from code blocks</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Bar */}
        <div className="flex gap-4 justify-between items-center bg-white rounded-lg p-4 shadow-lg mb-6">
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-500" />
            <span className="font-bold text-gray-900">Score: {score}</span>
          </div>
          <div className="text-sm text-gray-600">
            Challenge {currentChallenge + 1} of {challenges.length}
          </div>
        </div>

        {/* Challenge Description */}
        <div className="rounded-2xl bg-white p-6 shadow-xl mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{challenge.title}</h2>
          <p className="text-gray-600 mb-4">{challenge.description}</p>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <p className="text-sm text-orange-800">
              <strong>Expected Output:</strong> <code className="font-mono">{challenge.expectedOutput}</code>
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Available Blocks */}
          <div className="rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Available Blocks</h3>
            <div className="space-y-2 min-h-48">
              {availableBlocks.length === 0 ? (
                <p className="text-gray-500 text-center py-8">All blocks used</p>
              ) : (
                availableBlocks.map((block) => (
                  <button
                    key={block.id}
                    onClick={() => addBlock(block.id)}
                    className="w-full text-left bg-gray-100 hover:bg-gray-200 rounded-lg p-3 font-mono text-sm transition-colors"
                    style={{ paddingLeft: `${block.indent * 2 + 1}rem` }}
                  >
                    {block.code}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Your Solution */}
          <div className="rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Your Solution</h3>
            <div className="space-y-2 min-h-48 mb-4">
              {selectedBlocks.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Drag blocks here</p>
              ) : (
                selectedBlocks.map((blockId, index) => {
                  const block = availableBlocks.find(b => b.id === blockId);
                  if (!block) return null;
                  
                  const uniqueKey = `selected-${blockId}-${index}-${block.code.substring(0, 10)}`;
                  return (
                    <div key={uniqueKey} className="flex items-center gap-2">
                      <div className="flex flex-col">
                        <button
                          onClick={() => moveBlockUp(index)}
                          disabled={index === 0}
                          className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
                        >
                          <ChevronUp className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => moveBlockDown(index)}
                          disabled={index === selectedBlocks.length - 1}
                          className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
                        >
                          <ChevronDown className="h-4 w-4" />
                        </button>
                      </div>
                      <div
                        className="flex-1 bg-blue-100 rounded-lg p-3 font-mono text-sm"
                        style={{ paddingLeft: `${block.indent * 2 + 1}rem` }}
                      >
                        {block.code}
                      </div>
                      <button
                        onClick={() => removeBlock(blockId)}
                        className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {message && (
              <div className={`mb-4 p-4 rounded-lg ${
                message.includes('✅') || message.includes('🎉')
                  ? 'bg-green-50 text-green-800'
                  : 'bg-red-50 text-red-800'
              }`}>
                {message}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={checkSolution}
                disabled={selectedBlocks.length === 0}
                className="flex-1 px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50"
              >
                Check Solution
              </button>
              <button
                onClick={resetChallenge}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
