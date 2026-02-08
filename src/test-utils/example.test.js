/**
 * Example Tests - Demonstrating Test Infrastructure
 * 
 * This file contains example tests to demonstrate the usage of:
 * - Unit tests with React Testing Library
 * - Property-based tests with fast-check
 * - Custom matchers
 * - Test helpers and mocks
 */

import { render, screen } from '@testing-library/react';
import fc from 'fast-check';
import {
  setupLocalStorageMock,
  themeArbitrary,
  scrollPositionArbitrary,
  skillArbitrary,
} from './index';

// Example component for testing
const ExampleButton = ({ onClick, label }) => (
  <button onClick={onClick} aria-label={label}>
    {label}
  </button>
);

const ExampleSkillBar = ({ name, proficiency }) => (
  <div data-testid="skill-bar">
    <span>{name}</span>
    <div 
      data-testid="skill-bar-fill"
      style={{ width: `${proficiency}%` }}
    />
    <span>{proficiency}%</span>
  </div>
);

const ExampleExternalLink = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

describe('Example Unit Tests', () => {
  describe('ExampleButton', () => {
    it('should render with correct label', () => {
      render(<ExampleButton label="Click Me" />);
      expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    it('should have aria-label', () => {
      render(<ExampleButton label="Click Me" />);
      const button = screen.getByRole('button');
      expect(button).toHaveAriaLabel('Click Me');
    });

    it('should be keyboard accessible', () => {
      render(<ExampleButton label="Click Me" />);
      const button = screen.getByRole('button');
      expect(button).toBeKeyboardAccessible();
    });
  });

  describe('ExampleSkillBar', () => {
    it('should display skill name and proficiency', () => {
      render(<ExampleSkillBar name="JavaScript" proficiency={85} />);
      expect(screen.getByText('JavaScript')).toBeInTheDocument();
      expect(screen.getByText('85%')).toBeInTheDocument();
    });

    it('should have correct bar width', () => {
      render(<ExampleSkillBar name="JavaScript" proficiency={85} />);
      const bar = screen.getByTestId('skill-bar-fill');
      expect(bar).toHaveCorrectSkillBarWidth(85);
    });
  });

  describe('ExampleExternalLink', () => {
    it('should have secure external link attributes', () => {
      render(<ExampleExternalLink href="https://github.com">GitHub</ExampleExternalLink>);
      const link = screen.getByText('GitHub');
      expect(link).toHaveSecureExternalLink();
    });
  });
});

describe('Example Property-Based Tests', () => {
  describe('Property: Theme Persistence', () => {
    // Feature: portfolio-website, Property Example: Theme persistence
    
    beforeEach(() => {
      setupLocalStorageMock();
    });

    afterEach(() => {
      localStorage.clear();
    });

    it('should persist any boolean theme preference', () => {
      fc.assert(
        fc.property(themeArbitrary, (darkMode) => {
          // Store theme preference
          localStorage.setItem('darkMode', JSON.stringify(darkMode));
          
          // Retrieve and verify
          const stored = localStorage.getItem('darkMode');
          const retrieved = JSON.parse(stored);
          
          expect(retrieved).toBe(darkMode);
        }),
        { numRuns: 100 }
      );
    });

    it('should handle round-trip serialization', () => {
      fc.assert(
        fc.property(themeArbitrary, (darkMode) => {
          // Store, retrieve, and verify
          const original = darkMode;
          const serialized = JSON.stringify(original);
          const deserialized = JSON.parse(serialized);
          
          expect(deserialized).toBe(original);
        }),
        { numRuns: 100 }
      );
    });
  });

  describe('Property: Scroll Position', () => {
    // Feature: portfolio-website, Property Example: Scroll button visibility
    
    it('should correctly determine visibility for any scroll position', () => {
      fc.assert(
        fc.property(scrollPositionArbitrary, (scrollY) => {
          // Determine if button should be visible
          const shouldBeVisible = scrollY > 500;
          
          // Verify the logic
          expect(scrollY > 500).toBe(shouldBeVisible);
        }),
        { numRuns: 100 }
      );
    });

    it('should have consistent boundary behavior', () => {
      fc.assert(
        fc.property(scrollPositionArbitrary, (scrollY) => {
          const threshold = 500;
          const isAboveThreshold = scrollY > threshold;
          const isAtOrBelowThreshold = scrollY <= threshold;
          
          // These should be mutually exclusive
          expect(isAboveThreshold).not.toBe(isAtOrBelowThreshold);
        }),
        { numRuns: 100 }
      );
    });
  });

  describe('Property: Skill Bar Width', () => {
    // Feature: portfolio-website, Property Example: Skill bar width matches proficiency
    
    it('should render correct width for any valid proficiency', () => {
      fc.assert(
        fc.property(skillArbitrary, (skill) => {
          render(<ExampleSkillBar name={skill.name} proficiency={skill.proficiency} />);
          
          const bar = screen.getByTestId('skill-bar-fill');
          expect(bar).toHaveCorrectSkillBarWidth(skill.proficiency);
        }),
        { numRuns: 100 }
      );
    });

    it('should have proficiency between 0 and 100', () => {
      fc.assert(
        fc.property(skillArbitrary, (skill) => {
          expect(skill.proficiency).toBeGreaterThanOrEqual(0);
          expect(skill.proficiency).toBeLessThanOrEqual(100);
        }),
        { numRuns: 100 }
      );
    });
  });

  describe('Property: Data Validation', () => {
    // Feature: portfolio-website, Property Example: Non-empty strings
    
    it('should generate non-empty skill names', () => {
      fc.assert(
        fc.property(skillArbitrary, (skill) => {
          expect(skill.name.length).toBeGreaterThan(0);
        }),
        { numRuns: 100 }
      );
    });

    it('should generate valid skill objects', () => {
      fc.assert(
        fc.property(skillArbitrary, (skill) => {
          expect(skill).toHaveProperty('name');
          expect(skill).toHaveProperty('proficiency');
          expect(typeof skill.name).toBe('string');
          expect(typeof skill.proficiency).toBe('number');
        }),
        { numRuns: 100 }
      );
    });
  });
});

describe('Example Test Helpers', () => {
  describe('LocalStorageMock', () => {
    beforeEach(() => {
      setupLocalStorageMock();
    });

    it('should store and retrieve items', () => {
      localStorage.setItem('key', 'value');
      expect(localStorage.getItem('key')).toBe('value');
    });

    it('should return null for non-existent keys', () => {
      expect(localStorage.getItem('nonexistent')).toBeNull();
    });

    it('should clear all items', () => {
      localStorage.setItem('key1', 'value1');
      localStorage.setItem('key2', 'value2');
      localStorage.clear();
      expect(localStorage.getItem('key1')).toBeNull();
      expect(localStorage.getItem('key2')).toBeNull();
    });

    it('should remove specific items', () => {
      localStorage.setItem('key1', 'value1');
      localStorage.setItem('key2', 'value2');
      localStorage.removeItem('key1');
      expect(localStorage.getItem('key1')).toBeNull();
      expect(localStorage.getItem('key2')).toBe('value2');
    });

    it('should report correct length', () => {
      expect(localStorage.length).toBe(0);
      localStorage.setItem('key1', 'value1');
      expect(localStorage.length).toBe(1);
      localStorage.setItem('key2', 'value2');
      expect(localStorage.length).toBe(2);
    });
  });
});
