import { type Cell, type MazeStep } from '@/lib/gridUtils';
import { createEmptyGrid } from '@/lib/gridUtils';

export function generateMazeDFS(rows: number, cols: number): Cell[][] {
  // Ensure odd dimensions (so paths have walls around them)
  if (rows % 2 === 0) rows++;
  if (cols % 2 === 0) cols++;

  const grid: Cell[][] = createEmptyGrid(rows, cols);

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

export function* generateMazeDFSAnimated(rows: number, cols: number): Generator<MazeStep> {
  if (rows % 2 === 0) rows++;
  if (cols % 2 === 0) cols++;

  const grid: Cell[][] = createEmptyGrid(rows, cols);

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
    const neighbors = dirs
      .map(([dr, dc]) => [r + dr, c + dc] as [number, number])
      .filter(([nr, nc]) => inBounds(nr, nc) && grid[nr][nc].isWall);

    if (neighbors.length > 0) {
      const [nr, nc] = neighbors[Math.floor(Math.random() * neighbors.length)];
      const [pr, pc] = [r + (nr - r) / 2, c + (nc - c) / 2];

      grid[pr][pc].isWall = false;
      grid[nr][nc].isWall = false;
      stack.push([nr, nc]);

      yield { type: 'carve', from: [r, c], to: [nr, nc] };
    } else {
      stack.pop();
      // yield { type: 'backtrack', cell: [r, c] };
    }
  }
}
