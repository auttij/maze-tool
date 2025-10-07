import { type Cell, type MazeStep } from '@/lib/gridUtils';
import { createEmptyGrid } from '@/lib/gridUtils';
import { dirs, carveWall } from '@/lib/gridUtils';

export function generateMazeDFS(rows: number, cols: number): Cell[][] {
  const grid: Cell[][] = createEmptyGrid(rows, cols);

  function inBounds(r: number, c: number) {
    return r >= 0 && c >= 0 && r < rows && c < cols;
  }

  const stack: [number, number][] = [[0, 0]];

  while (stack.length > 0) {
    const [r, c] = stack[stack.length - 1];

    const neighbors = dirs
      .map(([dr, dc]) => [r + dr, c + dc] as [number, number])
      .filter(([nr, nc]) => inBounds(nr, nc) && Object.values(grid[nr][nc].walls).every((x) => x));

    if (neighbors.length > 0) {
      const [nr, nc] = neighbors[Math.floor(Math.random() * neighbors.length)];
      const cell = grid[r][c];
      const neighbor = grid[nr][nc];
      carveWall(cell, neighbor);
      stack.push([nr, nc]);
    } else {
      stack.pop();
    }
  }

  return grid;
}

export function* generateMazeDFSAnimated(rows: number, cols: number): Generator<MazeStep> {
  const grid: Cell[][] = createEmptyGrid(rows, cols);

  function inBounds(r: number, c: number) {
    return r >= 0 && c >= 0 && r < rows && c < cols;
  }

  const stack: [number, number][] = [[0, 0]];

  while (stack.length > 0) {
    const [r, c] = stack[stack.length - 1];
    const neighbors = dirs
      .map(([dr, dc]) => [r + dr, c + dc] as [number, number])
      .filter(([nr, nc]) => inBounds(nr, nc) && Object.values(grid[nr][nc].walls).every((x) => x));

    if (neighbors.length > 0) {
      const [nr, nc] = neighbors[Math.floor(Math.random() * neighbors.length)];
      const cell = grid[r][c];
      const neighbor = grid[nr][nc];
      carveWall(cell, neighbor);

      stack.push([nr, nc]);

      yield { type: 'carve', from: [r, c], to: [nr, nc] };
    } else {
      stack.pop();
      // yield { type: 'backtrack', cell: [r, c] };
    }
  }
}
