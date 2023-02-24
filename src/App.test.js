import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Motus title', () => {
  render(<App />);
  const title = screen.getByText(/^Motus$/i);
  expect(title).toBeInTheDocument();
});
