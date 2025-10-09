import { type Cell, carveWall, initGrid } from '@/lib/gridUtils';

export type MazeStep = {
  type: 'carve' | 'backtrack';
  from: [number, number];
  to: [number, number];
};

export interface MazeGenerator {
  generate: (rows: number, cols: number) => any;
  generateAnimated: (rows: number, cols: number) => Generator<MazeStep>;
}

export function createMazeGenerator(
  animatedFn: (rows: number, cols: number) => Generator<MazeStep>,
): MazeGenerator {
  return {
    generate(rows, cols) {
      const grid = initGrid(rows, cols);
      for (const step of animatedFn(rows, cols)) {
        applyStep(grid, step);
      }
      return grid;
    },
    generateAnimated: animatedFn,
  };
}

export function applyStep(grid: Cell[][], step: MazeStep): Cell[][] {
  if (step.type === 'carve') {
    const [r, c] = step.from;
    const [nr, nc] = step.to;

    const cell = grid[r][c];
    const neighbor = grid[nr][nc];
    carveWall(cell, neighbor);
  }
  return [...grid];
}
