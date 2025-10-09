import { type Cell } from '@/lib/gridUtils';
import { type MazeStep, createMazeGenerator } from '@/algorithms/MazeGenerator';
import { initGrid, dirs, carveWall, inBounds, unvisited } from '@/lib/gridUtils';

export const DFSGenerator = createMazeGenerator(function* (rows, cols): Generator<MazeStep> {
  const grid: Cell[][] = initGrid(rows, cols);

  const stack: [number, number][] = [[0, 0]];

  while (stack.length > 0) {
    const [r, c] = stack[stack.length - 1];
    const neighbors = dirs
      .map(([dr, dc]) => [r + dr, c + dc] as [number, number])
      .filter(([nr, nc]) => inBounds(grid, nr, nc) && unvisited(grid[nr][nc]));

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
});

registerMazeGenerator('Depth-first search', DFSGenerator);
