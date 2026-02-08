import { render, screen } from '@testing-library/react';
import App from './App';

describe('About Section - Task 6.1', () => {
  describe('Section Structure and Content', () => {
    it('should render the About section with correct id', () => {
      render(<App />);
      const aboutSection = document.querySelector('#about');
      expect(aboutSection).toBeInTheDocument();
    });

    it('should have the animate-section class for entrance animations', () => {
      render(<App />);
      const aboutSection = document.querySelector('#about');
      expect(aboutSection).toHaveClass('animate-section');
    });

    it('should display the section heading', () => {
      render(<App />);
      const heading = screen.getByRole('heading', { name: /about me/i });
      expect(heading).toBeInTheDocument();
    });
  });

  describe('Biographical Content - Requirement 6.1', () => {
    it('should display biographical information about the developer', () => {
      render(<App />);
      const aboutSection = document.querySelector('#about');
      expect(aboutSection).toHaveTextContent('Senior Software Engineer');
      expect(aboutSection).toHaveTextContent('backend and enterprise-grade technologies');
    });
  });

  describe('Current Role, Location, and Experience - Requirement 6.2', () => {
    it('should include current role information', () => {
      render(<App />);
      const aboutSection = document.querySelector('#about');
      expect(aboutSection).toHaveTextContent('Senior Software Engineer');
      expect(aboutSection).toHaveTextContent('Globant');
    });

    it('should include location information', () => {
      render(<App />);
      const aboutSection = document.querySelector('#about');
      expect(aboutSection).toHaveTextContent('Pune, Maharashtra, India');
    });

    it('should include years of experience', () => {
      render(<App />);
      const aboutSection = document.querySelector('#about');
      expect(aboutSection).toHaveTextContent(/over 7 years/i);
    });
  });

  describe('Certifications and Specializations - Requirement 6.3', () => {
    it('should include certification information', () => {
      render(<App />);
      const aboutSection = document.querySelector('#about');
      expect(aboutSection).toHaveTextContent('Google Cloud Certified Professional Cloud Architect');
      expect(aboutSection).toHaveTextContent('Associate Cloud Engineer');
    });

    it('should include specialization information', () => {
      render(<App />);
      const aboutSection = document.querySelector('#about');
      expect(aboutSection).toHaveTextContent('Java');
      expect(aboutSection).toHaveTextContent('Spring Boot');
      expect(aboutSection).toHaveTextContent('Docker');
      expect(aboutSection).toHaveTextContent('Kubernetes');
      expect(aboutSection).toHaveTextContent('microservices');
      expect(aboutSection).toHaveTextContent('cloud-native applications');
    });
  });

  describe('Text Formatting and Spacing - Requirement 6.4', () => {
    it('should display text in paragraph elements for proper formatting', () => {
      render(<App />);
      const aboutSection = document.querySelector('#about');
      const paragraphs = aboutSection.querySelectorAll('p');
      expect(paragraphs.length).toBeGreaterThanOrEqual(2);
    });

    it('should have the about class for proper styling', () => {
      render(<App />);
      const aboutSection = document.querySelector('#about');
      expect(aboutSection).toHaveClass('about');
    });
  });

  describe('Integration with Animation System', () => {
    it('should be observable by Intersection Observer for entrance animations', () => {
      render(<App />);
      const aboutSection = document.querySelector('#about');
      
      // Verify it has the animate-section class which makes it observable
      expect(aboutSection).toHaveClass('animate-section');
      
      // The animate-in class would be added by the Intersection Observer
      // when the section enters the viewport
    });
  });

  describe('Accessibility', () => {
    it('should use semantic section element', () => {
      render(<App />);
      const aboutSection = document.querySelector('section#about');
      expect(aboutSection).toBeInTheDocument();
      expect(aboutSection.tagName).toBe('SECTION');
    });

    it('should have a proper heading hierarchy', () => {
      render(<App />);
      const heading = screen.getByRole('heading', { name: /about me/i });
      expect(heading.tagName).toBe('H2');
    });
  });
});
