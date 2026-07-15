import type { LearnerStep } from '@/core/curriculum/publicActivity';
import styles from './LearningStudio.module.css';

interface ContentBlocksProps {
  blocks: LearnerStep['content'];
}

export function ContentBlocks({ blocks }: ContentBlocksProps) {
  if (blocks.length === 0) return null;

  return (
    <div className={styles.contentBlocks}>
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;
        if (block.type === 'paragraph') return <p key={key}>{block.text}</p>;
        if (block.type === 'code') {
          return (
            <figure className={styles.codeFigure} key={key}>
              <figcaption>{block.caption}</figcaption>
              <pre>
                <code>{block.code}</code>
              </pre>
            </figure>
          );
        }
        if (block.type === 'evidence') {
          return (
            <dl className={styles.inlineEvidence} key={key}>
              <dt>{block.label}</dt>
              <dd>{block.value}</dd>
            </dl>
          );
        }
        return (
          <aside className={`${styles.callout} ${styles[`callout${block.tone}`]}`} key={key}>
            <strong>{block.title}</strong>
            <p>{block.text}</p>
          </aside>
        );
      })}
    </div>
  );
}
