import { render, screen } from '@testing-library/react';
import App from './App';

test('renders business-focused header', () => {
  render(<App />);
  const headingElement = screen.getByText(/Websites, Google presence, and AI workflows/i);
  expect(headingElement).toBeInTheDocument();
});
