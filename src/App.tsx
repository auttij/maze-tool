import { useState } from 'react';
import { Button } from './components/ui/button';
import { generateMazeDFS } from '@/algorithms/generators/dfs';
import { MazeBoard } from '@/components/maze/MazeBoard';
import { type Coord } from './lib/gridUtils';

function App() {
  const [grid, setGrid] = useState(() => generateMazeDFS(21, 21));
  const gridSize = 20;
  const startPos: Coord = { row: 0, col: 0 };
  const endPos: Coord = { row: gridSize, col: gridSize };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      <MazeBoard grid={grid} start={startPos} end={endPos} />
      <Button onClick={() => setGrid(generateMazeDFS(gridSize + 1, gridSize + 1))}>
        Generate Maze
      </Button>
    </div>
  );
}

export default App;
