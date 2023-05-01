import { render, screen, fireEvent, act } from '@testing-library/react';
import { keyboard } from '@testing-library/user-event/dist/keyboard';
import App from './App';
import * as utils from './utils';

beforeEach(() => {
  jest.useFakeTimers()
})

afterEach(() => {
  jest.runOnlyPendingTimers()
  jest.useRealTimers()
})

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

test('display a line with errors when player inputs incorrectly spelled word', () => {
  utils.generateSolution = jest.fn(() => 'ABRICOTS');

  render(<App />);
  fireEvent.click(screen.getByTestId("start"));
  const board = screen.getByTestId('board');
  expect(board).toBeInTheDocument();
  const input = screen.getByTestId('input');
  fireEvent.change(input, {target: {value: "ABRIOTTS"}});
  fireEvent.click(screen.getByTestId("valider"));
  const firstLine = board.getElementsByClassName('columns')[0];
  const lettersWithError = firstLine.getElementsByClassName('error');
  expect(lettersWithError.length).toEqual(8);
});

test('click restart to begin a new game', () => {
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

test('timer is counting 7 seconds', () => {
  utils.generateSolution = jest.fn(() => 'CONCERTE');

  render(<App />);

  fireEvent.click(screen.getByTestId("start"));

  act(() => jest.advanceTimersByTime(7000));

  const input = screen.getByTestId('input');

  fireEvent.change(input, { target: { value: "CONCERTE" } });
  fireEvent.click(screen.getByTestId("valider"));

  act(() => jest.advanceTimersByTime(5000));

  const timer = screen.getByTestId('timer');
  expect(timer).toContainHTML("0:07");
});

test ('show solution button open modal with solution', () => {
  utils.generateSolution = jest.fn(() => 'PROPOSER');

  render(<App />);

  fireEvent.click(screen.getByTestId("start"));

  let solution = screen.queryByText(/^PROPOSER$/i);
  expect(solution).toBeNull();

  fireEvent.click(screen.getByTestId("show-solution"));

  solution = screen.getByText(/^PROPOSER$/i);
  expect(solution).toBeInTheDocument();

  keyboard('{Escape}');

  solution = screen.queryByText(/^PROPOSER$/i);
  expect(solution).toBeNull();

  const button = screen.getByTestId("show-solution");
  expect(button).not.toBeDisabled()

  const input = screen.getByTestId('input');
  fireEvent.change(input, { target: { value: "PROPOSER" } });
  fireEvent.click(screen.getByTestId("valider"));

  expect(button).toBeDisabled()
});