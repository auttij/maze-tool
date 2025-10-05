import { describe, it, expect } from 'vitest';
import { generateMazeDFSAnimated } from '@/algorithms/generators/dfs';

describe('DFS Maze Generator', () => {
  it('should generate a connected maze', () => {
    const gen = generateMazeDFSAnimated(11, 11);
    let last: any;
    for (const step of gen) last = step;

    expect(last).toBeDefined();
  });

  it('should carve each odd space', () => {
    const size = 20;
    const reachable: Record<string, boolean> = {};

    for (var y = 1; y < size; y += 2) {
      for (var x = 1; x < size; x += 2) {
        reachable[`${y}-${x}`] = false;
      }
    }

    const gen = generateMazeDFSAnimated(size, size);
    for (const step of gen) {
      if (step.type === 'carve') {
        const { from, to } = step;

        reachable[`${from[0]}-${from[1]}`] = true;
        reachable[`${to[0]}-${to[1]}`] = true;
      }
    }

    Object.entries(reachable).forEach(([key, val]) =>
      expect([key, val]).toStrictEqual([key, true]),
    );
  });
});
