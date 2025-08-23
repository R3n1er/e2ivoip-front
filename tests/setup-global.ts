// Mock global pour les tests
// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];

  constructor(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ) {
    // Stocker le callback pour pouvoir le déclencher manuellement si nécessaire
    this.callback = callback;
  }

  private callback: IntersectionObserverCallback;

  observe(target: Element): void {
    // Simuler l'observation
  }

  unobserve(target: Element): void {
    // Simuler l'arrêt de l'observation
  }

  disconnect(): void {
    // Simuler la déconnexion
  }

  // Méthode utilitaire pour déclencher manuellement le callback
  triggerCallback(entries: IntersectionObserverEntry[]): void {
    this.callback(entries, this as unknown as IntersectionObserver);
  }

  // Implémentation de takeRecords pour satisfaire l'interface
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
} as unknown as typeof IntersectionObserver;

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor(callback: ResizeObserverCallback) {
    // Stocker le callback
    this.callback = callback;
  }

  private callback: ResizeObserverCallback;

  observe(target: Element): void {
    // Simuler l'observation
  }

  unobserve(target: Element): void {
    // Simuler l'arrêt de l'observation
  }

  disconnect(): void {
    // Simuler la déconnexion
  }
} as unknown as typeof ResizeObserver;

// Mock HTMLCanvasElement.prototype.toDataURL
HTMLCanvasElement.prototype.toDataURL = jest.fn(
  () => "data:image/png;base64,mock"
);

// Mock Image.prototype.src
Object.defineProperty(Image.prototype, "src", {
  set() {
    // Simuler le chargement d'image
    setTimeout(() => {
      if (this.onload) {
        this.onload();
      }
    }, 0);
  },
  configurable: true,
});

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(""),
  } as Response)
);
