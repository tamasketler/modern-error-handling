import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv();

// Mock crypto.randomUUID for JSDOM environment
Object.defineProperty(globalThis, 'crypto', {
  value: {
    ...globalThis.crypto,
    randomUUID: () => Math.random().toString(36).substring(2) + Date.now().toString(36),
  },
});

