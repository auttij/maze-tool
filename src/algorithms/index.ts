import { DFSGenerator } from './generators/dfs';
import type { MazeGenerator } from './MazeGenerator';

export const mazeGenerators: Record<string, MazeGenerator> = {
  dfs: DFSGenerator,
};

export function getMazeGenerator(name: string): MazeGenerator {
  const gen = mazeGenerators[name];
  if (!gen) throw new Error(`Unknown generator: ${name}`);
  return gen;
}
