export const backward = (solution) => {
    if (solution.length !== 0) {
      // TODO: remove last index from solution
      //   setSolution(solution.pop());
    }
  };

  export const forward = (solution, static_solution) => {
    console.log(solution, static_solution)
    if (solution.length !== static_solution.length) {
      // TODO: append next step to solution
      // setSolution([...solution, staticSolution[solution.length]])
    }
  };