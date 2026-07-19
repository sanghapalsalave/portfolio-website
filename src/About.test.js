import { render, screen } from '@testing-library/react';
import App from './App';

describe('Founder credibility section', () => {
  it('renders the founder section with animation styling', () => {
    render(<App />);
    const founderSection = document.querySelector('section#founder');

    expect(founderSection).toBeInTheDocument();
    expect(founderSection).toHaveClass('animate-section');
  });

  it('keeps personal information secondary to the business offer', () => {
    render(<App />);
    const founderSection = document.querySelector('#founder');

    expect(founderSection).toHaveTextContent('Built by Sanghapal Salave');
    expect(founderSection).toHaveTextContent('senior software engineer');
    expect(founderSection).toHaveTextContent('Google Cloud certified');
  });

  it('uses a proper h2 heading for the founder section', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { name: /built by sanghapal salave/i });

    expect(heading.tagName).toBe('H2');
  });

  it('renders the business-first hero before founder credibility', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', {
        name: /websites, google presence, and ai workflows for small businesses/i
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/Salave Digital Studio helps local businesses/i)).toBeInTheDocument();
  });
});
