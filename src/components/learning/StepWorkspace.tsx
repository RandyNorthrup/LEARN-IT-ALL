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
import { getInteractionPresentation } from './interactionPresentation';
import { JavaScriptRunPanel } from './JavaScriptRunPanel';
import styles from './LearningStudio.module.css';
import { NetworkRunPanel } from './NetworkRunPanel';
import { PromptHarnessPanel } from './PromptHarnessPanel';
import { PythonRunPanel } from './PythonRunPanel';
import { QualityGatePanel } from './QualityGatePanel';
import { SqlRunPanel } from './SqlRunPanel';
import { TypeScriptRunPanel } from './TypeScriptRunPanel';

export type StudioFiles = LearningFiles;

interface StepWorkspaceProps {
  step: LearnerStep;
  files: StudioFiles;
  selectedOptionId?: string;
  orderedOptionIds: string[];
  textResponse: string;
  onFilesChange: (files: StudioFiles) => void;
  onSelectOption: (optionId: string) => void;
  onOrderChange: (optionIds: string[]) => void;
  onTextChange: (response: string) => void;
}

export function StepWorkspace({
  step,
  files,
  selectedOptionId,
  orderedOptionIds,
  textResponse,
  onFilesChange,
  onSelectOption,
  onOrderChange,
  onTextChange,
}: StepWorkspaceProps) {
  const availableFiles = visibleLearningFiles(files, step.targetFile);
  const [activeFile, setActiveFile] = useState<LearningFile>(
    step.targetFile ?? availableFiles[0] ?? 'html'
  );
  const isCode = step.interaction === 'code' || Boolean(step.targetFile);
  const outputKind = workspaceOutputFor(activeFile, files);
  const presentation = getInteractionPresentation(step.interaction);
  const hasLearningMaterial = step.content.length > 0 || Boolean(step.stimulus);
  const [taskTitle, caseLabel] = step.title.split(' · ');

  function moveOption(optionId: string, direction: -1 | 1) {
    const currentIndex = orderedOptionIds.indexOf(optionId);
    const nextIndex = currentIndex + direction;
    if (currentIndex < 0 || nextIndex < 0 || nextIndex >= orderedOptionIds.length) return;
    const next = [...orderedOptionIds];
    [next[currentIndex], next[nextIndex]] = [next[nextIndex], next[currentIndex]];
    onOrderChange(next);
  }

  function moveFileFocus(currentFile: LearningFile, direction: -1 | 1) {
    const currentIndex = availableFiles.indexOf(currentFile);
    const nextIndex = (currentIndex + direction + availableFiles.length) % availableFiles.length;
    setActiveFile(availableFiles[nextIndex]);
    window.requestAnimationFrame(() => {
      document.getElementById(`file-tab-${availableFiles[nextIndex]}`)?.focus();
    });
  }

  return (
    <div
      className={`${styles.workspace} ${styles[`workspace${step.interaction}`]}`}
      data-layout={presentation.layout}
    >
      <div className={styles.taskIntro}>
        <span className={styles.interactionLabel}>
          <b aria-hidden="true">{presentation.symbol}</b>
          {presentation.label}
        </span>
        <h2 id="current-step-title">
          <span>{taskTitle}</span>
          {caseLabel && <small>{caseLabel}</small>}
        </h2>
        <p className={styles.instruction}>{step.instruction}</p>
        <p className={styles.modeGuidance}>{presentation.guidance}</p>
      </div>

      {!isCode && (
        <div
          className={`${styles.learningFlow} ${!hasLearningMaterial ? styles.learningFlowSolo : ''}`}
        >
          {hasLearningMaterial && (
            <section className={styles.materialPane} aria-label="Learning material">
              <ContentBlocks blocks={step.content} />
              {step.stimulus && <EvidenceStimulus stimulus={step.stimulus} />}
            </section>
          )}
          <div className={styles.responsePane}>
            {step.interaction === 'arrange' && step.options && (
              <section className={styles.arrangeBoard} aria-label="Items to arrange">
                <p>Move each event until the causal chain reads from top to bottom.</p>
                <ol>
                  {orderedOptionIds.map((optionId, index) => {
                    const option = step.options?.find((entry) => entry.id === optionId);
                    if (!option) return null;
                    return (
                      <li key={option.id}>
                        <span aria-hidden="true">⋮</span>
                        <span>
                          <small>{index + 1}</small>
                          {option.text}
                        </span>
                        <span className={styles.orderActions}>
                          <button
                            type="button"
                            onClick={() => moveOption(option.id, -1)}
                            disabled={index === 0}
                            aria-label={`Move ${option.text} up`}
                          >
                            <span aria-hidden="true">↑</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => moveOption(option.id, 1)}
                            disabled={index === orderedOptionIds.length - 1}
                            aria-label={`Move ${option.text} down`}
                          >
                            <span aria-hidden="true">↓</span>
                          </button>
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </section>
            )}

            {step.interaction !== 'arrange' &&
              step.interaction !== 'reflect' &&
              step.interaction !== 'calculate' &&
              step.options && (
                <fieldset className={styles.choiceGrid}>
                  <legend>Choose one answer</legend>
                  {step.options.map((option, index) => (
                    <label
                      key={option.id}
                      className={selectedOptionId === option.id ? styles.choiceActive : ''}
                    >
                      <input
                        type="radio"
                        name={`answer-${step.id}`}
                        value={option.id}
                        checked={selectedOptionId === option.id}
                        onChange={() => onSelectOption(option.id)}
                      />
                      <span className={styles.choiceLetter}>{String.fromCharCode(65 + index)}</span>
                      <span>{option.text}</span>
                    </label>
                  ))}
                </fieldset>
              )}

            {step.interaction === 'reflect' && (
              <label className={styles.reflectionField}>
                <span>Your evidence note</span>
                <textarea
                  value={textResponse}
                  onChange={(event) => onTextChange(event.currentTarget.value)}
                  placeholder="Explain the model in your own words…"
                  rows={8}
                />
                <small>{textResponse.trim().length} characters</small>
              </label>
            )}

            {step.interaction === 'calculate' && (
              <label className={`${styles.reflectionField} ${styles.calculationField}`}>
                <span>Your calculated quantity</span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={textResponse}
                  onChange={(event) => onTextChange(event.currentTarget.value)}
                  placeholder="Example: 12.5 meters"
                  autoComplete="off"
                />
                <small>Include the requested unit when one is named.</small>
              </label>
            )}
          </div>
        </div>
      )}

      {isCode && (
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
      )}
    </div>
  );
}
