import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of, take } from 'rxjs';
import { DepthLevelId, LearningConcept, LearningContent, RelatedTopicRef } from '@models/learning-content';

@Injectable({
  providedIn: 'root',
})
export class LearningContentFacade {
  private readonly http = inject(HttpClient);
  private readonly contentUrl = 'assets/content/learning-content.json';

  private readonly contentState = signal<LearningContent | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly content = computed(() => this.contentState());
  readonly depthLevels = computed(() => this.contentState()?.depthLevels ?? []);
  readonly concepts = computed(() => this.contentState()?.concepts ?? []);

  constructor() {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set(null);

    this.http
      .get<LearningContent>(this.contentUrl)
      .pipe(
        take(1),
        catchError((err: unknown) => {
          this.error.set('Unable to load learning content.');
          this.loading.set(false);
          return of<LearningContent | null>(null);
        })
      )
      .subscribe((content) => {
        if (content) {
          this.contentState.set(content);
        }
        this.loading.set(false);
      });
  }

  conceptById(conceptId: string): LearningConcept | undefined {
    return this.concepts().find((concept) => concept.id === conceptId);
  }

  conceptsByDepth(depthLevel: DepthLevelId): LearningConcept[] {
    return this.concepts().filter((concept) => concept.depthLevels.includes(depthLevel));
  }

  relatedTopicsFor(conceptId: string): RelatedTopicRef[] {
    return this.conceptById(conceptId)?.relatedTopics ?? [];
  }
}
