import { render, screen } from '@testing-library/react';
import App from './App';

test('renders portfolio header', () => {
  render(<App />);
  const headingElement = screen.getByText(/Hi, I'm Sanghapal Salave/i);
  expect(headingElement).toBeInTheDocument();
});
