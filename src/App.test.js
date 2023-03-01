import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import * as utils from './utils';

test('renders Motus title', () => {
  render(<App />);
  const title = screen.getByText(/^Motus$/i);
  expect(title).toBeInTheDocument();
});

test('play an entire game', () => {
  utils.generateSolution = jest.fn(() => 'ABRICOTS');

  render(<App />);
  fireEvent.click(screen.getByTestId("start"));
  const board = screen.getByTestId('board');
  expect(board).toBeInTheDocument();
  const input = screen.getByTestId('input');
  fireEvent.change(input, {target: {value: "ABRICOTS"}});
  fireEvent.click(screen.getByTestId("valider"));
  const bravo = screen.getByText(/Bravo/i);
  expect(bravo).toBeInTheDocument();
});