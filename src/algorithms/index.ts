import { registerMazeGenerator, getMazeGenerator, listMazeGenerators } from './registry';

import.meta.glob('./generators/*.ts', { eager: true });

export { registerMazeGenerator, getMazeGenerator, listMazeGenerators };
