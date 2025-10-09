import MazeGrid from '@/components/maze/MazeGrid';
import { PlaybackControls } from '@/components/control-panel/PlaybackControls';
import { type Coord } from './lib/gridUtils';
import { useMaze } from '@/hooks/useMaze';
import { useState } from 'react';

function App() {
  const gridSize = 20;
  const startPos: Coord = { row: 0, col: 0 };
  const endPos: Coord = { row: gridSize, col: gridSize };
  const [speed, setSpeed] = useState(10);

  const { grid, generate, start, stop, step, reset, isRunning } = useMaze(
    gridSize + 1,
    gridSize + 1,
    speed,
    'dfs',
  );
  const mazeProps = { grid, start: startPos, end: endPos };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      {grid.length > 0 && <MazeGrid {...mazeProps} />}

      <PlaybackControls
        isRunning={isRunning}
        generate={generate}
        onPlay={start}
        onPause={stop}
        onStep={step}
        onReset={reset}
        speed={speed}
        onSpeedChange={setSpeed}
      />
    </div>
  );
}

export default App;
