import { useState } from 'react';
import { Button } from './components/ui/button';
import { generateMazeDFS } from '@/algorithms/generators/dfs';
import { MazeBoard } from '@/components/maze/MazeBoard';

function App() {
  const [grid, setGrid] = useState(() => generateMazeDFS(21, 21));

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      <MazeBoard grid={grid} />
      <Button onClick={() => setGrid(generateMazeDFS(21, 21))}>Generate Maze</Button>
    </div>
  );
}

export default App;
