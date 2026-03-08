'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Play, Loader2, RotateCcw, Terminal, CheckCircle2, XCircle } from 'lucide-react';
import Editor from '@monaco-editor/react';

// Pyodide type declarations
interface PyodideInterface {
  runPythonAsync: (code: string) => Promise<unknown>;
  loadPackagesFromImports: (code: string) => Promise<void>;
  setStdout: (options: { batched: (msg: string) => void }) => void;
  setStderr: (options: { batched: (msg: string) => void }) => void;
  globals: { get: (name: string) => unknown };
}

interface TestCase {
  id: string;
  description: string;
  testCode: string; // Python code that returns True/False
  hidden?: boolean;
}

interface TestResult {
  id: string;
  description: string;
  passed: boolean;
  error?: string;
}

interface PyodideSandboxProps {
  starterCode: string;
  testCases?: TestCase[];
  preloadModules?: string[];
  setupCode?: string; // hidden code run before student code
  language?: string;
  onResults?: (results: TestResult[], allPassed: boolean) => void;
  readOnly?: boolean;
  className?: string;
}

// Cache Pyodide across component instances
let pyodidePromise: Promise<PyodideInterface> | null = null;

async function loadPyodideRuntime(): Promise<PyodideInterface> {
  if (pyodidePromise) return pyodidePromise;

  pyodidePromise = (async () => {
    // Load Pyodide from CDN
    if (typeof window !== 'undefined' && !(window as unknown as Record<string, unknown>).loadPyodide) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.27.5/full/pyodide.js';
      script.async = true;
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Pyodide'));
        document.head.appendChild(script);
      });
    }

    const loadPyodide = (window as unknown as { loadPyodide: (config: { indexURL: string }) => Promise<PyodideInterface> }).loadPyodide;
    const pyodide = await loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.5/full/',
    });

    return pyodide;
  })();

  return pyodidePromise;
}

export default function PyodideSandbox({
  starterCode,
  testCases = [],
  preloadModules = [],
  setupCode = '',
  language = 'python',
  onResults,
  readOnly = false,
  className = '',
}: PyodideSandboxProps) {
  const [code, setCode] = useState(starterCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [pyodide, setPyodide] = useState<PyodideInterface | null>(null);
  const [error, setError] = useState<string | null>(null);
  const outputRef = useRef<HTMLPreElement>(null);

  // Load Pyodide on mount
  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    loadPyodideRuntime()
      .then(async (py) => {
        if (cancelled) return;
        // Preload requested modules
        if (preloadModules.length > 0) {
          const importCode = preloadModules.map((m) => `import ${m}`).join('\n');
          try {
            await py.loadPackagesFromImports(importCode);
          } catch {
            // Some modules are built-in and don't need loading
          }
        }
        setPyodide(py);
        setIsLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(`Failed to load Python runtime: ${err.message}`);
        setIsLoading(false);
      });
    return () => { cancelled = true; };
  }, [preloadModules]);

  const runCode = useCallback(async () => {
    if (!pyodide || isRunning) return;

    setIsRunning(true);
    setOutput('');
    setError(null);
    setTestResults([]);

    let capturedOutput = '';

    // Capture stdout/stderr
    pyodide.setStdout({
      batched: (msg: string) => {
        capturedOutput += msg + '\n';
      },
    });
    pyodide.setStderr({
      batched: (msg: string) => {
        capturedOutput += `[stderr] ${msg}\n`;
      },
    });

    try {
      // Run setup code first (hidden from student)
      if (setupCode) {
        await pyodide.runPythonAsync(setupCode);
      }

      // Run student code
      await pyodide.runPythonAsync(code);
      setOutput(capturedOutput);

      // Run test cases
      if (testCases.length > 0) {
        const results: TestResult[] = [];

        for (const tc of testCases) {
          try {
            const result = await pyodide.runPythonAsync(tc.testCode);
            results.push({
              id: tc.id,
              description: tc.description,
              passed: result === true || result === 1,
            });
          } catch (err) {
            results.push({
              id: tc.id,
              description: tc.description,
              passed: false,
              error: err instanceof Error ? err.message : String(err),
            });
          }
        }

        setTestResults(results);
        const allPassed = results.every((r) => r.passed);
        onResults?.(results, allPassed);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      setOutput(capturedOutput + `\n❌ Error:\n${errorMsg}`);
      setError(errorMsg);
    } finally {
      setIsRunning(false);
    }
  }, [pyodide, code, setupCode, testCases, isRunning, onResults]);

  const resetCode = useCallback(() => {
    setCode(starterCode);
    setOutput('');
    setTestResults([]);
    setError(null);
  }, [starterCode]);

  // Auto-scroll output
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const passedCount = testResults.filter((r) => r.passed).length;
  const totalTests = testResults.length;

  return (
    <div className={`rounded-xl border border-gray-300 bg-white shadow-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gray-800 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4" />
          <span className="font-bold text-sm">🐍 Python Sandbox</span>
          {isLoading && (
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Loader2 className="h-3 w-3 animate-spin" />
              Loading Python runtime...
            </span>
          )}
          {pyodide && !isLoading && (
            <span className="text-xs text-green-400">● Ready</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={resetCode}
            className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded transition-colors"
            title="Reset to starter code"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </button>
          <button
            onClick={runCode}
            disabled={!pyodide || isRunning}
            className="flex items-center gap-1 px-3 py-1 text-xs bg-green-600 hover:bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed rounded font-semibold transition-colors"
          >
            {isRunning ? (
              <>
                <Loader2 className="h-3 w-3 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play className="h-3 w-3" />
                Run (Ctrl+Enter)
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="border-b border-gray-200">
        <Editor
          height="250px"
          language={language}
          value={code}
          onChange={(value) => setCode(value || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            readOnly,
            wordWrap: 'on',
            tabSize: 4,
            insertSpaces: true,
            automaticLayout: true,
          }}
          onMount={(editor) => {
            // Ctrl+Enter to run
            editor.addAction({
              id: 'run-code',
              label: 'Run Code',
              keybindings: [2048 | 3], // Ctrl+Enter
              run: () => runCode(),
            });
          }}
        />
      </div>

      {/* Output Panel */}
      <div className="bg-gray-900">
        <div className="px-3 py-1.5 bg-gray-800 text-xs text-gray-400 font-semibold flex items-center justify-between">
          <span>Output</span>
          {totalTests > 0 && (
            <span className={passedCount === totalTests ? 'text-green-400' : 'text-yellow-400'}>
              Tests: {passedCount}/{totalTests} passed
            </span>
          )}
        </div>
        <pre
          ref={outputRef}
          className="px-3 py-2 text-xs font-mono text-green-400 min-h-[60px] max-h-[150px] overflow-y-auto whitespace-pre-wrap"
        >
          {output || (error ? '' : 'Click "Run" to execute your code...')}
          {error && <span className="text-red-400">{error}</span>}
        </pre>
      </div>

      {/* Test Results */}
      {testResults.length > 0 && (
        <div className="border-t border-gray-700 bg-gray-50 p-3 space-y-1.5">
          <p className="text-xs font-semibold text-gray-700">Test Results:</p>
          {testResults
            .filter((r) => !testCases.find((tc) => tc.id === r.id)?.hidden)
            .map((result) => (
              <div
                key={result.id}
                className={`flex items-start gap-2 text-xs p-2 rounded ${
                  result.passed ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                }`}
              >
                {result.passed ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="h-3.5 w-3.5 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <span className={result.passed ? 'text-green-800' : 'text-red-800'}>
                    {result.description}
                  </span>
                  {result.error && (
                    <p className="text-red-500 text-xs mt-0.5 font-mono">{result.error}</p>
                  )}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
