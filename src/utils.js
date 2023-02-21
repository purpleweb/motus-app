
export function computeHints(bid, solution) {
  let validHints = Array(8).fill(false);
  let wrongPlacedHints = Array(8).fill(false);
  let usedCharInSolution = Array(8).fill(false);
  let usedCharInBid = Array(8).fill(false);

  for (var index = 0; index < bid.length; index++) {
    if (bid[index] === solution[index]) {
      usedCharInSolution[index] = true;
      usedCharInBid[index] = true;
      validHints[index] = true;
    }
  }

  for (let bidIndex = 0; bidIndex < bid.length; bidIndex++) { // bid
    for (let solutionIndex = 0; solutionIndex < solution.length; solutionIndex++) { // solution
      if (!usedCharInBid[bidIndex]) {
        if (!usedCharInSolution[solutionIndex]) {
          if (bid[bidIndex] === solution[solutionIndex]) {
            usedCharInBid[bidIndex] = true;
            usedCharInSolution[solutionIndex] = true;
            wrongPlacedHints[bidIndex] = true;
          }
        }
      }
    }
  }

  return [validHints, wrongPlacedHints];
}