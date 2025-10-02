export type Cell = {
  row: number;
  col: number;
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
