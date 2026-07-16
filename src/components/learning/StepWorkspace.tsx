'use client';

import type { ReactNode } from 'react';
import type { LearnerStep } from '@/core/curriculum/publicActivity';
import type { LearningFiles } from '@/core/learning/draft';
import { CodeWorkspace } from './CodeWorkspace';
import { ContentBlocks } from './ContentBlocks';
import { EvidenceStimulus } from './EvidenceStimulus';
import { getInteractionPresentation } from './interactionPresentation';
import styles from './LearningStudio.module.css';
import { StepIntro } from './StepIntro';

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
  initialIntro?: ReactNode;
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
  initialIntro,
}: StepWorkspaceProps) {
  const isCode = step.interaction === 'code' || Boolean(step.targetFile);
  const presentation = getInteractionPresentation(step.interaction);
  const hasLearningMaterial = step.content.length > 0 || Boolean(step.stimulus);

  function moveOption(optionId: string, direction: -1 | 1) {
    const currentIndex = orderedOptionIds.indexOf(optionId);
    const nextIndex = currentIndex + direction;
    if (currentIndex < 0 || nextIndex < 0 || nextIndex >= orderedOptionIds.length) return;
    const next = [...orderedOptionIds];
    [next[currentIndex], next[nextIndex]] = [next[nextIndex], next[currentIndex]];
    onOrderChange(next);
  }

  return (
    <div
      className={`${styles.workspace} ${styles[`workspace${step.interaction}`]}`}
      data-layout={presentation.layout}
    >
      {initialIntro ?? <StepIntro step={step} />}

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

      {isCode && <CodeWorkspace step={step} files={files} onFilesChange={onFilesChange} />}
    </div>
  );
}
