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

test('click restart set a new game', () => {
  utils.generateSolution = jest.fn(() => 'CONCERTE');

  render(<App />);

  fireEvent.click(screen.getByTestId("start"));

  const input = screen.getByTestId('input');

  expect(screen.queryByTestId("filled-line")).toBeNull();

  fireEvent.change(input, {target: {value: "CAMARADE"}});
  fireEvent.click(screen.getByTestId("valider"));
  expect(screen.queryAllByTestId("filled-line").length).toEqual(1);

  fireEvent.change(input, {target: {value: "COMMUNES"}});
  fireEvent.click(screen.getByTestId("valider"));
  expect(screen.queryAllByTestId("filled-line").length).toEqual(2);

  fireEvent.click(screen.getByTestId("restart"));

  expect(screen.queryByTestId("filled-line")).toBeNull();
});
