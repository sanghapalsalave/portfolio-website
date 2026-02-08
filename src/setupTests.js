// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// jest-axe adds accessibility testing matchers
// learn more: https://github.com/nickcolley/jest-axe
import { toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

// Add custom matchers for portfolio website testing
import { customMatchers } from './test-utils/customMatchers';
expect.extend(customMatchers);
