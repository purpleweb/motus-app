import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders Motus title', () => {
  render(<App />);
  const title = screen.getByText(/^Motus$/i);
  expect(title).toBeInTheDocument();
});


test('play an entire game', () => {
  render(<App />);
  fireEvent.click(screen.getByTestId("start"));
  const board = screen.getByTestId('board');
  expect(board).toBeInTheDocument();
});