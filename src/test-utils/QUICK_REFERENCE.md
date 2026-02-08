# Testing Quick Reference Guide

## Quick Start

### Import Test Utilities

```javascript
// React Testing Library
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// fast-check for property-based testing
import fc from 'fast-check';

// Custom test utilities
import {
  setupLocalStorageMock,
  setupIntersectionObserverMock,
  simulateScroll,
  cleanupAfterTest,
  themeArbitrary,
  skillArbitrary,
  timelineArrayArbitrary,
} from './test-utils';

// jest-axe for accessibility
import { axe } from 'jest-axe';
```

## Unit Test Template

```javascript
describe('ComponentName', () => {
  beforeEach(() => {
    // Setup mocks
    setupLocalStorageMock();
    setupIntersectionObserverMock();
  });

  afterEach(() => {
    // Cleanup
    cleanupAfterTest();
  });

  it('should render correctly', () => {
    render(<ComponentName />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('should handle user interaction', () => {
    render(<ComponentName />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(screen.getByText('Result')).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<ComponentName />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

## Property Test Template

```javascript
describe('Property N: Description', () => {
  // Feature: portfolio-website, Property N: Description
  // Validates: Requirements X.Y
  
  beforeEach(() => {
    setupLocalStorageMock();
  });

  afterEach(() => {
    cleanupAfterTest();
  });

  it('should maintain invariant for all inputs', () => {
    fc.assert(
      fc.property(themeArbitrary, (darkMode) => {
        // Setup
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
        
        // Test
        render(<App />);
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

## Common Test Patterns

### Testing Theme Toggle

```javascript
it('should toggle theme', () => {
  setupLocalStorageMock();
  render(<App />);
  
  const toggle = screen.getByLabelText('Toggle dark mode');
  fireEvent.click(toggle);
  
  expect(document.body).toHaveClass('dark-mode');
  expect(localStorage.getItem('darkMode')).toBe('true');
});
```

### Testing Scroll Behavior

```javascript
it('should show scroll button after scrolling', async () => {
  render(<App />);
  
  simulateScroll(600);
  
  await waitFor(() => {
    expect(screen.getByLabelText('Scroll to top')).toBeVisible();
  });
});
```

### Testing Animations

```javascript
it('should animate typing effect', () => {
  jest.useFakeTimers();
  render(<TypingEffect roles={['Developer']} />);
  
  act(() => {
    jest.advanceTimersByTime(100);
  });
  
  expect(screen.getByText(/D/)).toBeInTheDocument();
  
  jest.useRealTimers();
});
```

### Testing External Links

```javascript
it('should have secure external links', () => {
  render(<SocialLinks />);
  const link = screen.getByText('GitHub');
  expect(link).toHaveSecureExternalLink();
});
```

### Testing Skill Bars

```javascript
it('should display correct skill bar width', () => {
  render(<SkillBar name="Java" proficiency={90} />);
  const bar = screen.getByTestId('skill-bar');
  expect(bar).toHaveCorrectSkillBarWidth(90);
});
```

### Testing Timeline Order

```javascript
it('should display timeline in reverse chronological order', () => {
  const items = [
    { company: 'A', startDate: '2023-01-01' },
    { company: 'B', startDate: '2022-01-01' },
  ];
  
  render(<Timeline items={items} />);
  const renderedItems = screen.getAllByTestId('timeline-item');
  
  expect(renderedItems[0]).toHaveTextContent('A');
  expect(renderedItems[1]).toHaveTextContent('B');
});
```

### Testing Intersection Observer

```javascript
it('should trigger animation on intersection', () => {
  const observer = setupIntersectionObserverMock();
  render(<AnimatedSection />);
  
  const section = screen.getByTestId('animated-section');
  observer.triggerIntersection(section, true);
  
  expect(section).toHaveClass('animate-in');
});
```

## Available Generators

### Basic Types
- `themeArbitrary` - Boolean (true/false)
- `scrollPositionArbitrary` - Integer (0-10000)
- `proficiencyArbitrary` - Integer (0-100)
- `roleTitleArbitrary` - Non-empty string
- `dateStringArbitrary` - Date string (YYYY-MM-DD)

### Complex Objects
- `skillArbitrary` - { name, proficiency }
- `timelineItemArbitrary` - { title, company, dateRange, location, description?, skills }
- `projectArbitrary` - { badge, name, dateRange, description, technologies }
- `educationArbitrary` - { institution, degree, field, years }
- `certificationArbitrary` - { icon, name, issuer, issueDate }
- `mobileAppArbitrary` - { name, description, screenshots, technologies, platforms, links }

### Arrays
- `roleArrayArbitrary` - Array of role titles
- `timelineArrayArbitrary` - Array of timeline items
- `skillCategoriesArbitrary` - Array of skill categories
- `projectArrayArbitrary` - Array of projects
- `navigationLinksArbitrary` - Array of navigation links

### Special
- `localStorageDataArbitrary` - Valid/corrupted localStorage data
- `viewportArbitrary` - { width, height }
- `servicesDataArbitrary` - Services section data
- `tutoringDataArbitrary` - Tutoring section data

## Custom Matchers

### DOM Matchers
- `expect(element).toHaveClass('class-name')`
- `expect(element).toBeInViewport()`
- `expect(element).toHaveAriaLabel('label')`
- `expect(element).toBeKeyboardAccessible()`

### Link Matchers
- `expect(link).toHaveSecureExternalLink()`

### Component Matchers
- `expect(skillBar).toHaveCorrectSkillBarWidth(90)`
- `expect(items).toBeInReverseChronologicalOrder()`
- `expect(card).toHaveHoverEffect()`

### Accessibility Matchers
- `expect(results).toHaveNoViolations()` (from jest-axe)

## Test Helpers

### Setup Functions
```javascript
setupLocalStorageMock()           // Mock localStorage
setupIntersectionObserverMock()   // Mock IntersectionObserver
```

### Utility Functions
```javascript
simulateScroll(600)               // Simulate scroll to position
waitForCondition(() => true)      // Wait for condition
cleanupAfterTest()                // Clean up mocks and timers
```

### Render Functions
```javascript
renderWithProviders(<Component />) // Render with providers
```

## Querying Elements

### By Role (Preferred)
```javascript
screen.getByRole('button')
screen.getByRole('link', { name: 'GitHub' })
screen.getByRole('heading', { level: 1 })
```

### By Label
```javascript
screen.getByLabelText('Toggle dark mode')
screen.getByLabelText('Email address')
```

### By Text
```javascript
screen.getByText('Welcome')
screen.getByText(/welcome/i)  // Case insensitive
```

### By Test ID
```javascript
screen.getByTestId('skill-bar')
screen.getByTestId('timeline-item')
```

### Query Variants
```javascript
getBy...    // Throws if not found
queryBy...  // Returns null if not found
findBy...   // Async, waits for element
getAllBy... // Returns array
```

## Assertions

### Presence
```javascript
expect(element).toBeInTheDocument()
expect(element).toBeVisible()
expect(element).not.toBeInTheDocument()
```

### Content
```javascript
expect(element).toHaveTextContent('text')
expect(element).toHaveValue('value')
expect(element).toHaveAttribute('href', 'url')
```

### State
```javascript
expect(element).toBeDisabled()
expect(element).toBeEnabled()
expect(element).toBeChecked()
expect(element).toHaveFocus()
```

### Style
```javascript
expect(element).toHaveStyle({ color: 'red' })
expect(element).toHaveClass('active')
```

## Running Tests

```bash
# Watch mode
npm test

# Run all once
npm test -- --watchAll=false

# With coverage
npm test -- --coverage --watchAll=false

# Specific file
npm test -- App.test.js

# Pattern matching
npm test -- --testNamePattern="Property"

# Update snapshots
npm test -- -u
```

## Debugging

### Console Output
```javascript
screen.debug()              // Print entire DOM
screen.debug(element)       // Print specific element
console.log(element)        // Log element
```

### Breakpoints
```javascript
debugger;  // Pause execution
```

### Verbose Property Tests
```javascript
fc.assert(
  fc.property(arbitrary, (value) => {
    console.log('Testing with:', value);
    // Test
  }),
  { verbose: true }  // Show all test cases
);
```

## Common Pitfalls

### ❌ Don't
```javascript
// Don't query by class or ID
const element = container.querySelector('.my-class');

// Don't use implementation details
const element = container.firstChild;

// Don't forget cleanup
// (Always use afterEach with cleanupAfterTest)
```

### ✅ Do
```javascript
// Query by role, label, or text
const element = screen.getByRole('button');

// Use semantic queries
const element = screen.getByLabelText('Email');

// Always cleanup
afterEach(() => {
  cleanupAfterTest();
});
```

## Resources

- Full documentation: `src/test-utils/README.md`
- Jest config: `src/test-utils/jest.config.md`
- Example tests: `src/test-utils/example.test.js`
