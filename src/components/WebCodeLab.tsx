'use client';

import Editor from '@monaco-editor/react';
import { CheckCircle2, FlaskConical, Play, RotateCcw, XCircle } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { RequirementResult, WebExercise, WebExerciseFiles } from '@/types/exercise';

interface WebCodeLabProps {
  courseId: string;
  lessonId: string;
  exercise: WebExercise;
}

interface SubmissionResult {
  success: boolean;
  score: number;
  passedTests: number;
  totalTests: number;
  results: RequirementResult[];
  message: string;
}

function createPreview(files: WebExerciseFiles): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>${files.css}</style>
  </head>
  <body>${files.html}</body>
</html>`;
}

export default function WebCodeLab({ courseId, lessonId, exercise }: WebCodeLabProps) {
  const storageKey = `learn-it-all:draft:${courseId}:${exercise.id}`;
  const [activeFile, setActiveFile] = useState<keyof WebExerciseFiles>('html');
  const [files, setFiles] = useState<WebExerciseFiles>(exercise.starterFiles);
  const [previewFiles, setPreviewFiles] = useState<WebExerciseFiles>(exercise.starterFiles);
  const [result, setResult] = useState<SubmissionResult | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (!saved) return;
    try {
      setFiles(JSON.parse(saved) as WebExerciseFiles);
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, [storageKey]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setPreviewFiles(files);
      window.localStorage.setItem(storageKey, JSON.stringify(files));
    }, 300);
    return () => window.clearTimeout(timeout);
  }, [files, storageKey]);

  const preview = useMemo(() => createPreview(previewFiles), [previewFiles]);

  async function runTests() {
    setSubmitting(true);
    setResult(null);
    try {
      const response = await fetch(`/api/courses/${courseId}/exercises/${lessonId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exerciseId: exercise.id, files }),
      });
      const data = (await response.json()) as SubmissionResult;
      setResult(data);
      if (data.success) window.localStorage.removeItem(storageKey);
    } catch {
      setResult({
        success: false,
        score: 0,
        passedTests: 0,
        totalTests: exercise.requirements.length,
        results: [],
        message: 'Tests could not run. Check connection and try again.',
      });
    } finally {
      setSubmitting(false);
    }
  }

  function resetFiles() {
    setFiles(exercise.starterFiles);
    setResult(null);
    window.localStorage.removeItem(storageKey);
  }

  return (
    <section className="web-lab" aria-labelledby="web-lab-title">
      <header className="web-lab__header">
        <div>
          <div className="activity-kicker">
            <FlaskConical aria-hidden="true" size={18} />
            {exercise.exerciseType}
          </div>
          <h2 id="web-lab-title">{exercise.title}</h2>
          <p>{exercise.description}</p>
        </div>
        <div className="web-lab__score">{exercise.points} XP</div>
      </header>

      {exercise.instructions && (
        <ol className="web-lab__instructions" aria-label="Activity instructions">
          {exercise.instructions.map((instruction) => (
            <li key={instruction}>{instruction}</li>
          ))}
        </ol>
      )}

      <div className="web-lab__workspace">
        <div className="web-lab__editor-panel">
          <div className="file-tabs" role="tablist" aria-label="Code files">
            {(['html', 'css'] as const).map((file) => (
              <button
                key={file}
                type="button"
                role="tab"
                aria-selected={activeFile === file}
                aria-controls="code-editor"
                onClick={() => setActiveFile(file)}
              >
                {file.toUpperCase()}
              </button>
            ))}
            <button className="file-tabs__reset" type="button" onClick={resetFiles}>
              <RotateCcw aria-hidden="true" size={16} /> Reset
            </button>
          </div>
          <div id="code-editor" role="tabpanel" aria-label={`${activeFile.toUpperCase()} editor`}>
            <Editor
              height="32rem"
              language={activeFile}
              theme="vs-dark"
              value={files[activeFile]}
              onChange={(value) =>
                setFiles((current) => ({ ...current, [activeFile]: value ?? '' }))
              }
              options={{
                minimap: { enabled: false },
                fontSize: 15,
                lineNumbersMinChars: 3,
                padding: { top: 16 },
                wordWrap: 'on',
                automaticLayout: true,
                tabSize: 2,
              }}
            />
          </div>
        </div>

        <div className="web-lab__preview-panel">
          <div className="preview-title">Live preview</div>
          <iframe
            title="Live website preview"
            sandbox=""
            srcDoc={preview}
            className="web-lab__preview"
          />
        </div>
      </div>

      <div className="web-lab__actions">
        <button type="button" className="run-tests-button" onClick={runTests} disabled={submitting}>
          <Play aria-hidden="true" size={19} />
          {submitting ? 'Running tests…' : 'Run tests'}
        </button>
        <span aria-live="polite">
          {result && `${result.passedTests} of ${result.totalTests} requirements passed`}
        </span>
      </div>

      {result && (
        <div className={`test-results ${result.success ? 'test-results--passed' : ''}`}>
          <h3>{result.message}</h3>
          <ul>
            {result.results.map((test) => (
              <li key={test.id}>
                {test.passed ? (
                  <CheckCircle2 aria-label="Passed" className="test-pass" />
                ) : (
                  <XCircle aria-label="Not passed" className="test-fail" />
                )}
                <span>
                  <strong>{test.description}</strong>
                  {!test.passed && test.hint && <small>Hint: {test.hint}</small>}
                  {!test.passed && test.actual && <small>Found: {test.actual}</small>}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
