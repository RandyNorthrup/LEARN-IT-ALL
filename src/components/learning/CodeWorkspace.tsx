'use client';

import { useState } from 'react';
import type { LearnerStep } from '@/core/curriculum/publicActivity';
import type { LearningFiles } from '@/core/learning/draft';
import { buildSandboxedWebPreview } from '@/core/learning/webPreview';
import {
  type LearningFile,
  learningFileLabel,
  visibleLearningFiles,
  workspaceOutputFor,
} from '@/core/learning/workspace';
import { ContentBlocks } from './ContentBlocks';
import { CRunPanel } from './CRunPanel';
import { EvidenceStimulus } from './EvidenceStimulus';
import { GoRunPanel } from './GoRunPanel';
import { JavaScriptRunPanel } from './JavaScriptRunPanel';
import styles from './LearningStudio.module.css';
import { NetworkRunPanel } from './NetworkRunPanel';
import { PromptHarnessPanel } from './PromptHarnessPanel';
import { PythonRunPanel } from './PythonRunPanel';
import { QualityGatePanel } from './QualityGatePanel';
import { SqlRunPanel } from './SqlRunPanel';
import { TypeScriptRunPanel } from './TypeScriptRunPanel';

export interface CodeWorkspaceProps {
  step: LearnerStep;
  files: LearningFiles;
  onFilesChange: (files: LearningFiles) => void;
}

export function CodeWorkspace({ step, files, onFilesChange }: CodeWorkspaceProps) {
  const availableFiles = visibleLearningFiles(files, step.targetFile);
  const [activeFile, setActiveFile] = useState<LearningFile>(
    step.targetFile ?? availableFiles[0] ?? 'html'
  );
  const outputKind = workspaceOutputFor(activeFile, files);
  const hasLearningMaterial = step.content.length > 0 || Boolean(step.stimulus);

  function moveFileFocus(currentFile: LearningFile, direction: -1 | 1) {
    const currentIndex = availableFiles.indexOf(currentFile);
    const nextIndex = (currentIndex + direction + availableFiles.length) % availableFiles.length;
    setActiveFile(availableFiles[nextIndex]);
    window.requestAnimationFrame(() => {
      document.getElementById(`file-tab-${availableFiles[nextIndex]}`)?.focus();
    });
  }

  return (
    <>
      {hasLearningMaterial && (
        <section className={styles.codeBrief} aria-label="Repair brief">
          <ContentBlocks blocks={step.content} />
          {step.stimulus && <EvidenceStimulus stimulus={step.stimulus} />}
        </section>
      )}
      <div className={styles.codeWorkspace}>
        <section className={styles.editorPanel} aria-label="Code editor">
          <div className={styles.fileTabs} role="tablist" aria-label="Project files">
            {availableFiles.map((file) => (
              <button
                type="button"
                role="tab"
                aria-selected={activeFile === file}
                aria-controls="learning-code-panel"
                id={`file-tab-${file}`}
                tabIndex={activeFile === file ? 0 : -1}
                key={file}
                onClick={() => setActiveFile(file)}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowLeft') {
                    event.preventDefault();
                    moveFileFocus(file, -1);
                  } else if (event.key === 'ArrowRight') {
                    event.preventDefault();
                    moveFileFocus(file, 1);
                  }
                }}
              >
                {learningFileLabel(file)}
              </button>
            ))}
          </div>
          <label
            className={styles.editorLabel}
            id="learning-code-panel"
            role="tabpanel"
            aria-labelledby={`file-tab-${activeFile}`}
          >
            <span className="sr-only">Edit {activeFile.toUpperCase()} source</span>
            <textarea
              id="learning-code-editor"
              value={files[activeFile]}
              onChange={(event) =>
                onFilesChange({ ...files, [activeFile]: event.currentTarget.value })
              }
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
            />
          </label>
        </section>
        {outputKind === 'web' && (
          <section className={styles.previewPanel} aria-labelledby="preview-title">
            <div className={styles.previewBar}>
              <span id="preview-title">
                <b aria-hidden="true">&lt;/&gt;</b> Live output
              </span>
              <small>Sandboxed</small>
            </div>
            <iframe
              title="Learner project preview"
              sandbox="allow-scripts"
              srcDoc={buildSandboxedWebPreview(files)}
            />
          </section>
        )}
        {outputKind === 'python' && <PythonRunPanel code={files.python} />}
        {outputKind === 'go' && <GoRunPanel source={files.go} />}
        {outputKind === 'c' && <CRunPanel source={files.c} />}
        {outputKind === 'sql' && <SqlRunPanel source={files.sql} />}
        {outputKind === 'javascript' && <JavaScriptRunPanel code={files.javascript} />}
        {outputKind === 'typescript' && <TypeScriptRunPanel source={files.typescript} />}
        {outputKind === 'network' && <NetworkRunPanel source={files.shell} />}
        {outputKind === 'prompt' && <PromptHarnessPanel source={files.prompt} />}
        {outputKind === 'gates' && <QualityGatePanel source={files.config} />}
      </div>
    </>
  );
}
