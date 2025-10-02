export type Coord = {
  row: number;
  col: number;
};

export type Cell = Coord & {
  isWall: boolean;
};

export function createEmptyGrid(rows: number, cols: number): Cell[][] {
  return Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => ({
      row,
      col,
      isWall: false,
    })),
  );
}
