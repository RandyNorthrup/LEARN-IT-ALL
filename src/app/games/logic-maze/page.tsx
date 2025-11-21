'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Brain, Trophy, RotateCcw } from 'lucide-react';

const GRID_SIZE = 6;
const START_POS = { x: 0, y: 0 };
const END_POS = { x: 5, y: 5 };

interface Position {
  x: number;
  y: number;
}

const OBSTACLES = [
  { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 },
  { x: 3, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 },
  { x: 2, y: 2 }, { x: 4, y: 2 }, { x: 2, y: 3 },
  { x: 4, y: 3 }, { x: 1, y: 4 }, { x: 2, y: 4 },
  { x: 3, y: 5 }, { x: 4, y: 5 },
];

export default function LogicMazeGame() {
  const [playerPos, setPlayerPos] = useState<Position>(START_POS);
  const [codeInput, setCodeInput] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [gameWon, setGameWon] = useState(false);
  const [moves, setMoves] = useState(0);

  function resetGame() {
    setPlayerPos(START_POS);
    setCodeInput('');
    setOutput([]);
    setGameWon(false);
    setMoves(0);
  }

  function isObstacle(x: number, y: number): boolean {
    return OBSTACLES.some(obs => obs.x === x && obs.y === y);
  }

  function isValidMove(x: number, y: number): boolean {
    return x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE && !isObstacle(x, y);
  }

  function executeCode() {
    const lines = codeInput.trim().split('\n');
    const currentPos = { ...START_POS };
    const newOutput: string[] = [];
    let moveCount = 0;

    try {
      for (const line of lines) {
        const trimmed = line.trim().toLowerCase();
        
        if (trimmed.startsWith('move_right')) {
          const match = trimmed.match(/move_right\((\d+)\)/);
          const steps = match ? parseInt(match[1]) : 1;
          for (let i = 0; i < steps; i++) {
            if (isValidMove(currentPos.x + 1, currentPos.y)) {
              currentPos.x++;
              moveCount++;
            } else {
              newOutput.push(`❌ Hit obstacle at (${currentPos.x + 1}, ${currentPos.y})`);
              setOutput(newOutput);
              return;
            }
          }
          newOutput.push(`✅ Moved right ${steps} step(s) to (${currentPos.x}, ${currentPos.y})`);
        }
        else if (trimmed.startsWith('move_down')) {
          const match = trimmed.match(/move_down\((\d+)\)/);
          const steps = match ? parseInt(match[1]) : 1;
          for (let i = 0; i < steps; i++) {
            if (isValidMove(currentPos.x, currentPos.y + 1)) {
              currentPos.y++;
              moveCount++;
            } else {
              newOutput.push(`❌ Hit obstacle at (${currentPos.x}, ${currentPos.y + 1})`);
              setOutput(newOutput);
              return;
            }
          }
          newOutput.push(`✅ Moved down ${steps} step(s) to (${currentPos.x}, ${currentPos.y})`);
        }
        else if (trimmed.startsWith('move_left')) {
          const match = trimmed.match(/move_left\((\d+)\)/);
          const steps = match ? parseInt(match[1]) : 1;
          for (let i = 0; i < steps; i++) {
            if (isValidMove(currentPos.x - 1, currentPos.y)) {
              currentPos.x--;
              moveCount++;
            } else {
              newOutput.push(`❌ Hit obstacle at (${currentPos.x - 1}, ${currentPos.y})`);
              setOutput(newOutput);
              return;
            }
          }
          newOutput.push(`✅ Moved left ${steps} step(s) to (${currentPos.x}, ${currentPos.y})`);
        }
        else if (trimmed.startsWith('move_up')) {
          const match = trimmed.match(/move_up\((\d+)\)/);
          const steps = match ? parseInt(match[1]) : 1;
          for (let i = 0; i < steps; i++) {
            if (isValidMove(currentPos.x, currentPos.y - 1)) {
              currentPos.y--;
              moveCount++;
            } else {
              newOutput.push(`❌ Hit obstacle at (${currentPos.x}, ${currentPos.y - 1})`);
              setOutput(newOutput);
              return;
            }
          }
          newOutput.push(`✅ Moved up ${steps} step(s) to (${currentPos.x}, ${currentPos.y})`);
        }
        else if (trimmed.length > 0 && !trimmed.startsWith('#')) {
          newOutput.push(`⚠️ Unknown command: ${trimmed}`);
        }
      }

      setPlayerPos(currentPos);
      setMoves(moveCount);

      if (currentPos.x === END_POS.x && currentPos.y === END_POS.y) {
        newOutput.push('');
        newOutput.push('🎉 You reached the goal!');
        setGameWon(true);
      } else {
        newOutput.push('');
        newOutput.push(`📍 Current position: (${currentPos.x}, ${currentPos.y})`);
        newOutput.push(`🎯 Goal position: (${END_POS.x}, ${END_POS.y})`);
      }

      setOutput(newOutput);
    } catch (error) {
      setOutput([`❌ Error: ${error}`]);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Link href="/games" className="text-blue-600 hover:underline mb-2 inline-block">
            ← Back to Games
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
                <Brain className="h-10 w-10 text-purple-600" />
                Logic Maze
              </h1>
              <p className="mt-1 text-gray-600">Navigate the maze using Python commands</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Maze Display */}
          <div className="rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Maze</h3>
            <div className="grid grid-cols-6 gap-2 mb-4">
              {Array.from({ length: GRID_SIZE }, (_, rowIndex) =>
                Array.from({ length: GRID_SIZE }, (__, colIndex) => {
                  const isPlayer = playerPos.x === colIndex && playerPos.y === rowIndex;
                  const isStart = START_POS.x === colIndex && START_POS.y === rowIndex;
                  const isEnd = END_POS.x === colIndex && END_POS.y === rowIndex;
                  const isObst = isObstacle(colIndex, rowIndex);

                  let bgColor = 'bg-gray-100';
                  let content = '';
                  
                  if (isPlayer) {
                    bgColor = 'bg-blue-500 text-white';
                    content = '🤖';
                  } else if (isEnd) {
                    bgColor = 'bg-green-500 text-white';
                    content = '🎯';
                  } else if (isStart) {
                    bgColor = 'bg-purple-200';
                    content = 'S';
                  } else if (isObst) {
                    bgColor = 'bg-gray-800';
                  }

                  return (
                    <div
                      key={`${colIndex}-${rowIndex}`}
                      className={`aspect-square rounded-lg flex items-center justify-center text-2xl font-bold transition-all ${bgColor}`}
                    >
                      {content}
                    </div>
                  );
                })
              )}
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-purple-200 rounded" />
                <span className="text-gray-600">Start (0, 0)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-500 rounded" />
                <span className="text-gray-600">Goal (5, 5)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-500 rounded" />
                <span className="text-gray-600">Player</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-800 rounded" />
                <span className="text-gray-600">Obstacle</span>
              </div>
            </div>

            {gameWon && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
                <p className="font-bold text-green-800">You Won!</p>
                <p className="text-green-700 text-sm">Completed in {moves} moves</p>
              </div>
            )}
          </div>

          {/* Code Editor */}
          <div className="rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Your Code</h3>
            
            <div className="mb-4 p-4 bg-purple-50 border border-purple-200 rounded-lg text-sm">
              <p className="font-semibold text-purple-900 mb-2">Available Commands:</p>
              <ul className="space-y-1 text-purple-800 font-mono">
                <li>move_right(steps)</li>
                <li>move_down(steps)</li>
                <li>move_left(steps)</li>
                <li>move_up(steps)</li>
                <li># comments</li>
              </ul>
            </div>

            <textarea
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              className="w-full h-48 px-4 py-3 border-2 border-gray-300 rounded-lg font-mono text-sm focus:border-purple-500 focus:outline-none mb-4"
              placeholder="# Example:&#10;move_right(3)&#10;move_down(2)&#10;move_left(1)"
              spellCheck={false}
            />

            <div className="flex gap-3 mb-4">
              <button
                onClick={executeCode}
                className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Run Code
              </button>
              <button
                onClick={resetGame}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </button>
            </div>

            {/* Output */}
            {output.length > 0 && (
              <div className="bg-gray-900 rounded-lg p-4 max-h-48 overflow-y-auto">
                {output.map((line) => (
                  <div key={line} className="font-mono text-sm text-gray-300">
                    {line}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
