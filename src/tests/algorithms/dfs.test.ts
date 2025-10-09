import { describe, it, expect, beforeEach } from 'vitest';
import { DFSGenerator } from '@/algorithms/generators/dfs';
import { type Cell } from '@/lib/gridUtils';

describe('DFS Maze Generator', () => {
  const dfs = DFSGenerator;
  let maze: Cell[][];

  beforeEach(() => {
    maze = dfs.generate(10, 10);
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
