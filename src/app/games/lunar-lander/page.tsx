'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Rocket, RotateCcw, Trophy, Fuel, Gauge } from 'lucide-react';

interface LanderState {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  angle: number;
  fuel: number;
  thrust: boolean;
  rotateLeft: boolean;
  rotateRight: boolean;
}

interface LandingPad {
  x: number;
  width: number;
  y: number;
}

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const GRAVITY = 0.05;
const THRUST_POWER = 0.15;
const ROTATION_SPEED = 2;
const FUEL_CONSUMPTION = 0.5;
const MAX_SAFE_VELOCITY = 2;
const MAX_SAFE_ANGLE = 15;

export default function LunarLanderGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rocketImg = useRef<HTMLImageElement | null>(null);
  const terrainImg = useRef<HTMLImageElement | null>(null);
  const landingPadImg = useRef<HTMLImageElement | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'won' | 'crashed'>('menu');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [level, setLevel] = useState(1);
  
  const [lander, setLander] = useState<LanderState>({
    x: CANVAS_WIDTH / 2,
    y: 50,
    velocityX: 0,
    velocityY: 0,
    angle: 0,
    fuel: 100,
    thrust: false,
    rotateLeft: false,
    rotateRight: false,
  });

  const [landingPads, setLandingPads] = useState<LandingPad[]>([
    { x: CANVAS_WIDTH / 2 - 50, width: 100, y: CANVAS_HEIGHT - 40 }
  ]);

  const [terrain, setTerrain] = useState<number[]>([]);
  const keysPressed = useRef<Set<string>>(new Set());

  // Initialize terrain
  useEffect(() => {
    generateTerrain(level);
  }, [level]);

  // Load high score
  useEffect(() => {
    const saved = localStorage.getItem('lunarLanderHighScore');
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
      let height;
      
      // Create flat landing pads
      const padStart = CANVAS_WIDTH / 2 - 50;
      const padEnd = CANVAS_WIDTH / 2 + 50;
      
      if (x >= padStart && x <= padEnd) {
        height = CANVAS_HEIGHT - 40;
      } else {
        // Random mountainous terrain
        const baseHeight = CANVAS_HEIGHT - 60 - Math.random() * 100 * (lvl * 0.5);
        const noise = Math.sin(i * 0.5) * 20 + Math.cos(i * 0.3) * 15;
        height = baseHeight + noise;
      }
      
      points.push(height);
    }
    
    setTerrain(points);
  }

  function resetGame() {
    setLander({
      x: CANVAS_WIDTH / 2 + (Math.random() - 0.5) * 200,
      y: 50,
      velocityX: (Math.random() - 0.5) * 2,
      velocityY: 0,
      angle: 0,
      fuel: 100,
      thrust: false,
      rotateLeft: false,
      rotateRight: false,
    });
    setGameState('playing');
  }

  function nextLevel() {
    const newLevel = level + 1;
    setLevel(newLevel);
    generateTerrain(newLevel);
    setLander({
      x: CANVAS_WIDTH / 2 + (Math.random() - 0.5) * 300,
      y: 50,
      velocityX: (Math.random() - 0.5) * 3,
      velocityY: 0,
      angle: 0,
      fuel: 100,
      thrust: false,
      rotateLeft: false,
      rotateRight: false,
    });
    setGameState('playing');
  }

  // Keyboard controls
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      keysPressed.current.add(e.key.toLowerCase());
      
      if (e.key === ' ' || e.key.toLowerCase() === 'w' || e.key === 'ArrowUp') {
        e.preventDefault();
      }
    }

    function handleKeyUp(e: KeyboardEvent) {
      keysPressed.current.delete(e.key.toLowerCase());
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameLoop = setInterval(() => {
      setLander((prevLander) => {
        let newLander = { ...prevLander };

        // Handle rotation
        if (keysPressed.current.has('arrowleft') || keysPressed.current.has('a')) {
          newLander.angle -= ROTATION_SPEED;
        }
        if (keysPressed.current.has('arrowright') || keysPressed.current.has('d')) {
          newLander.angle += ROTATION_SPEED;
        }

        // Handle thrust
        const thrustActive = keysPressed.current.has(' ') || 
                           keysPressed.current.has('arrowup') || 
                           keysPressed.current.has('w');

        if (thrustActive && newLander.fuel > 0) {
          const angleRad = (newLander.angle * Math.PI) / 180;
          newLander.velocityX += Math.sin(angleRad) * THRUST_POWER;
          newLander.velocityY -= Math.cos(angleRad) * THRUST_POWER;
          newLander.fuel = Math.max(0, newLander.fuel - FUEL_CONSUMPTION);
        }

        // Apply gravity
        newLander.velocityY += GRAVITY;

        // Update position
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
          // Check if landed on pad
          const pad = landingPads[0];
          const onPad = newLander.x >= pad.x && newLander.x <= pad.x + pad.width;
          
          const totalVelocity = Math.sqrt(
            newLander.velocityX ** 2 + newLander.velocityY ** 2
          );
          
          const angleOk = Math.abs(newLander.angle) <= MAX_SAFE_ANGLE;
          const velocityOk = totalVelocity <= MAX_SAFE_VELOCITY;

          if (onPad && angleOk && velocityOk) {
            // Successful landing!
            const bonusScore = Math.floor(
              (newLander.fuel * 10) + 
              ((MAX_SAFE_VELOCITY - totalVelocity) * 100) +
              ((MAX_SAFE_ANGLE - Math.abs(newLander.angle)) * 50) +
              (level * 500)
            );
            
            setScore((prev) => {
              const newScore = prev + bonusScore;
              if (newScore > highScore) {
                setHighScore(newScore);
                localStorage.setItem('lunarLanderHighScore', newScore.toString());
              }
              return newScore;
            });
            
            setGameState('won');
          } else {
            // Crashed!
            setGameState('crashed');
          }
        }

        return newLander;
      });
    }, 1000 / 60); // 60 FPS

    return () => clearInterval(gameLoop);
  }, [gameState, terrain, landingPads, highScore, level]);

  // Render game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imagesLoaded) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
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
      
      // Draw terrain texture tiled
      const pattern = ctx.createPattern(terrainImg.current, 'repeat');
      if (pattern) {
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      }
      ctx.restore();
    }

    // Draw landing pad with image
    const pad = landingPads[0];
    if (landingPadImg.current) {
      ctx.drawImage(landingPadImg.current, pad.x, pad.y - 20, pad.width, 20);
    }

    // Draw lander with rocket image
    ctx.save();
    ctx.translate(lander.x, lander.y);
    ctx.rotate((lander.angle * Math.PI) / 180);

    if (rocketImg.current) {
      const size = 40;
      ctx.drawImage(rocketImg.current, -size/2, -size/2, size, size);
    }

    // Thrust flame
    const thrustActive = keysPressed.current.has(' ') || 
                       keysPressed.current.has('arrowup') || 
                       keysPressed.current.has('w');
    
    if (thrustActive && lander.fuel > 0 && gameState === 'playing') {
      const flameLength = 15 + Math.random() * 5;
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.moveTo(-5, 5);
      ctx.lineTo(0, 5 + flameLength);
      ctx.lineTo(5, 5);
      ctx.closePath();
      ctx.fill();
      
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.moveTo(-3, 5);
      ctx.lineTo(0, 5 + flameLength * 0.6);
      ctx.lineTo(3, 5);
      ctx.closePath();
      ctx.fill();
    }

    ctx.restore();

    // Draw HUD
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px monospace';
    ctx.fillText(`Level: ${level}`, 20, 30);
    ctx.fillText(`Score: ${score}`, 20, 55);
    ctx.fillText(`High Score: ${highScore}`, 20, 80);
    
    // Fuel bar
    ctx.fillStyle = '#4b5563';
    ctx.fillRect(CANVAS_WIDTH - 170, 20, 150, 25);
    ctx.fillStyle = lander.fuel > 30 ? '#22c55e' : '#ef4444';
    ctx.fillRect(CANVAS_WIDTH - 168, 22, (lander.fuel / 100) * 146, 21);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`Fuel: ${Math.floor(lander.fuel)}%`, CANVAS_WIDTH - 165, 38);
    
    // Velocity indicator
    const totalVel = Math.sqrt(lander.velocityX ** 2 + lander.velocityY ** 2);
    const velColor = totalVel <= MAX_SAFE_VELOCITY ? '#22c55e' : '#ef4444';
    ctx.fillStyle = velColor;
    ctx.fillText(`Speed: ${totalVel.toFixed(2)}`, CANVAS_WIDTH - 170, 65);
    
    // Angle indicator
    const angleColor = Math.abs(lander.angle) <= MAX_SAFE_ANGLE ? '#22c55e' : '#ef4444';
    ctx.fillStyle = angleColor;
    ctx.fillText(`Angle: ${lander.angle.toFixed(1)}°`, CANVAS_WIDTH - 170, 90);

  }, [lander, terrain, landingPads, gameState, level, score, highScore, imagesLoaded]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-900/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Link href="/games" className="text-purple-400 hover:underline mb-2 inline-block">
            ← Back to Games
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white flex items-center gap-3">
                <Rocket className="h-10 w-10 text-orange-500" />
                Lunar Lander
              </h1>
              <p className="mt-1 text-gray-300">Master physics and precision landing</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Game Canvas Container */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              className="border-4 border-purple-500 rounded-lg shadow-2xl"
            />
            
            {/* Overlay Menus */}
            {gameState === 'menu' && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg">
                <div className="text-center text-white p-8">
                  <Rocket className="h-24 w-24 text-orange-500 mx-auto mb-6" />
                  <h2 className="text-4xl font-bold mb-4">Lunar Lander</h2>
                  <p className="text-xl mb-6 text-gray-300 max-w-md">
                    Land your spacecraft safely on the platform. Control thrust and rotation to achieve a soft landing.
                  </p>
                  <div className="bg-gray-800 rounded-lg p-6 mb-6 text-left max-w-md mx-auto">
                    <h3 className="font-bold text-lg mb-3 text-purple-400">Controls:</h3>
                    <div className="space-y-2 text-sm">
                      <p><kbd className="px-2 py-1 bg-gray-700 rounded">↑</kbd> or <kbd className="px-2 py-1 bg-gray-700 rounded">W</kbd> or <kbd className="px-2 py-1 bg-gray-700 rounded">Space</kbd> - Thrust</p>
                      <p><kbd className="px-2 py-1 bg-gray-700 rounded">←</kbd> or <kbd className="px-2 py-1 bg-gray-700 rounded">A</kbd> - Rotate Left</p>
                      <p><kbd className="px-2 py-1 bg-gray-700 rounded">→</kbd> or <kbd className="px-2 py-1 bg-gray-700 rounded">D</kbd> - Rotate Right</p>
                    </div>
                    <h3 className="font-bold text-lg mt-4 mb-2 text-purple-400">Landing Requirements:</h3>
                    <ul className="space-y-1 text-sm">
                      <li>✓ Speed ≤ {MAX_SAFE_VELOCITY} units</li>
                      <li>✓ Angle ≤ ±{MAX_SAFE_ANGLE}°</li>
                      <li>✓ Land on yellow platform</li>
                    </ul>
                  </div>
                  <button
                    onClick={resetGame}
                    className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold text-xl transition-colors"
                  >
                    Start Mission
                  </button>
                </div>
              </div>
            )}

            {gameState === 'won' && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg">
                <div className="text-center text-white p-8">
                  <Trophy className="h-24 w-24 text-yellow-400 mx-auto mb-6" />
                  <h2 className="text-4xl font-bold mb-4 text-green-400">Perfect Landing!</h2>
                  <div className="bg-gray-800 rounded-lg p-6 mb-6 text-left max-w-md mx-auto">
                    <p className="text-2xl mb-4">Mission Complete</p>
                    <div className="space-y-2">
                      <p>Level: <span className="text-purple-400 font-bold">{level}</span></p>
                      <p>Score: <span className="text-yellow-400 font-bold">{score}</span></p>
                      <p>High Score: <span className="text-orange-400 font-bold">{highScore}</span></p>
                      <p>Fuel Remaining: <span className="text-green-400 font-bold">{Math.floor(lander.fuel)}%</span></p>
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
                      onClick={() => setGameState('menu')}
                      className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-bold transition-colors"
                    >
                      Main Menu
                    </button>
                  </div>
                </div>
              </div>
            )}

            {gameState === 'crashed' && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg">
                <div className="text-center text-white p-8">
                  <div className="text-6xl mb-6">💥</div>
                  <h2 className="text-4xl font-bold mb-4 text-red-400">Mission Failed!</h2>
                  <div className="bg-gray-800 rounded-lg p-6 mb-6 max-w-md mx-auto">
                    <p className="text-xl mb-4">Your lander crashed</p>
                    <div className="space-y-2 text-sm text-gray-300">
                      <p>Remember to:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Control your speed</li>
                        <li>Keep your angle level</li>
                        <li>Land on the platform</li>
                        <li>Watch your fuel</li>
                      </ul>
                    </div>
                    <p className="mt-4 text-gray-400">Current Score: {score}</p>
                  </div>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={resetGame}
                      className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-bold transition-colors flex items-center gap-2"
                    >
                      <RotateCcw className="h-5 w-5" />
                      Try Again
                    </button>
                    <button
                      onClick={() => setGameState('menu')}
                      className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-bold transition-colors"
                    >
                      Main Menu
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Instructions & Tips */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Gauge className="h-6 w-6 text-blue-400" />
              Physics Concepts
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span><strong>Gravity:</strong> Constant downward acceleration pulls your lander</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span><strong>Thrust:</strong> Apply force in the direction your lander points</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span><strong>Velocity:</strong> Speed and direction of movement</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span><strong>Inertia:</strong> Your lander keeps moving unless forces act on it</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span><strong>Angular Control:</strong> Rotate to control thrust direction</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Fuel className="h-6 w-6 text-orange-400" />
              Pro Tips
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Start by slowing your descent early</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Use small thrust bursts to conserve fuel</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Level out your angle before landing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Watch your speed indicator - green is good!</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>More fuel remaining = higher bonus score</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Each level adds difficulty with terrain and velocity</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-6 bg-gradient-to-r from-purple-900 to-blue-900 rounded-lg p-6 border border-purple-500">
          <h3 className="text-2xl font-bold text-white mb-4">🚀 Real-World Connection</h3>
          <div className="text-gray-200 space-y-3">
            <p>
              Lunar Lander simulates the actual physics challenges faced by Apollo mission astronauts 
              when landing on the Moon. The game teaches fundamental physics principles including:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Newton's Laws:</strong> Every action has an equal and opposite reaction</li>
              <li><strong>Conservation of Momentum:</strong> Motion continues unless forces act on it</li>
              <li><strong>Vector Mathematics:</strong> Forces have both magnitude and direction</li>
              <li><strong>Resource Management:</strong> Limited fuel requires efficient navigation</li>
              <li><strong>Feedback Systems:</strong> Using instruments to control complex systems</li>
            </ul>
            <p className="text-sm text-gray-300 mt-4">
              💡 <strong>Programming Concept:</strong> This game demonstrates real-time physics simulation, 
              game loop architecture, collision detection, state management, and coordinate system transformations 
              - all essential skills for game development and simulation programming!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
