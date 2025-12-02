'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Rocket, Play, RotateCcw, Trophy, Code, AlertCircle } from 'lucide-react';

interface Command {
  type: 'thrust' | 'rotate' | 'wait';
  value: number;
  duration: number;
}

interface LanderState {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  angle: number;
  fuel: number;
}

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const GRAVITY = 0.05;
const THRUST_POWER = 0.15;
const ROTATION_SPEED = 2;
const FUEL_CONSUMPTION = 0.5;
const MAX_SAFE_VELOCITY = 2;
const MAX_SAFE_ANGLE = 15;

export default function CodeLanderGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rocketImg = useRef<HTMLImageElement | null>(null);
  const terrainImg = useRef<HTMLImageElement | null>(null);
  const landingPadImg = useRef<HTMLImageElement | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [gameState, setGameState] = useState<'menu' | 'editing' | 'running' | 'won' | 'crashed'>('menu');
  const [code, setCode] = useState(`// Program your landing sequence
thrust(50, 2000);  // Thrust at 50% for 2 seconds
wait(500);         // Wait 0.5 seconds
rotate(-10);       // Rotate -10 degrees
thrust(100, 1000); // Full thrust for 1 second
wait(1000);        // Wait 1 second
thrust(30, 3000);  // Light thrust for 3 seconds`);
  
  const [commands, setCommands] = useState<Command[]>([]);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [commandTimer, setCommandTimer] = useState(0);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [errors, setErrors] = useState<string[]>([]);
  
  const [lander, setLander] = useState<LanderState>({
    x: CANVAS_WIDTH / 2,
    y: 50,
    velocityX: 0,
    velocityY: 0,
    angle: 0,
    fuel: 100,
  });

  const [landingPad] = useState({
    x: CANVAS_WIDTH / 2 - 50,
    width: 100,
    y: CANVAS_HEIGHT - 40
  });

  const [terrain, setTerrain] = useState<number[]>([]);

  // Initialize terrain
  useEffect(() => {
    generateTerrain(level);
  }, [level]);

  // Load high score
  useEffect(() => {
    const saved = localStorage.getItem('codeLanderHighScore');
    if (saved) setHighScore(parseInt(saved, 10));
  }, []);

  // Load images
  useEffect(() => {
    const rocket = new Image();
    const terrain = new Image();
    const pad = new Image();
    
    let loadedCount = 0;
    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === 3) {
        setImagesLoaded(true);
      }
    };
    
    rocket.onload = checkAllLoaded;
    terrain.onload = checkAllLoaded;
    pad.onload = checkAllLoaded;
    
    rocket.src = '/rocket.png';
    terrain.src = '/terrain.png';
    pad.src = '/landingpad.png';
    
    rocketImg.current = rocket;
    terrainImg.current = terrain;
    landingPadImg.current = pad;
  }, []);

  function generateTerrain(lvl: number) {
    const points: number[] = [];
    const segments = 20 + lvl * 5;
    
    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * CANVAS_WIDTH;
      const padStart = CANVAS_WIDTH / 2 - 50;
      const padEnd = CANVAS_WIDTH / 2 + 50;
      
      if (x >= padStart && x <= padEnd) {
        points.push(CANVAS_HEIGHT - 40);
      } else {
        const baseHeight = CANVAS_HEIGHT - 60 - Math.random() * 100 * (lvl * 0.5);
        const noise = Math.sin(i * 0.5) * 20 + Math.cos(i * 0.3) * 15;
        points.push(baseHeight + noise);
      }
    }
    
    setTerrain(points);
  }

  function parseCode(codeText: string): { commands: Command[], errors: string[] } {
    const lines = codeText.split('\n');
    const parsedCommands: Command[] = [];
    const parseErrors: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Skip empty lines and comments
      if (!line || line.startsWith('//')) continue;

      try {
        // Parse thrust(power, duration)
        const thrustMatch = line.match(/thrust\s*\(\s*(\d+)\s*,\s*(\d+)\s*\)/);
        if (thrustMatch) {
          const power = parseInt(thrustMatch[1]);
          const duration = parseInt(thrustMatch[2]);
          
          if (power < 0 || power > 100) {
            parseErrors.push(`Line ${i + 1}: Thrust power must be 0-100`);
          } else {
            parsedCommands.push({ type: 'thrust', value: power, duration });
          }
          continue;
        }

        // Parse rotate(angle)
        const rotateMatch = line.match(/rotate\s*\(\s*(-?\d+)\s*\)/);
        if (rotateMatch) {
          const angle = parseInt(rotateMatch[1]);
          parsedCommands.push({ type: 'rotate', value: angle, duration: 100 });
          continue;
        }

        // Parse wait(duration)
        const waitMatch = line.match(/wait\s*\(\s*(\d+)\s*\)/);
        if (waitMatch) {
          const duration = parseInt(waitMatch[1]);
          parsedCommands.push({ type: 'wait', value: 0, duration });
          continue;
        }

        // If we get here, it's an invalid command
        if (line.endsWith(';')) {
          parseErrors.push(`Line ${i + 1}: Invalid command syntax`);
        }
      } catch (e) {
        parseErrors.push(`Line ${i + 1}: Parse error`);
      }
    }

    return { commands: parsedCommands, errors: parseErrors };
  }

  function startProgram() {
    const { commands: parsedCommands, errors: parseErrors } = parseCode(code);
    
    if (parseErrors.length > 0) {
      setErrors(parseErrors);
      return;
    }

    if (parsedCommands.length === 0) {
      setErrors(['No valid commands found']);
      return;
    }

    setCommands(parsedCommands);
    setCurrentCommandIndex(0);
    setCommandTimer(0);
    setErrors([]);
    setLander({
      x: CANVAS_WIDTH / 2 + (Math.random() - 0.5) * 200,
      y: 50,
      velocityX: (Math.random() - 0.5) * 2,
      velocityY: 0,
      angle: 0,
      fuel: 100,
    });
    setGameState('running');
  }

  function resetGame() {
    setGameState('editing');
    setCurrentCommandIndex(0);
    setCommandTimer(0);
    setErrors([]);
  }

  function nextLevel() {
    const newLevel = level + 1;
    setLevel(newLevel);
    generateTerrain(newLevel);
    setGameState('editing');
    setCurrentCommandIndex(0);
    setCommandTimer(0);
  }

  // Game execution loop
  useEffect(() => {
    if (gameState !== 'running') return;

    const gameLoop = setInterval(() => {
      setLander((prevLander) => {
        let newLander = { ...prevLander };

        // Execute current command
        if (currentCommandIndex < commands.length) {
          const command = commands[currentCommandIndex];
          
          if (commandTimer < command.duration) {
            // Execute command
            if (command.type === 'thrust' && newLander.fuel > 0) {
              const thrustPercent = command.value / 100;
              const angleRad = (newLander.angle * Math.PI) / 180;
              newLander.velocityX += Math.sin(angleRad) * THRUST_POWER * thrustPercent;
              newLander.velocityY -= Math.cos(angleRad) * THRUST_POWER * thrustPercent;
              newLander.fuel = Math.max(0, newLander.fuel - FUEL_CONSUMPTION * thrustPercent);
            } else if (command.type === 'rotate') {
              newLander.angle += command.value / (command.duration / 16.67); // Smooth rotation
            }
            
            setCommandTimer(prev => prev + 16.67);
          } else {
            // Move to next command
            setCurrentCommandIndex(prev => prev + 1);
            setCommandTimer(0);
          }
        }

        // Apply physics
        newLander.velocityY += GRAVITY;
        newLander.x += newLander.velocityX;
        newLander.y += newLander.velocityY;

        // Check boundaries
        if (newLander.x < 0 || newLander.x > CANVAS_WIDTH) {
          setGameState('crashed');
          return newLander;
        }

        // Check collision with terrain
        const terrainIndex = Math.floor((newLander.x / CANVAS_WIDTH) * (terrain.length - 1));
        const terrainHeight = terrain[terrainIndex] || CANVAS_HEIGHT - 40;

        if (newLander.y + 15 >= terrainHeight) {
          const onPad = newLander.x >= landingPad.x && newLander.x <= landingPad.x + landingPad.width;
          const totalVelocity = Math.sqrt(newLander.velocityX ** 2 + newLander.velocityY ** 2);
          const angleOk = Math.abs(newLander.angle) <= MAX_SAFE_ANGLE;
          const velocityOk = totalVelocity <= MAX_SAFE_VELOCITY;

          if (onPad && angleOk && velocityOk) {
            const bonusScore = Math.floor(
              (newLander.fuel * 10) + 
              ((MAX_SAFE_VELOCITY - totalVelocity) * 100) +
              ((MAX_SAFE_ANGLE - Math.abs(newLander.angle)) * 50) +
              (level * 500) +
              (commands.length < 10 ? 500 : 0) // Bonus for efficient code
            );
            
            setScore((prev) => {
              const newScore = prev + bonusScore;
              if (newScore > highScore) {
                setHighScore(newScore);
                localStorage.setItem('codeLanderHighScore', newScore.toString());
              }
              return newScore;
            });
            
            setGameState('won');
          } else {
            setGameState('crashed');
          }
        }

        return newLander;
      });
    }, 1000 / 60);

    return () => clearInterval(gameLoop);
  }, [gameState, commands, currentCommandIndex, commandTimer, terrain, landingPad, highScore, level]);

  // Render game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imagesLoaded) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#000814';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw stars
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 100; i++) {
      const x = (i * 73) % CANVAS_WIDTH;
      const y = (i * 97) % (CANVAS_HEIGHT - 200);
      ctx.fillRect(x, y, 2, 2);
    }

    // Draw terrain with texture
    if (terrainImg.current) {
      ctx.beginPath();
      ctx.moveTo(0, CANVAS_HEIGHT);
      terrain.forEach((height, i) => {
        const x = (i / (terrain.length - 1)) * CANVAS_WIDTH;
        ctx.lineTo(x, height);
      });
      ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.closePath();
      ctx.save();
      ctx.clip();
      
      const pattern = ctx.createPattern(terrainImg.current, 'repeat');
      if (pattern) {
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      }
      ctx.restore();
    }

    // Draw landing pad with image
    if (landingPadImg.current) {
      ctx.drawImage(landingPadImg.current, landingPad.x, landingPad.y - 20, landingPad.width, 20);
    }

    // Draw lander with rocket image
    ctx.save();
    ctx.translate(lander.x, lander.y);
    ctx.rotate((lander.angle * Math.PI) / 180);

    if (rocketImg.current) {
      const size = 40;
      ctx.drawImage(rocketImg.current, -size/2, -size/2, size, size);
    }

    // Show thrust when executing thrust command
    if (gameState === 'running' && currentCommandIndex < commands.length) {
      const currentCommand = commands[currentCommandIndex];
      if (currentCommand.type === 'thrust' && lander.fuel > 0 && commandTimer < currentCommand.duration) {
        const flameLength = 15 + Math.random() * 5;
        ctx.fillStyle = '#f97316';
        ctx.beginPath();
        ctx.moveTo(-5, 5);
        ctx.lineTo(0, 5 + flameLength);
        ctx.lineTo(5, 5);
        ctx.closePath();
        ctx.fill();
      }
    }

    ctx.restore();

    // Draw HUD
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px monospace';
    ctx.fillText(`Level: ${level}`, 20, 30);
    ctx.fillText(`Score: ${score}`, 20, 55);
    
    // Fuel bar
    ctx.fillStyle = '#4b5563';
    ctx.fillRect(CANVAS_WIDTH - 170, 20, 150, 25);
    ctx.fillStyle = lander.fuel > 30 ? '#22c55e' : '#ef4444';
    ctx.fillRect(CANVAS_WIDTH - 168, 22, (lander.fuel / 100) * 146, 21);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`Fuel: ${Math.floor(lander.fuel)}%`, CANVAS_WIDTH - 165, 38);
    
    const totalVel = Math.sqrt(lander.velocityX ** 2 + lander.velocityY ** 2);
    const velColor = totalVel <= MAX_SAFE_VELOCITY ? '#22c55e' : '#ef4444';
    ctx.fillStyle = velColor;
    ctx.fillText(`Speed: ${totalVel.toFixed(2)}`, CANVAS_WIDTH - 170, 65);
    
    const angleColor = Math.abs(lander.angle) <= MAX_SAFE_ANGLE ? '#22c55e' : '#ef4444';
    ctx.fillStyle = angleColor;
    ctx.fillText(`Angle: ${lander.angle.toFixed(1)}°`, CANVAS_WIDTH - 170, 90);

    // Show current command
    if (gameState === 'running' && currentCommandIndex < commands.length) {
      const cmd = commands[currentCommandIndex];
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 14px monospace';
      let cmdText = '';
      if (cmd.type === 'thrust') cmdText = `thrust(${cmd.value}, ${cmd.duration})`;
      else if (cmd.type === 'rotate') cmdText = `rotate(${cmd.value})`;
      else cmdText = `wait(${cmd.duration})`;
      ctx.fillText(`Executing: ${cmdText}`, 20, CANVAS_HEIGHT - 20);
      ctx.fillText(`Command ${currentCommandIndex + 1}/${commands.length}`, 20, CANVAS_HEIGHT - 40);
    }

  }, [lander, terrain, landingPad, gameState, level, score, commands, currentCommandIndex, commandTimer, imagesLoaded]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <header className="border-b border-gray-700 bg-gray-900/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Link href="/games" className="text-blue-400 hover:underline mb-2 inline-block">
            ← Back to Games
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white flex items-center gap-3">
                <Code className="h-10 w-10 text-blue-500" />
                Code Lander
              </h1>
              <p className="mt-1 text-gray-300">Program your landing sequence</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Code Editor */}
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Code className="h-5 w-5 text-blue-400" />
                Landing Program
              </h2>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={gameState === 'running'}
                className="w-full h-96 bg-gray-900 text-green-400 font-mono text-sm p-4 rounded border border-gray-600 focus:border-blue-500 focus:outline-none disabled:opacity-50"
                spellCheck={false}
              />
              
              {errors.length > 0 && (
                <div className="mt-3 bg-red-900/20 border border-red-500 rounded p-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      {errors.map((err, i) => (
                        <div key={i} className="text-red-300">{err}</div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-4 flex gap-3">
                <button
                  onClick={startProgram}
                  disabled={gameState === 'running'}
                  className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <Play className="h-5 w-5" />
                  Launch Program
                </button>
                <button
                  onClick={resetGame}
                  className="px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-bold transition-colors"
                >
                  <RotateCcw className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Command Reference */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-3">Available Commands</h3>
              <div className="space-y-3 text-sm font-mono">
                <div className="bg-gray-900 p-3 rounded">
                  <code className="text-blue-400">thrust(power, duration)</code>
                  <p className="text-gray-400 mt-1 text-xs">Apply thrust. Power: 0-100%, Duration: milliseconds</p>
                  <p className="text-green-400 text-xs mt-1">Example: thrust(50, 2000);</p>
                </div>
                <div className="bg-gray-900 p-3 rounded">
                  <code className="text-blue-400">rotate(angle)</code>
                  <p className="text-gray-400 mt-1 text-xs">Rotate lander. Angle: degrees (negative = left, positive = right)</p>
                  <p className="text-green-400 text-xs mt-1">Example: rotate(-15);</p>
                </div>
                <div className="bg-gray-900 p-3 rounded">
                  <code className="text-blue-400">wait(duration)</code>
                  <p className="text-gray-400 mt-1 text-xs">Wait without action. Duration: milliseconds</p>
                  <p className="text-green-400 text-xs mt-1">Example: wait(1000);</p>
                </div>
              </div>
            </div>
          </div>

          {/* Game Canvas */}
          <div className="space-y-4">
            <div className="relative">
              <canvas
                ref={canvasRef}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                className="border-4 border-blue-500 rounded-lg shadow-2xl w-full"
              />
              
              {gameState === 'menu' && (
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg">
                  <div className="text-center text-white p-8">
                    <Rocket className="h-24 w-24 text-blue-500 mx-auto mb-6" />
                    <h2 className="text-4xl font-bold mb-4">Code Lander</h2>
                    <p className="text-xl mb-6 text-gray-300 max-w-md">
                      Write a program to land your spacecraft. Use commands to control thrust, rotation, and timing.
                    </p>
                    <button
                      onClick={() => setGameState('editing')}
                      className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xl transition-colors"
                    >
                      Start Coding
                    </button>
                  </div>
                </div>
              )}

              {gameState === 'won' && (
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg">
                  <div className="text-center text-white p-8">
                    <Trophy className="h-24 w-24 text-yellow-400 mx-auto mb-6" />
                    <h2 className="text-4xl font-bold mb-4 text-green-400">Success!</h2>
                    <div className="bg-gray-800 rounded-lg p-6 mb-6">
                      <p className="text-2xl mb-4">Landing Successful</p>
                      <div className="space-y-2 text-left">
                        <p>Commands Used: <span className="text-blue-400 font-bold">{commands.length}</span></p>
                        <p>Score: <span className="text-yellow-400 font-bold">{score}</span></p>
                        <p>High Score: <span className="text-orange-400 font-bold">{highScore}</span></p>
                      </div>
                    </div>
                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={nextLevel}
                        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold transition-colors"
                      >
                        Next Level
                      </button>
                      <button
                        onClick={resetGame}
                        className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-bold transition-colors"
                      >
                        Edit Code
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {gameState === 'crashed' && (
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg">
                  <div className="text-center text-white p-8">
                    <div className="text-6xl mb-6">💥</div>
                    <h2 className="text-4xl font-bold mb-4 text-red-400">Crash!</h2>
                    <p className="text-xl mb-6">Your program needs adjustment</p>
                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={resetGame}
                        className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-bold transition-colors"
                      >
                        Edit Code
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Tips */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-3">Landing Tips</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Start with moderate thrust to slow initial fall</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Use wait() between commands to let physics settle</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Rotate to level before final approach</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Lower thrust (20-40%) for final touchdown</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Fewer commands = bonus points!</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
