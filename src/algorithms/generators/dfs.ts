import { type Cell } from '@/lib/gridUtils';

export function generateMazeDFS(rows: number, cols: number): Cell[][] {
  // Ensure odd dimensions (so paths have walls around them)
  if (rows % 2 === 0) rows++;
  if (cols % 2 === 0) cols++;

  // Start with all walls
  const grid: Cell[][] = Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => ({
      row: r,
      col: c,
      isWall: true,
    })),
  );

  const dirs = [
    [0, 2],
    [0, -2],
    [2, 0],
    [-2, 0],
  ];

  function inBounds(r: number, c: number) {
    return r > 0 && c > 0 && r < rows - 1 && c < cols - 1;
  }

  const stack: [number, number][] = [[1, 1]];
  grid[1][1].isWall = false;

  while (stack.length > 0) {
    const [r, c] = stack[stack.length - 1];

    // Find neighbors 2 cells away that are still walls
    const neighbors = dirs
      .map(([dr, dc]) => [r + dr, c + dc] as [number, number])
      .filter(([nr, nc]) => inBounds(nr, nc) && grid[nr][nc].isWall);

    if (neighbors.length > 0) {
      const [nr, nc] = neighbors[Math.floor(Math.random() * neighbors.length)];
      // Knock down wall between
      grid[r + (nr - r) / 2][c + (nc - c) / 2].isWall = false;
      grid[nr][nc].isWall = false;
      stack.push([nr, nc]);
    } else {
      stack.pop();
    }
  }

  return grid;
}

export function* generateMazeDFSAnimated(rows: number, cols: number): Generator<Cell[][]> {
  if (rows % 2 === 0) rows++;
  if (cols % 2 === 0) cols++;

  const grid: Cell[][] = Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => ({
      row: r,
      col: c,
      isWall: true,
    })),
  );

  const dirs = [
    [0, 2],
    [0, -2],
    [2, 0],
    [-2, 0],
  ];

  function inBounds(r: number, c: number) {
    return r > 0 && c > 0 && r < rows - 1 && c < cols - 1;
  }

  const stack: [number, number][] = [[1, 1]];
  grid[1][1].isWall = false;
  yield structuredClone(grid); // emit initial state

  while (stack.length > 0) {
    const [r, c] = stack[stack.length - 1];
    const neighbors = dirs
      .map(([dr, dc]) => [r + dr, c + dc] as [number, number])
      .filter(([nr, nc]) => inBounds(nr, nc) && grid[nr][nc].isWall);

    if (neighbors.length > 0) {
      const [nr, nc] = neighbors[Math.floor(Math.random() * neighbors.length)];
      grid[r + (nr - r) / 2][c + (nc - c) / 2].isWall = false;
      grid[nr][nc].isWall = false;
      stack.push([nr, nc]);
      yield structuredClone(grid); // emit after each carve step
    } else {
      stack.pop();
    }
  }
}
