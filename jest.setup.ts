import "@testing-library/jest-dom";

/** jsdom has no IntersectionObserver; the header nav uses it for scroll-spy. */
class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

globalThis.IntersectionObserver ??=
  IntersectionObserverStub as unknown as typeof IntersectionObserver;
