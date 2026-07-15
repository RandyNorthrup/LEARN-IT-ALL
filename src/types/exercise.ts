export type ActivityType = 'practice' | 'workshop' | 'lab' | 'project';

export interface WebExerciseFiles {
  html: string;
  css: string;
}

export type WebRequirement =
  | {
      id: string;
      description: string;
      hint?: string;
      type: 'selector-exists';
      selector: string;
    }
  | {
      id: string;
      description: string;
      hint?: string;
      type: 'text-includes';
      selector: string;
      expected: string;
    }
  | {
      id: string;
      description: string;
      hint?: string;
      type: 'attribute-equals';
      selector: string;
      attribute: string;
      expected: string;
    }
  | {
      id: string;
      description: string;
      hint?: string;
      type: 'css-property';
      selector: string;
      property: string;
      expected: string;
    }
  | {
      id: string;
      description: string;
      hint?: string;
      type: 'source-includes';
      source: 'html' | 'css';
      expected: string;
    };

export interface WebExercise {
  id: string;
  lessonId: string;
  title: string;
  description: string;
  instructions?: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  points: number;
  language: 'html';
  exerciseType: ActivityType;
  starterFiles: WebExerciseFiles;
  requirements: WebRequirement[];
  hints: string[];
}

export interface RequirementResult {
  id: string;
  description: string;
  passed: boolean;
  hint?: string;
  actual?: string;
}
