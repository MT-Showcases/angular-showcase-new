// GoF Pattern: Strategy — encapsulate interchangeable sorting algorithms behind a common contract.

import { PatternCard } from '../pattern-explorer.models';

export interface PatternSortStrategy {
  sort(patterns: PatternCard[]): PatternCard[];
}

export class AlphaSortStrategy implements PatternSortStrategy {
  sort(patterns: PatternCard[]): PatternCard[] {
    return [...patterns].sort((a, b) => a.title.localeCompare(b.title));
  }
}

export class LevelSortStrategy implements PatternSortStrategy {
  private readonly levelRank: Record<PatternCard['level'], number> = {
    beginner: 0,
    intermediate: 1,
    advanced: 2,
  };

  sort(patterns: PatternCard[]): PatternCard[] {
    return [...patterns].sort((a, b) => this.levelRank[a.level] - this.levelRank[b.level]);
  }
}

export class RecentSortStrategy implements PatternSortStrategy {
  sort(patterns: PatternCard[]): PatternCard[] {
    return [...patterns].reverse();
  }
}
