'use client';

import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { basicSetup } from 'codemirror';
import { useEffect, useMemo, useRef } from 'react';
import type { LearningFile } from '@/core/learning/workspace';
import { codeEditorLanguage } from './codeEditorLanguage';
import styles from './LearningStudio.module.css';

interface LearningCodeEditorProps {
  file: LearningFile;
  value: string;
  onChange: (value: string) => void;
  describedBy: string;
}

const editorTheme = EditorView.theme({
  '&': {
    minHeight: 'var(--learning-editor-min-height)',
    color: '#e8f2e4',
    backgroundColor: '#111713',
    fontSize: '0.9rem',
  },
  '&.cm-focused': {
    outline: '3px solid #e4a700',
    outlineOffset: '-3px',
  },
  '.cm-content': {
    minHeight: 'var(--learning-editor-min-height)',
    padding: '1.1rem 0',
    caretColor: '#ffffff',
    fontFamily: 'var(--font-geist-mono), monospace',
    lineHeight: '1.65',
  },
  '.cm-gutters': {
    borderRight: '1px solid #354139',
    color: '#aab5aa',
    backgroundColor: '#111713',
  },
  '.cm-activeLine, .cm-activeLineGutter': {
    backgroundColor: '#1b231d',
  },
  '.cm-selectionBackground, &.cm-focused .cm-selectionBackground, ::selection': {
    backgroundColor: '#385847 !important',
  },
  '.cm-panels': {
    color: '#e8f2e4',
    backgroundColor: '#1b231d',
  },
  '.cm-panels button, .cm-panels input': {
    minHeight: '44px',
    font: 'inherit',
  },
});

export function LearningCodeEditor({
  file,
  value,
  onChange,
  describedBy,
}: LearningCodeEditorProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView>(null);
  const onChangeRef = useRef(onChange);
  const synchronizingRef = useRef(false);
  const initialValueRef = useRef(value);
  const language = useMemo(() => codeEditorLanguage(file), [file]);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const view = new EditorView({
      parent: host,
      state: EditorState.create({
        doc: initialValueRef.current,
        extensions: [
          basicSetup,
          language.extension,
          EditorState.tabSize.of(2),
          EditorView.lineWrapping,
          EditorView.contentAttributes.of({
            'aria-describedby': describedBy,
            'aria-label': `Edit ${language.name} source`,
            autocapitalize: 'off',
            autocomplete: 'off',
            autocorrect: 'off',
            spellcheck: 'false',
          }),
          EditorView.updateListener.of((update) => {
            if (update.docChanged && !synchronizingRef.current) {
              onChangeRef.current(update.state.doc.toString());
            }
          }),
          editorTheme,
        ],
      }),
    });
    viewRef.current = view;

    return () => {
      viewRef.current = null;
      view.destroy();
    };
  }, [describedBy, language]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view || view.state.doc.toString() === value) return;
    synchronizingRef.current = true;
    view.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: value },
    });
    synchronizingRef.current = false;
  }, [value]);

  return <div className={styles.codeEditor} ref={hostRef} />;
}
