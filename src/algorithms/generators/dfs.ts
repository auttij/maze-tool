import { type Cell } from '@/lib/gridUtils';

export function generateMazeDFS(rows: number, cols: number): Cell[][] {
  // Start with all walls
  const grid: Cell[][] = Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => ({
      row: r,
      col: c,
      isWall: true,
    })),
  );

  function inBounds(r: number, c: number) {
    return r >= 0 && c >= 0 && r < rows && c < cols;
  }

  const dirs = [
    [0, 2],
    [0, -2],
    [2, 0],
    [-2, 0],
  ];

  function carve(r: number, c: number) {
    grid[r][c].isWall = false;

    for (const [dr, dc] of dirs.sort(() => Math.random() - 0.5)) {
      const nr = r + dr;
      const nc = c + dc;
      if (inBounds(nr, nc) && grid[nr][nc].isWall) {
        grid[r + dr / 2][c + dc / 2].isWall = false; // remove wall between
        carve(nr, nc);
      }
    }
  }

  carve(0, 0);
  return grid;
}
