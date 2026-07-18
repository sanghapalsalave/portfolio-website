import { render, screen } from '@testing-library/react';
import App from './App';

test('renders business-focused header', () => {
  render(<App />);
  const headingElement = screen.getByText(/I help small businesses look professional online/i);
  expect(headingElement).toBeInTheDocument();
});
