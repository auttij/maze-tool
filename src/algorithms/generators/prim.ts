import { createMazeGenerator } from '../MazeGenerator';
import { dirs, initGrid, inBounds, unvisited, carveWall } from '@/lib/gridUtils';
import { registerMazeGenerator } from '../index';

export const PrimGenerator = createMazeGenerator(function* (rows, cols) {
  const grid = initGrid(rows, cols);
  const walls: [number, number, number, number][] = [];

  // start in random cell
  const startR = Math.floor(Math.random() * (rows - 1));
  const startC = Math.floor(Math.random() * (cols - 1));

  const addWalls = (r: number, c: number) => {
    for (const [dr, dc] of dirs) {
      const [nr, nc] = [r + dr, c + dc];
      if (inBounds(grid, nr, nc) && unvisited(grid[nr][nc])) {
        walls.push([r, c, nr, nc]);
      }
    }
  };

  addWalls(startR, startC);

  while (walls.length) {
    const idx = Math.floor(Math.random() * walls.length);
    const [r, c, nr, nc] = walls.splice(idx, 1)[0];

    if (unvisited(grid[nr][nc])) {
      carveWall(grid[r][c], grid[nr][nc]);
      yield { type: 'carve', from: [r, c], to: [nr, nc] };
      addWalls(nr, nc);
    }
  }
});

registerMazeGenerator("Prim's algorithm", PrimGenerator);
