import { initGrid } from '@/lib/gridUtils';
import { expect, it, describe } from 'vitest';

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

  it('should create cells with Wall: true', () => {
    const g = initGrid(5, 5);
    g.forEach((row) => {
      expect(row.every((cell) => cell.isWall)).toBe(true);
    });
  });
});
