export interface PublishedLearningTrack {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  technologies: string[];
  courses: string[];
}

// A track can publish only after every course in its reviewed prerequisite order publishes.
export const PUBLISHED_LEARNING_TRACKS = [] as const satisfies readonly PublishedLearningTrack[];
