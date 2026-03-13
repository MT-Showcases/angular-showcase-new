/**
 * PATTERN: Service Facade + HttpClient
 *
 * WHY: Il componente non deve sapere come funziona l'API. Il Service Facade
 *   nasconde i dettagli HTTP (URL, headers, parsing, retry) dietro un'interfaccia
 *   semplice e testabile. Il componente parla solo col service.
 *
 * QUANDO USARLO:
 *   - Qualsiasi chiamata HTTP in Angular → sempre tramite un service
 *   - Quando più componenti usano gli stessi dati (es. PostsService)
 *   - Quando vuoi aggiungere caching, retry o error handling centralizzato
 *
 * ALTERNATIVA:
 *   - NgRx Effects → per dati globali con state management avanzato
 *   - toSignal(http.get()) → per casi semplici one-shot senza CRUD
 *   - Resource API (Angular 19+) → per async data loading dichiarativo
 *
 * ANTI-PATTERN:
 *   - ❌ Iniettare HttpClient direttamente nel componente
 *   - ❌ Non gestire gli stati loading/error → UX scadente
 *   - ❌ Subscribe infiniti senza unsubscribe (qui OK perché HTTP è one-shot)
 *   - ❌ Logica di trasformazione dati nel componente → spostala nel service
 */

// COMPONENT TYPE: Container
// SECTION: HTTP and Async Operations

import { Component, signal, inject } from '@angular/core';
import { PostsService, Post } from '../../services/posts.service';
import { PageHeader } from '../page-header/page-header';
import { CodeBlock } from '../components/code-block/code-block';

@Component({
  selector: 'app-http-example',
  imports: [PageHeader, CodeBlock],
  templateUrl: './http-example.html',
  styleUrl: './http-example.scss',
})
export class HttpExample {
  // Dependency Injection of PostsService
  private postsService = inject(PostsService);

  // ═══════════════════════════════════════════════════════════════════
  // STATE - Using Signals for reactivity
  // ═══════════════════════════════════════════════════════════════════
  posts = signal<Post[]>([]); // List of all posts
  selectedPost = signal<Post | null>(null); // Selected post for display
  loading = signal(false); // Loading indicator
  error = signal<string | null>(null); // Error message

  // Form data to create a new post
  newPost = signal({
    userId: 1,
    title: '',
    body: '',
  });

  // Example code for the section
  serviceExampleCode = `// 1. Define the Service Facade
@Injectable({ providedIn: 'root' })
export class PostsService {
  private http = inject(HttpClient);

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('api/posts');
  }
}

// 2. Use the Service in the Component
@Component({ ... })
export class MyComponent {
  private postsService = inject(PostsService);
  posts = signal<Post[]>([]);

  loadPosts() {
    this.postsService.getPosts().subscribe(
      posts => this.posts.set(posts)
    );
  }
}`;

  // ═══════════════════════════════════════════════════════════════════
  // HTTP METHODS - Examples of all CRUD operations
  // ═══════════════════════════════════════════════════════════════════

  /**
   * GET - Load all posts
   * Example of how to handle an HTTP request with Observable
   */
  loadPosts() {
    this.loading.set(true);
    this.error.set(null);

    // subscribe() allows "listening" to the Observable
    this.postsService.getPosts().subscribe({
      // next: called when data arrives
      next: (posts) => {
        this.posts.set(posts.slice(0, 10)); // Take only first 10 for brevity
        this.loading.set(false);
      },
      // error: called in case of HTTP error
      error: (err) => {
        this.error.set('Errore nel caricamento dei post: ' + err.message);
        this.loading.set(false);
        console.error('HTTP Error:', err);
      },
    });
  }

  /**
   * GET by ID - Load a single post
   */
  loadPost(id: number) {
    this.loading.set(true);
    this.error.set(null);

    this.postsService.getPost(id).subscribe({
      next: (post) => {
        this.selectedPost.set(post);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Errore nel caricamento del post: ' + err.message);
        this.loading.set(false);
      },
    });
  }

  /**
   * POST - Create a new post
   * JSONPlaceholder simulates creation, returns a fake ID
   */
  createPost() {
    const post = this.newPost();

    if (!post.title || !post.body) {
      this.error.set('Titolo e contenuto sono obbligatori!');
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.postsService.createPost(post).subscribe({
      next: (createdPost) => {
        // Add created post to the beginning of the list
        this.posts.update((posts) => [createdPost, ...posts]);

        // Reset form
        this.newPost.set({ userId: 1, title: '', body: '' });
        this.loading.set(false);

        alert(`Post creato con ID: ${createdPost.id}`);
      },
      error: (err) => {
        this.error.set('Errore nella creazione del post: ' + err.message);
        this.loading.set(false);
      },
    });
  }

  /**
   * PUT - Update an existing post
   */
  updatePost(post: Post) {
    const updatedPost = {
      ...post,
      title: post.title + ' (MODIFICATO)',
    };

    this.loading.set(true);

    this.postsService.updatePost(post.id, updatedPost).subscribe({
      next: (updated) => {
        // Update post in the list
        this.posts.update((posts) => posts.map((p) => (p.id === updated.id ? updated : p)));
        this.loading.set(false);
        alert('Post aggiornato con successo!');
      },
      error: (err) => {
        this.error.set("Errore nell'aggiornamento: " + err.message);
        this.loading.set(false);
      },
    });
  }

  /**
   * DELETE - Delete a post
   */
  deletePost(id: number) {
    if (!confirm('Sei sicuro di voler eliminare questo post?')) {
      return;
    }

    this.loading.set(true);

    this.postsService.deletePost(id).subscribe({
      next: () => {
        // Remove post from the list
        this.posts.update((posts) => posts.filter((p) => p.id !== id));
        this.loading.set(false);
        alert('Post eliminato con successo!');
      },
      error: (err) => {
        this.error.set("Errore nell'eliminazione: " + err.message);
        this.loading.set(false);
      },
    });
  }

  /**
   * Update the title field of the form
   */
  updateTitle(event: Event) {
    const input = event.target as HTMLInputElement;
    this.newPost.update((post) => ({ ...post, title: input.value }));
  }

  /**
   * Update the body field of the form
   */
  updateBody(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    this.newPost.update((post) => ({ ...post, body: textarea.value }));
  }
}
