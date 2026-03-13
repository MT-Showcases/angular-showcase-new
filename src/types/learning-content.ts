export type DepthLevelId = 'intro' | 'guided' | 'applied' | 'mastery';

export interface DepthLevel {
  id: DepthLevelId;
  label: string;
  order: number;
  description: string;
  expectedOutcome: string;
}

export interface LearningExample {
  id: string;
  title: string;
  format: 'analogy' | 'snippet' | 'exercise' | 'case-study';
  prompt: string;
  solution?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface RelatedTopicRef {
  topicId: string;
  relation: 'prerequisite' | 'supports' | 'extends' | 'alternative';
  note?: string;
}

export interface LearningConcept {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  depthLevels: DepthLevelId[];
  relatedTopics: RelatedTopicRef[];
  examples: LearningExample[];
}

export interface LearningContent {
  version: string;
  generatedAt: string;
  depthLevels: DepthLevel[];
  concepts: LearningConcept[];
}
