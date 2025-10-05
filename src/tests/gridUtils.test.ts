import { createEmptyGrid } from '@/lib/gridUtils';
import { expect, it, describe } from 'vitest';

describe('createEmptyGrid method', () => {
  it('should create an array with correct amount of rows', () => {
    const g = createEmptyGrid(20, 1);
    expect(g.length).toBe(20);
  });

  it('should create an array with corret amount of columns', () => {
    const g = createEmptyGrid(2, 10);
    g.forEach((row) => {
      expect(row.length).toBe(10);
    });
  });

  it('should create cells with Wall: true', () => {
    const g = createEmptyGrid(5, 5);
    g.forEach((row) => {
      expect(row.every((cell) => cell.isWall)).toBe(true);
    });
  });
});
