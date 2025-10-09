import { describe, it, expect, beforeEach } from 'vitest';
import { PrimGenerator } from '@/algorithms/generators/prim';
import { type Cell } from '@/lib/gridUtils';

describe('DFS Maze Generator', () => {
  const prim = PrimGenerator;
  let maze: Cell[][];

  beforeEach(() => {
    maze = prim.generate(10, 10);
  });

  it('should create maze where each cell has removed wall', () => {
    maze.forEach((row) => {
      row.forEach(({ walls }) => {
        const { n, e, s, w } = walls;
        expect(n && e && s && w).toBe(false);
      });
    });
  });
});
