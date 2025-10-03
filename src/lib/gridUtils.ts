export type Coord = {
  row: number;
  col: number;
};

export type Cell = Coord & {
  isWall: boolean;
};

export type MazeStep =
  | { type: 'carve'; from: [number, number]; to: [number, number] }
  | { type: 'backtrack'; cell: [number, number] };

export function createEmptyGrid(rows: number, cols: number): Cell[][] {
  return Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => ({
      row,
      col,
      isWall: true,
    })),
  );
}
