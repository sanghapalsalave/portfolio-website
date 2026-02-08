# Test Utilities Documentation

This directory contains test utilities, generators, and custom matchers for testing the portfolio website.

## Overview

The test infrastructure supports both **unit testing** and **property-based testing** using:
- **Jest** - Test runner and assertion library
- **React Testing Library** - Component testing utilities
- **fast-check** - Property-based testing framework
- **jest-axe** - Accessibility testing

## Files

### `testHelpers.js`
Common test helper functions and mocks.

**Key Exports:**
- `renderWithProviders(ui, options)` - Custom render function for components
- `LocalStorageMock` - Mock implementation of localStorage
- `setupLocalStorageMock()` - Setup localStorage mock for tests
- `IntersectionObserverMock` - Mock implementation of IntersectionObserver
- `setupIntersectionObserverMock()` - Setup IntersectionObserver mock
- `waitForCondition(condition, timeout, interval)` - Wait for async conditions
- `simulateScroll(scrollY)` - Simulate window scroll events
- `cleanupAfterTest()` - Clean up mocks and timers

**Example Usage:**
```javascript
import { setupLocalStorageMock, simulateScroll } from './test-utils';

describe('Theme Toggle', () => {
  beforeEach(() => {
    setupLocalStorageMock();
  });

  it('should persist theme preference', () => {
    // Test implementation
  });
});
```

### `generators.js`
Fast-check generators (arbitraries) for property-based testing.

**Key Exports:**
- `themeArbitrary` - Boolean generator for theme preferences
- `scrollPositionArbitrary` - Integer generator for scroll positions (0-10000)
- `roleArrayArbitrary` - Array of role title strings
- `timelineItemArbitrary` - Timeline item objects
- `skillArbitrary` - Skill objects with name and proficiency
- `projectArbitrary` - Project objects
- `educationArbitrary` - Education entry objects
- `certificationArbitrary` - Certification objects
- `servicesDataArbitrary` - Services section data
- `tutoringDataArbitrary` - Tutoring section data
- `mobileAppArbitrary` - Mobile app objects
- `localStorageDataArbitrary` - Valid and corrupted localStorage data
- `viewportArbitrary` - Viewport dimensions
- And many more...

**Example Usage:**
```javascript
import fc from 'fast-check';
import { themeArbitrary, timelineArrayArbitrary } from './test-utils';

describe('Property: Theme Persistence', () => {
  it('should persist any theme preference', () => {
    fc.assert(
      fc.property(themeArbitrary, (darkMode) => {
        // Test implementation
      }),
      { numRuns: 100 }
    );
  });
});
```

### `customMatchers.js`
Custom Jest matchers for common assertions.

**Key Exports:**
- `toHaveClass(className)` - Check if element has CSS class
- `toHaveSecureExternalLink()` - Check for target="_blank" and rel="noopener noreferrer"
- `toHaveCorrectSkillBarWidth(proficiency)` - Verify skill bar width matches percentage
- `toBeInViewport()` - Check if element is visible in viewport
- `toHaveAriaLabel(label?)` - Check for aria-label attribute
- `toBeInReverseChronologicalOrder()` - Verify timeline ordering
- `toHaveHoverEffect()` - Check for hover transform/shadow effects
- `toBeKeyboardAccessible()` - Verify keyboard accessibility

**Example Usage:**
```javascript
import { render, screen } from '@testing-library/react';

it('should have secure external links', () => {
  render(<SocialLinks />);
  const githubLink = screen.getByText('GitHub');
  expect(githubLink).toHaveSecureExternalLink();
});

it('should have correct skill bar width', () => {
  render(<SkillBar name="Java" proficiency={90} />);
  const bar = screen.getByTestId('skill-bar');
  expect(bar).toHaveCorrectSkillBarWidth(90);
});
```

## Property-Based Testing Guidelines

### What is Property-Based Testing?

Property-based testing verifies that certain properties (invariants) hold true across a wide range of inputs, rather than testing specific examples. Instead of writing:

```javascript
// Unit test - specific example
it('should add two numbers', () => {
  expect(add(2, 3)).toBe(5);
});
```

You write:

```javascript
// Property test - universal property
it('should be commutative', () => {
  fc.assert(
    fc.property(fc.integer(), fc.integer(), (a, b) => {
      expect(add(a, b)).toBe(add(b, a));
    })
  );
});
```

### When to Use Property-Based Testing

Use property-based tests for:
- **Universal properties** that should hold for all inputs
- **State transitions** that should maintain invariants
- **Data transformations** that should preserve certain characteristics
- **Edge cases** that are hard to enumerate manually

Use unit tests for:
- **Specific examples** that demonstrate correct behavior
- **Regression tests** for known bugs
- **Integration scenarios** with specific data
- **User interactions** with specific UI elements

### Property Test Configuration

All property tests should:
1. Run at least **100 iterations** (`numRuns: 100`)
2. Be tagged with feature and property number in comments
3. Use appropriate generators from `generators.js`
4. Clean up after each iteration

**Example:**
```javascript
describe('Property 1: Theme Persistence Round-Trip', () => {
  // Feature: portfolio-website, Property 1: Theme persistence round-trip
  // Validates: Requirements 2.5, 2.6
  
  it('should persist and restore any theme preference', () => {
    fc.assert(
      fc.property(themeArbitrary, (darkMode) => {
        // Setup
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
        
        // Test
        const { rerender } = render(<App />);
        const hasClass = document.body.classList.contains('dark-mode');
        
        // Assert
        expect(hasClass).toBe(darkMode);
        
        // Cleanup
        localStorage.clear();
      }),
      { numRuns: 100 }
    );
  });
});
```

## Accessibility Testing

Use `jest-axe` for automated accessibility testing:

```javascript
import { axe } from 'jest-axe';

it('should have no accessibility violations', async () => {
  const { container } = render(<App />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## Best Practices

### 1. Setup and Cleanup

Always clean up after tests to prevent side effects:

```javascript
beforeEach(() => {
  setupLocalStorageMock();
  setupIntersectionObserverMock();
});

afterEach(() => {
  cleanupAfterTest();
});
```

### 2. Mocking Browser APIs

Mock browser APIs that aren't available in jsdom:

```javascript
beforeEach(() => {
  // Mock scrollY
  Object.defineProperty(window, 'scrollY', {
    writable: true,
    configurable: true,
    value: 0,
  });
  
  // Mock IntersectionObserver
  setupIntersectionObserverMock();
});
```

### 3. Testing Async Behavior

Use `waitFor` from React Testing Library or `waitForCondition`:

```javascript
import { waitFor } from '@testing-library/react';

it('should show scroll button after scrolling', async () => {
  render(<App />);
  simulateScroll(600);
  
  await waitFor(() => {
    expect(screen.getByLabelText('Scroll to top')).toBeVisible();
  });
});
```

### 4. Testing Animations

For typing animations and other time-based effects, use fake timers:

```javascript
beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

it('should type characters one by one', () => {
  render(<TypingEffect roles={['Developer']} />);
  
  act(() => {
    jest.advanceTimersByTime(100);
  });
  
  expect(screen.getByText(/D/)).toBeInTheDocument();
});
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- App.test.js

# Run property tests only
npm test -- --testNamePattern="Property"
```

## Coverage Goals

- **Unit Test Coverage:** > 80% of component code
- **Property Test Coverage:** All 23 correctness properties
- **Accessibility:** Zero critical violations
- **Integration:** All major user flows

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [fast-check Documentation](https://fast-check.dev/)
- [jest-axe Documentation](https://github.com/nickcolley/jest-axe)
- [Property-Based Testing Guide](https://fast-check.dev/docs/introduction/)
