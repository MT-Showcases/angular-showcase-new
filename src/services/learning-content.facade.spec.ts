import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { LearningContentFacade } from './learning-content.facade';
import { LearningContent } from '@models/learning-content';

describe('LearningContentFacade', () => {
  let facade: LearningContentFacade;
  let httpMock: HttpTestingController;

  const mockContent: LearningContent = {
    version: '1.0.0',
    generatedAt: '2026-03-12T08:00:00.000Z',
    depthLevels: [
      {
        id: 'intro',
        label: 'Intro',
        order: 1,
        description: 'Foundations',
        expectedOutcome: 'Understand the basics',
      },
      {
        id: 'guided',
        label: 'Guided',
        order: 2,
        description: 'Hands-on support',
        expectedOutcome: 'Apply with guidance',
      },
    ],
    concepts: [
      {
        id: 'container-pattern',
        title: 'Container Pattern',
        summary: 'Coordinate feature state.',
        tags: ['architecture'],
        depthLevels: ['intro', 'guided'],
        relatedTopics: [{ topicId: 'facade-pattern', relation: 'supports' }],
        examples: [],
      },
      {
        id: 'facade-pattern',
        title: 'Facade Pattern',
        summary: 'Expose business-friendly API.',
        tags: ['services'],
        depthLevels: ['guided'],
        relatedTopics: [{ topicId: 'container-pattern', relation: 'prerequisite' }],
        examples: [],
      },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    facade = TestBed.inject(LearningContentFacade);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should load content and expose computed slices', () => {
    const request = httpMock.expectOne('assets/content/learning-content.json');
    expect(request.request.method).toBe('GET');
    expect(facade.loading()).toBeTruthy();

    request.flush(mockContent);

    expect(facade.loading()).toBeFalsy();
    expect(facade.error()).toBeNull();
    expect(facade.content()).toEqual(mockContent);
    expect(facade.depthLevels().length).toBe(2);
    expect(facade.concepts().length).toBe(2);
  });

  it('should support concept lookup helpers after load', () => {
    const request = httpMock.expectOne('assets/content/learning-content.json');
    request.flush(mockContent);

    expect(facade.conceptById('facade-pattern')?.title).toBe('Facade Pattern');
    expect(facade.conceptsByDepth('guided').map((concept) => concept.id)).toEqual([
      'container-pattern',
      'facade-pattern',
    ]);
    expect(facade.relatedTopicsFor('container-pattern')).toEqual([
      { topicId: 'facade-pattern', relation: 'supports' },
    ]);
    expect(facade.relatedTopicsFor('missing')).toEqual([]);
  });

  it('should expose a user-friendly error when loading fails', () => {
    const request = httpMock.expectOne('assets/content/learning-content.json');
    request.flush('network error', { status: 500, statusText: 'Server Error' });

    expect(facade.loading()).toBeFalsy();
    expect(facade.error()).toBe('Unable to load learning content.');
    expect(facade.content()).toBeNull();
    expect(facade.depthLevels()).toEqual([]);
    expect(facade.concepts()).toEqual([]);
  });
});
