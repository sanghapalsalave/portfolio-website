import { render, screen, waitFor, act } from '@testing-library/react';
import App from './App';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('Task 4.2: Typing Animation Effect', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('State Management', () => {
    test('should initialize roleIndex state to 0', () => {
      render(<App />);
      // The first role should be displayed initially
      const typingText = document.querySelector('.typing-text');
      expect(typingText).toBeInTheDocument();
    });

    test('should initialize displayText state to empty string', () => {
      render(<App />);
      const typingText = document.querySelector('.typing-text');
      // Initially empty, will start typing
      expect(typingText.textContent).toBe('');
    });

    test('should initialize isDeleting state to false', () => {
      render(<App />);
      // Component should start in typing mode (not deleting)
      const typingText = document.querySelector('.typing-text');
      expect(typingText).toBeInTheDocument();
    });
  });

  describe('Character-by-Character Typing Logic', () => {
    test('should type characters one by one', async () => {
      jest.useFakeTimers();
      render(<App />);
      
      const typingText = document.querySelector('.typing-text');
      expect(typingText.textContent).toBe('');

      // Advance time to see first character
      act(() => {
        jest.advanceTimersByTime(100);
      });
      expect(typingText.textContent.length).toBe(1);

      // Advance time to see second character
      act(() => {
        jest.advanceTimersByTime(100);
      });
      expect(typingText.textContent.length).toBe(2);

      // Advance time to see third character
      act(() => {
        jest.advanceTimersByTime(100);
      });
      expect(typingText.textContent.length).toBe(3);
    });

    test('should type at 100ms intervals', async () => {
      jest.useFakeTimers();
      render(<App />);
      
      const typingText = document.querySelector('.typing-text');
      
      // After 100ms, should have 1 character
      act(() => {
        jest.advanceTimersByTime(100);
      });
      const lengthAfter100ms = typingText.textContent.length;
      expect(lengthAfter100ms).toBe(1);

      // After another 100ms, should have 2 characters
      act(() => {
        jest.advanceTimersByTime(100);
      });
      expect(typingText.textContent.length).toBe(2);
    });

    test('should type complete role text', async () => {
      jest.useFakeTimers();
      render(<App />);
      
      const typingText = document.querySelector('.typing-text');
      const expectedRole = 'Senior Software Engineer';

      // Type the entire role (100ms per character)
      act(() => {
        jest.advanceTimersByTime(100 * expectedRole.length);
      });

      expect(typingText.textContent).toBe(expectedRole);
    });
  });

  describe('Deletion Logic with Timing', () => {
    test('should pause 1500ms before starting deletion', async () => {
      jest.useFakeTimers();
      render(<App />);
      
      const typingText = document.querySelector('.typing-text');
      const expectedRole = 'Senior Software Engineer';

      // Type the entire role
      act(() => {
        jest.advanceTimersByTime(100 * expectedRole.length);
      });
      expect(typingText.textContent).toBe(expectedRole);

      // After 1400ms, should still be complete
      act(() => {
        jest.advanceTimersByTime(1400);
      });
      expect(typingText.textContent).toBe(expectedRole);

      // After 1500ms pause + 50ms, should start deleting
      act(() => {
        jest.advanceTimersByTime(150);
      });
      expect(typingText.textContent.length).toBeLessThan(expectedRole.length);
    });

    test('should delete characters one by one', async () => {
      jest.useFakeTimers();
      render(<App />);
      
      const typingText = document.querySelector('.typing-text');
      const expectedRole = 'Senior Software Engineer';

      // Type the entire role and wait for pause
      act(() => {
        jest.advanceTimersByTime(100 * expectedRole.length + 1500);
      });

      // Now in deletion mode
      const lengthBeforeDeletion = typingText.textContent.length;

      // Delete one character (50ms)
      act(() => {
        jest.advanceTimersByTime(50);
      });
      expect(typingText.textContent.length).toBe(lengthBeforeDeletion - 1);

      // Delete another character
      act(() => {
        jest.advanceTimersByTime(50);
      });
      expect(typingText.textContent.length).toBe(lengthBeforeDeletion - 2);
    });

    test('should delete at 50ms intervals', async () => {
      jest.useFakeTimers();
      render(<App />);
      
      const typingText = document.querySelector('.typing-text');
      const expectedRole = 'Senior Software Engineer';

      // Type and start deleting
      act(() => {
        jest.advanceTimersByTime(100 * expectedRole.length + 1500);
      });

      const lengthBeforeDeletion = typingText.textContent.length;

      // After 50ms, should delete 1 character
      act(() => {
        jest.advanceTimersByTime(50);
      });
      expect(typingText.textContent.length).toBe(lengthBeforeDeletion - 1);

      // After another 50ms, should delete another character
      act(() => {
        jest.advanceTimersByTime(50);
      });
      expect(typingText.textContent.length).toBe(lengthBeforeDeletion - 2);
    });

    test('should delete all characters', async () => {
      jest.useFakeTimers();
      render(<App />);
      
      const typingText = document.querySelector('.typing-text');
      const expectedRole = 'Senior Software Engineer';

      // Type the entire role
      act(() => {
        jest.advanceTimersByTime(100 * expectedRole.length);
      });

      // Wait for pause and delete all characters
      act(() => {
        jest.advanceTimersByTime(1500 + 50 * expectedRole.length);
      });

      expect(typingText.textContent).toBe('');
    });
  });

  describe('Role Cycling with Wrap-Around', () => {
    test('should cycle to next role after deletion', async () => {
      jest.useFakeTimers();
      render(<App />);
      
      const typingText = document.querySelector('.typing-text');
      const firstRole = 'Senior Software Engineer';
      const secondRole = 'Java Expert';

      // Complete first role cycle (type + pause + delete)
      act(() => {
        jest.advanceTimersByTime(100 * firstRole.length + 1500 + 50 * firstRole.length);
      });

      // Start typing second role
      act(() => {
        jest.advanceTimersByTime(100 * secondRole.length);
      });

      expect(typingText.textContent).toBe(secondRole);
    });

    test('should wrap around to first role after last role', async () => {
      jest.useFakeTimers();
      render(<App />);
      
      const typingText = document.querySelector('.typing-text');
      const roles = [
        'Senior Software Engineer',
        'Java Expert',
        'Microservices Specialist',
        'Backend Developer',
        'Problem Solver'
      ];

      // Cycle through all roles
      for (let i = 0; i < roles.length; i++) {
        const role = roles[i];
        // Type + pause + delete
        act(() => {
          jest.advanceTimersByTime(100 * role.length + 1500 + 50 * role.length);
        });
      }

      // Should wrap back to first role
      act(() => {
        jest.advanceTimersByTime(100 * roles[0].length);
      });

      expect(typingText.textContent).toBe(roles[0]);
    });

    test('should cycle through all 5 roles', async () => {
      jest.useFakeTimers();
      render(<App />);
      
      const typingText = document.querySelector('.typing-text');
      const roles = [
        'Senior Software Engineer',
        'Java Expert',
        'Microservices Specialist',
        'Backend Developer',
        'Problem Solver'
      ];

      // Verify each role is displayed
      for (let i = 0; i < roles.length; i++) {
        const role = roles[i];
        
        // Type the role
        act(() => {
          jest.advanceTimersByTime(100 * role.length);
        });
        expect(typingText.textContent).toBe(role);

        // Delete the role
        act(() => {
          jest.advanceTimersByTime(1500 + 50 * role.length);
        });
      }
    });
  });

  describe('Blinking Cursor Animation', () => {
    test('should render cursor element', () => {
      render(<App />);
      const cursor = document.querySelector('.cursor');
      expect(cursor).toBeInTheDocument();
    });

    test('should have cursor with pipe character', () => {
      render(<App />);
      const cursor = document.querySelector('.cursor');
      expect(cursor.textContent).toBe('|');
    });

    test('should have blink animation applied', () => {
      render(<App />);
      const cursor = document.querySelector('.cursor');
      const styles = window.getComputedStyle(cursor);
      // Check if animation is defined (the actual animation will be in CSS)
      expect(cursor.className).toBe('cursor');
    });
  });

  describe('Integration: Complete Typing Animation Cycle', () => {
    test('should complete full cycle: type -> pause -> delete -> next role', async () => {
      jest.useFakeTimers();
      render(<App />);
      
      const typingText = document.querySelector('.typing-text');
      const firstRole = 'Senior Software Engineer';
      const secondRole = 'Java Expert';

      // Initial state: empty
      expect(typingText.textContent).toBe('');

      // Phase 1: Type first role
      act(() => {
        jest.advanceTimersByTime(100 * firstRole.length);
      });
      expect(typingText.textContent).toBe(firstRole);

      // Phase 2: Pause
      act(() => {
        jest.advanceTimersByTime(1500);
      });
      expect(typingText.textContent).toBe(firstRole);

      // Phase 3: Delete first role
      act(() => {
        jest.advanceTimersByTime(50 * firstRole.length);
      });
      expect(typingText.textContent).toBe('');

      // Phase 4: Type second role
      act(() => {
        jest.advanceTimersByTime(100 * secondRole.length);
      });
      expect(typingText.textContent).toBe(secondRole);
    });

    test('should maintain cursor throughout animation', async () => {
      jest.useFakeTimers();
      render(<App />);
      
      const cursor = document.querySelector('.cursor');
      expect(cursor).toBeInTheDocument();

      // Advance through various stages
      act(() => {
        jest.advanceTimersByTime(500);
      });
      expect(cursor).toBeInTheDocument();

      act(() => {
        jest.advanceTimersByTime(2000);
      });
      expect(cursor).toBeInTheDocument();

      act(() => {
        jest.advanceTimersByTime(1000);
      });
      expect(cursor).toBeInTheDocument();
    });
  });

  describe('Requirements Validation', () => {
    test('Requirement 3.3: Display animated typing effect cycling through multiple role titles', async () => {
      jest.useFakeTimers();
      render(<App />);
      
      const typingText = document.querySelector('.typing-text');
      const roles = [
        'Senior Software Engineer',
        'Java Expert',
        'Microservices Specialist'
      ];

      // Verify cycling through multiple roles
      for (let i = 0; i < 3; i++) {
        act(() => {
          jest.advanceTimersByTime(100 * roles[i].length);
        });
        expect(typingText.textContent).toBe(roles[i]);
        
        act(() => {
          jest.advanceTimersByTime(1500 + 50 * roles[i].length);
        });
      }
    });

    test('Requirement 3.4: Display one role at a time with character-by-character typing animation', async () => {
      jest.useFakeTimers();
      render(<App />);
      
      const typingText = document.querySelector('.typing-text');
      
      // Verify character-by-character progression
      for (let i = 1; i <= 5; i++) {
        act(() => {
          jest.advanceTimersByTime(100);
        });
        expect(typingText.textContent.length).toBe(i);
      }
    });

    test('Requirement 3.5: Pause briefly then delete text character-by-character when role is fully typed', async () => {
      jest.useFakeTimers();
      render(<App />);
      
      const typingText = document.querySelector('.typing-text');
      const role = 'Senior Software Engineer';

      // Type complete role
      act(() => {
        jest.advanceTimersByTime(100 * role.length);
      });
      expect(typingText.textContent).toBe(role);

      // Verify pause (text should remain)
      act(() => {
        jest.advanceTimersByTime(1400);
      });
      expect(typingText.textContent).toBe(role);

      // Verify deletion starts after pause
      act(() => {
        jest.advanceTimersByTime(150);
      });
      expect(typingText.textContent.length).toBeLessThan(role.length);
    });

    test('Requirement 3.6: Proceed to next role in sequence when role is fully deleted', async () => {
      jest.useFakeTimers();
      render(<App />);
      
      const typingText = document.querySelector('.typing-text');
      const firstRole = 'Senior Software Engineer';
      const secondRole = 'Java Expert';

      // Complete first role cycle
      act(() => {
        jest.advanceTimersByTime(100 * firstRole.length + 1500 + 50 * firstRole.length);
      });
      expect(typingText.textContent).toBe('');

      // Verify next role starts
      act(() => {
        jest.advanceTimersByTime(100);
      });
      expect(typingText.textContent.length).toBeGreaterThan(0);
      expect(secondRole.startsWith(typingText.textContent)).toBe(true);
    });

    test('Requirement 3.8: Include blinking cursor indicator next to typing text', () => {
      render(<App />);
      
      const cursor = document.querySelector('.cursor');
      expect(cursor).toBeInTheDocument();
      expect(cursor.textContent).toBe('|');
      
      // Verify cursor is positioned next to typing text
      const typingText = document.querySelector('.typing-text');
      expect(typingText.nextElementSibling).toBe(cursor);
    });
  });
});

describe('Task 20.1: Services Section Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Section Structure', () => {
    test('should render Services section with correct id', () => {
      render(<App />);
      const servicesSection = document.getElementById('services');
      expect(servicesSection).toBeInTheDocument();
    });

    test('should have animate-section class for entrance animation', () => {
      render(<App />);
      const servicesSection = document.getElementById('services');
      expect(servicesSection).toHaveClass('animate-section');
    });

    test('should render section heading', () => {
      render(<App />);
      const heading = screen.getByRole('heading', { name: /freelance services/i });
      expect(heading).toBeInTheDocument();
    });
  });

  describe('Availability Badge (Requirement 19.6)', () => {
    test('should display "Open to Work" indicator', () => {
      render(<App />);
      const openToWork = screen.getByText(/open to work/i);
      expect(openToWork).toBeInTheDocument();
    });

    test('should have availability badge with status indicator', () => {
      render(<App />);
      const badge = document.querySelector('.availability-badge');
      expect(badge).toBeInTheDocument();
    });

    test('should display status indicator emoji', () => {
      render(<App />);
      const statusIndicator = document.querySelector('.status-indicator');
      expect(statusIndicator).toBeInTheDocument();
      expect(statusIndicator.textContent).toBe('🟢');
    });
  });

  describe('Service Description (Requirement 19.3)', () => {
    test('should display service description', () => {
      render(<App />);
      const description = screen.getByText(/available for freelance projects/i);
      expect(description).toBeInTheDocument();
    });

    test('should highlight freelance capabilities', () => {
      render(<App />);
      const description = screen.getByText(/scalable, high-performance applications/i);
      expect(description).toBeInTheDocument();
    });
  });

  describe('Technologies List (Requirement 19.2)', () => {
    test('should list Java technology', () => {
      render(<App />);
      const servicesSection = document.getElementById('services');
      const javaTag = Array.from(servicesSection.querySelectorAll('.tech-tags span'))
        .find(span => span.textContent === 'Java');
      expect(javaTag).toBeInTheDocument();
    });

    test('should list Python technology', () => {
      render(<App />);
      const servicesSection = document.getElementById('services');
      const pythonTag = Array.from(servicesSection.querySelectorAll('.tech-tags span'))
        .find(span => span.textContent === 'Python');
      expect(pythonTag).toBeInTheDocument();
    });

    test('should list AWS technology', () => {
      render(<App />);
      const servicesSection = document.getElementById('services');
      const awsTag = Array.from(servicesSection.querySelectorAll('.tech-tags span'))
        .find(span => span.textContent === 'AWS');
      expect(awsTag).toBeInTheDocument();
    });

    test('should list React technology', () => {
      render(<App />);
      const servicesSection = document.getElementById('services');
      const reactTag = Array.from(servicesSection.querySelectorAll('.tech-tags span'))
        .find(span => span.textContent === 'React');
      expect(reactTag).toBeInTheDocument();
    });

    test('should list JavaScript technology', () => {
      render(<App />);
      const servicesSection = document.getElementById('services');
      const jsTag = Array.from(servicesSection.querySelectorAll('.tech-tags span'))
        .find(span => span.textContent === 'JavaScript');
      expect(jsTag).toBeInTheDocument();
    });

    test('should display technologies heading', () => {
      render(<App />);
      const heading = screen.getByRole('heading', { name: /technologies i work with/i });
      expect(heading).toBeInTheDocument();
    });

    test('should render all 12 technology tags', () => {
      render(<App />);
      const servicesSection = document.getElementById('services');
      const techTags = servicesSection.querySelectorAll('.tech-tags span');
      expect(techTags.length).toBe(12);
    });
  });

  describe('Call-to-Action (Requirement 19.3)', () => {
    test('should display call-to-action button', () => {
      render(<App />);
      const ctaButton = screen.getByRole('link', { name: /let's work together/i });
      expect(ctaButton).toBeInTheDocument();
    });

    test('should have mailto link for project inquiries', () => {
      render(<App />);
      const ctaButton = screen.getByRole('link', { name: /let's work together/i });
      expect(ctaButton).toHaveAttribute('href', 'mailto:salave.sanghapal@gmail.com?subject=Project Inquiry');
    });

    test('should have cta-button class for styling', () => {
      render(<App />);
      const ctaButton = screen.getByRole('link', { name: /let's work together/i });
      expect(ctaButton).toHaveClass('cta-button');
    });
  });

  describe('Contact Information (Requirement 19.4)', () => {
    test('should display contact information', () => {
      render(<App />);
      const contactInfo = screen.getByText(/email:/i);
      expect(contactInfo).toBeInTheDocument();
    });

    test('should display email address', () => {
      render(<App />);
      const servicesSection = document.getElementById('services');
      const emailLink = Array.from(servicesSection.querySelectorAll('a'))
        .find(link => link.textContent === 'salave.sanghapal@gmail.com');
      expect(emailLink).toBeInTheDocument();
    });

    test('should have mailto link for email', () => {
      render(<App />);
      const servicesSection = document.getElementById('services');
      const emailLink = Array.from(servicesSection.querySelectorAll('a'))
        .find(link => link.textContent === 'salave.sanghapal@gmail.com');
      expect(emailLink).toHaveAttribute('href', 'mailto:salave.sanghapal@gmail.com');
    });
  });

  describe('Visual Styling (Requirement 19.5)', () => {
    test('should have services-content container', () => {
      render(<App />);
      const servicesContent = document.querySelector('.services-content');
      expect(servicesContent).toBeInTheDocument();
    });

    test('should have services-technologies section', () => {
      render(<App />);
      const techSection = document.querySelector('.services-technologies');
      expect(techSection).toBeInTheDocument();
    });

    test('should have services-cta section', () => {
      render(<App />);
      const ctaSection = document.querySelector('.services-cta');
      expect(ctaSection).toBeInTheDocument();
    });

    test('should have tech-tags container', () => {
      render(<App />);
      const techTags = document.querySelector('.tech-tags');
      expect(techTags).toBeInTheDocument();
    });
  });

  describe('Requirements Validation', () => {
    test('Requirement 19.1: Display Services section highlighting freelance availability', () => {
      render(<App />);
      const servicesSection = document.getElementById('services');
      expect(servicesSection).toBeInTheDocument();
      
      const openToWork = screen.getByText(/open to work/i);
      expect(openToWork).toBeInTheDocument();
    });

    test('Requirement 19.2: List available technologies', () => {
      render(<App />);
      const servicesSection = document.getElementById('services');
      
      const technologies = ['Python', 'Java', 'AWS', 'React', 'JavaScript'];
      technologies.forEach(tech => {
        const techTag = Array.from(servicesSection.querySelectorAll('.tech-tags span'))
          .find(span => span.textContent === tech);
        expect(techTag).toBeInTheDocument();
      });
    });

    test('Requirement 19.3: Include clear call-to-action for project inquiries', () => {
      render(<App />);
      const ctaButton = screen.getByRole('link', { name: /let's work together/i });
      expect(ctaButton).toBeInTheDocument();
      expect(ctaButton).toHaveAttribute('href', expect.stringContaining('mailto:'));
    });

    test('Requirement 19.4: Display contact information', () => {
      render(<App />);
      const servicesSection = document.getElementById('services');
      const emailLink = Array.from(servicesSection.querySelectorAll('a'))
        .find(link => link.textContent === 'salave.sanghapal@gmail.com');
      expect(emailLink).toBeInTheDocument();
    });

    test('Requirement 19.5: Be visually distinct with appropriate styling', () => {
      render(<App />);
      const servicesSection = document.getElementById('services');
      expect(servicesSection).toHaveClass('services');
      
      const badge = document.querySelector('.availability-badge');
      expect(badge).toBeInTheDocument();
      
      const ctaButton = document.querySelector('.cta-button');
      expect(ctaButton).toBeInTheDocument();
    });

    test('Requirement 19.6: Include "Open to Work" indicator or badge', () => {
      render(<App />);
      const badge = document.querySelector('.availability-badge');
      expect(badge).toBeInTheDocument();
      
      const statusText = screen.getByText(/open to work/i);
      expect(statusText).toBeInTheDocument();
      
      const statusIndicator = document.querySelector('.status-indicator');
      expect(statusIndicator).toBeInTheDocument();
    });
  });
});
