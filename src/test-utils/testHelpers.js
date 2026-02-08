/**
 * Test Utilities for Portfolio Website
 * 
 * This module provides helper functions and utilities for testing
 * the portfolio website components.
 */

import { render } from '@testing-library/react';

/**
 * Custom render function that wraps components with common providers
 * Currently just wraps the default render, but can be extended with providers
 * 
 * @param {React.Component} ui - The component to render
 * @param {Object} options - Additional render options
 * @returns {Object} - Render result with additional utilities
 */
export function renderWithProviders(ui, options = {}) {
  return render(ui, { ...options });
}

/**
 * Mock localStorage for testing
 * Provides a simple in-memory implementation of localStorage
 */
export class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }

  get length() {
    return Object.keys(this.store).length;
  }

  key(index) {
    const keys = Object.keys(this.store);
    return keys[index] || null;
  }
}

/**
 * Setup localStorage mock for tests
 * Call this in beforeEach to ensure clean localStorage state
 */
export function setupLocalStorageMock() {
  const localStorageMock = new LocalStorageMock();
  global.localStorage = localStorageMock;
  return localStorageMock;
}

/**
 * Mock IntersectionObserver for testing
 * Provides a simple implementation that can be controlled in tests
 */
export class IntersectionObserverMock {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
    this.observedElements = new Set();
  }

  observe(element) {
    this.observedElements.add(element);
  }

  unobserve(element) {
    this.observedElements.delete(element);
  }

  disconnect() {
    this.observedElements.clear();
  }

  /**
   * Trigger intersection for testing
   * @param {Element} element - The element to trigger intersection for
   * @param {boolean} isIntersecting - Whether the element is intersecting
   */
  triggerIntersection(element, isIntersecting = true) {
    const entry = {
      target: element,
      isIntersecting,
      intersectionRatio: isIntersecting ? 1 : 0,
      boundingClientRect: element.getBoundingClientRect(),
      intersectionRect: isIntersecting ? element.getBoundingClientRect() : {},
      rootBounds: null,
      time: Date.now(),
    };
    this.callback([entry], this);
  }
}

/**
 * Setup IntersectionObserver mock for tests
 * Call this in beforeEach to ensure IntersectionObserver is available
 */
export function setupIntersectionObserverMock() {
  global.IntersectionObserver = IntersectionObserverMock;
  return IntersectionObserverMock;
}

/**
 * Wait for a condition to be true
 * Useful for testing async behavior
 * 
 * @param {Function} condition - Function that returns true when condition is met
 * @param {number} timeout - Maximum time to wait in milliseconds
 * @param {number} interval - Check interval in milliseconds
 * @returns {Promise<void>}
 */
export async function waitForCondition(condition, timeout = 5000, interval = 50) {
  const startTime = Date.now();
  
  while (!condition()) {
    if (Date.now() - startTime > timeout) {
      throw new Error('Timeout waiting for condition');
    }
    await new Promise(resolve => setTimeout(resolve, interval));
  }
}

/**
 * Simulate scroll event
 * @param {number} scrollY - The scroll position
 */
export function simulateScroll(scrollY) {
  Object.defineProperty(window, 'scrollY', {
    writable: true,
    configurable: true,
    value: scrollY,
  });
  window.dispatchEvent(new Event('scroll'));
}

/**
 * Clean up after tests
 * Resets mocks and clears timers
 */
export function cleanupAfterTest() {
  jest.clearAllTimers();
  jest.clearAllMocks();
  if (global.localStorage) {
    global.localStorage.clear();
  }
}
