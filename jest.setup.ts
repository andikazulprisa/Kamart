import "@testing-library/jest-dom";

// Increase timeout for async operations
jest.setTimeout(10000);

// Mock useRouter
jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      query: {},
      pathname: '',
    };
  },
}));

// Reset mocks setelah setiap test
afterEach(() => {
  jest.clearAllMocks();
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
  takeRecords() { return [] }
} as any;

// Mock fetch dengan timeout
global.fetch = jest.fn(() =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        json: () => Promise.resolve({}),
        ok: true,
        status: 200,
      });
    }, 100);
  })
) as jest.Mock;

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor(callback: any) {}
  observe() {}
  unobserve() {}
  disconnect() {}
};
