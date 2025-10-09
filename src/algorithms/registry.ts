import type { MazeGenerator } from './MazeGenerator';

const registry = new Map<string, MazeGenerator>();

export function registerMazeGenerator(name: string, gen: MazeGenerator) {
  registry.set(name, gen);
}

export function getMazeGenerator(name: string): MazeGenerator {
  const gen = registry.get(name);
  if (!gen) throw new Error(`Unknown maze generator: ${name}`);
  return gen;
}

export function listMazeGenerators() {
  return Array.from(registry.keys());
}
