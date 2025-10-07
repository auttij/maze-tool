export type Coord = {
  row: number;
  col: number;
};

export type Walls = {
  n: boolean;
  e: boolean;
  s: boolean;
  w: boolean;
};

export type Cell = Coord & {
  walls: Walls;
};

export type MazeStep =
  | { type: 'carve'; from: [number, number]; to: [number, number] }
  | { type: 'backtrack'; cell: [number, number] };

export const dirs = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

export function createEmptyGrid(rows: number, cols: number): Cell[][] {
  return Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => ({
      row,
      col,
      walls: { n: true, e: true, s: true, w: true },
    })),
  );
}

export function carveWall(cell: Cell, neighbor: Cell) {
  const dr = neighbor.row - cell.row;
  const dc = neighbor.col - cell.col;

  if (dr === -1) {
    // neighbor above
    cell.walls.n = false;
    neighbor.walls.s = false;
  } else if (dr === 1) {
    // neighbor below
    cell.walls.s = false;
    neighbor.walls.n = false;
  } else if (dc === -1) {
    // neighbor left
    cell.walls.w = false;
    neighbor.walls.e = false;
  } else if (dc === 1) {
    // neighbor right
    cell.walls.e = false;
    neighbor.walls.w = false;
  }
}
