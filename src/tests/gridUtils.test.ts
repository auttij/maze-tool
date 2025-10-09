import { initGrid, inBounds, carveWall, type Cell } from '@/lib/gridUtils';
import { expect, it, describe, beforeEach } from 'vitest';

describe('initGrid method', () => {
  it('should create an array with correct amount of rows', () => {
    const g = initGrid(20, 1);
    expect(g.length).toBe(20);
  });

  it('should create an array with corret amount of columns', () => {
    const g = initGrid(2, 10);
    g.forEach((row) => {
      expect(row.length).toBe(10);
    });
  });

  it('should create cells with each wall value is true', () => {
    const g = initGrid(5, 5);
    g.forEach((row) => {
      row.forEach(({ walls }) => {
        const { n, e, s, w } = walls;
        expect(n && e && s && w).toBe(true);
      });
    });
  });
});

describe('inBounds method', () => {
  const grid = initGrid(5, 5);

  it('should return true for values within grid', () => {
    const coords = [
      [0, 0],
      [0, 4],
      [4, 0],
      [4, 4],
      [2, 2],
    ];

    coords.forEach(([r, c]) => {
      expect(inBounds(grid, r, c)).toBe(true);
    });
  });

  it('should return false for values outside grid', () => {
    const coords = [
      [-1, 0],
      [0, -1],
      [5, 0],
      [0, 5],
      [5, 5],
      [100, 1000],
    ];

    coords.forEach(([r, c]) => {
      expect(inBounds(grid, r, c)).toBe(false);
    });
  });
});

describe('carveWall method', () => {
  let grid: Cell[][];
  let cell: Cell;

  beforeEach(() => {
    grid = initGrid(5, 5);
    cell = grid[2][2];
  });

  describe('should carve walls correctly for neighbor', () => {
    it('north', () => {
      const nei = grid[1][2];

      carveWall(cell, nei);
      expect(cell.walls.n).toBe(false);
      expect(nei.walls.s).toBe(false);
    });

    it('east', () => {
      const nei = grid[2][3];

      carveWall(cell, nei);
      expect(cell.walls.e).toBe(false);
      expect(nei.walls.w).toBe(false);
    });

    it('south', () => {
      const nei = grid[3][2];

      carveWall(cell, nei);
      expect(cell.walls.s).toBe(false);
      expect(nei.walls.n).toBe(false);
    });

    it('south', () => {
      const nei = grid[2][1];

      carveWall(cell, nei);
      expect(cell.walls.w).toBe(false);
      expect(nei.walls.e).toBe(false);
    });
  });

  it('should carve walls correctly for multiple neighbors', () => {
    const nei1 = grid[1][2]; // North
    const nei2 = grid[2][1]; // West

    carveWall(cell, nei1);
    carveWall(cell, nei2);

    expect(cell.walls.n).toBe(false);
    expect(cell.walls.e).toBe(true);
    expect(cell.walls.s).toBe(true);
    expect(cell.walls.w).toBe(false);
  });
});
