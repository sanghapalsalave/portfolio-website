# Jest Configuration for Portfolio Website

## Overview

The portfolio website uses Create React App's built-in Jest configuration with additional setup for property-based testing and accessibility testing.

## Configuration

Jest is configured through `react-scripts` and doesn't require a separate `jest.config.js` file. The configuration is extended through:

1. **setupTests.js** - Test environment setup
2. **package.json** - Test scripts and Jest settings

## Test Environment Setup

The `src/setupTests.js` file configures:

### 1. jest-dom
Provides custom DOM matchers:
- `toBeInTheDocument()`
- `toHaveTextContent()`
- `toBeVisible()`
- And many more...

### 2. jest-axe
Provides accessibility testing:
- `toHaveNoViolations()` - Check for a11y violations

### 3. Custom Matchers
Portfolio-specific matchers:
- `toHaveClass(className)`
- `toHaveSecureExternalLink()`
- `toHaveCorrectSkillBarWidth(proficiency)`
- `toBeInViewport()`
- `toHaveAriaLabel(label?)`
- `toBeInReverseChronologicalOrder()`
- `toHaveHoverEffect()`
- `toBeKeyboardAccessible()`

## Test Scripts

Available in `package.json`:

```json
{
  "scripts": {
    "test": "react-scripts test",
    "test:coverage": "react-scripts test --coverage --watchAll=false",
    "test:ci": "CI=true react-scripts test --coverage"
  }
}
```

### Running Tests

```bash
# Interactive watch mode (default)
npm test

# Run all tests once
npm test -- --watchAll=false

# Run with coverage
npm test -- --coverage --watchAll=false

# Run specific test file
npm test -- App.test.js

# Run tests matching pattern
npm test -- --testNamePattern="Property"

# Run in CI mode
npm run test:ci
```

## Property-Based Testing Configuration

### fast-check Settings

Default configuration for all property tests:

```javascript
fc.assert(
  fc.property(arbitrary, (value) => {
    // Test implementation
  }),
  {
    numRuns: 100,        // Run 100 iterations (minimum)
    verbose: true,       // Show detailed output on failure
    seed: undefined,     // Random seed (set for reproducibility)
    path: undefined,     // Replay specific path
    endOnFailure: false, // Continue after first failure
  }
);
```

### Recommended Settings

For different test scenarios:

**Quick Tests (Development):**
```javascript
{ numRuns: 50 }
```

**Standard Tests (Default):**
```javascript
{ numRuns: 100 }
```

**Thorough Tests (CI/Pre-commit):**
```javascript
{ numRuns: 1000 }
```

**Regression Tests (Known Bug):**
```javascript
{ 
  numRuns: 100,
  seed: 42,           // Fixed seed for reproducibility
  path: "0:1:2:3"     // Replay specific failure path
}
```

## Coverage Configuration

Jest coverage is configured through Create React App defaults:

### Coverage Thresholds

Add to `package.json` to enforce coverage:

```json
{
  "jest": {
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    }
  }
}
```

### Coverage Reports

Generated in `coverage/` directory:
- `coverage/lcov-report/index.html` - HTML report
- `coverage/lcov.info` - LCOV format
- `coverage/coverage-final.json` - JSON format

### Viewing Coverage

```bash
# Generate coverage report
npm test -- --coverage --watchAll=false

# Open HTML report (Windows)
start coverage/lcov-report/index.html

# Open HTML report (Mac)
open coverage/lcov-report/index.html

# Open HTML report (Linux)
xdg-open coverage/lcov-report/index.html
```

## Test File Patterns

Jest automatically finds test files matching:
- `**/__tests__/**/*.js`
- `**/*.test.js`
- `**/*.spec.js`

## Mocking

### Browser APIs

Mock browser APIs in test files:

```javascript
beforeEach(() => {
  // Mock localStorage
  setupLocalStorageMock();
  
  // Mock IntersectionObserver
  setupIntersectionObserverMock();
  
  // Mock window.scrollY
  Object.defineProperty(window, 'scrollY', {
    writable: true,
    configurable: true,
    value: 0,
  });
});
```

### Timers

For testing animations and timeouts:

```javascript
beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

it('should animate', () => {
  // Test with fake timers
  act(() => {
    jest.advanceTimersByTime(1000);
  });
});
```

## Debugging Tests

### VS Code Configuration

Add to `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Jest Tests",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/react-scripts",
      "args": ["test", "--runInBand", "--no-cache", "--watchAll=false"],
      "cwd": "${workspaceFolder}",
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

### Debug Specific Test

```bash
# Run with Node debugger
node --inspect-brk node_modules/.bin/jest --runInBand --no-cache App.test.js
```

### Debug Property Test Failures

When a property test fails, fast-check provides:
- **Counterexample**: The input that caused the failure
- **Seed**: Random seed for reproducibility
- **Path**: Shrinking path to minimal failing case

Example output:
```
Property failed after 23 tests
{ seed: 1234567890, path: "0:1:2:3", endOnFailure: true }
Counterexample: [false]
```

To reproduce:
```javascript
fc.assert(
  fc.property(themeArbitrary, (darkMode) => {
    // Test
  }),
  { 
    seed: 1234567890,
    path: "0:1:2:3"
  }
);
```

## Best Practices

### 1. Test Organization

```javascript
describe('Component Name', () => {
  describe('Feature/Behavior', () => {
    it('should do something specific', () => {
      // Test
    });
  });
});
```

### 2. Setup and Teardown

```javascript
beforeEach(() => {
  // Setup before each test
});

afterEach(() => {
  // Cleanup after each test
  cleanupAfterTest();
});
```

### 3. Property Test Naming

```javascript
describe('Property N: Description', () => {
  // Feature: portfolio-website, Property N: Description
  // Validates: Requirements X.Y, X.Z
  
  it('should maintain invariant for all inputs', () => {
    fc.assert(/* ... */);
  });
});
```

### 4. Async Testing

```javascript
it('should handle async behavior', async () => {
  render(<Component />);
  
  await waitFor(() => {
    expect(screen.getByText('Loaded')).toBeInTheDocument();
  });
});
```

## Troubleshooting

### Common Issues

**Issue: Tests timeout**
- Increase timeout: `jest.setTimeout(10000)`
- Check for infinite loops
- Verify async operations complete

**Issue: Property tests fail intermittently**
- Use fixed seed for reproducibility
- Check for test pollution (shared state)
- Verify cleanup in afterEach

**Issue: Coverage not generated**
- Run with `--coverage` flag
- Check `collectCoverageFrom` in package.json
- Verify test files are being found

**Issue: Mocks not working**
- Verify mock setup in beforeEach
- Check mock is called before component render
- Use `jest.clearAllMocks()` in afterEach

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [fast-check Documentation](https://fast-check.dev/)
- [jest-axe Documentation](https://github.com/nickcolley/jest-axe)
- [Create React App Testing](https://create-react-app.dev/docs/running-tests/)
