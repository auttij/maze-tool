import MazeCell from './MazeCell';
import { type Cell } from '@/lib/gridUtils';

type MazeGridProps = {
  grid: Cell[][];
};

export default function MazeGrid({ grid }: MazeGridProps) {
  return (
    <div
      className="grid gap-0"
      style={{
        gridTemplateRows: `repeat(${grid.length}, 1fr)`,
        gridTemplateColumns: `repeat(${grid[0].length}, 1fr)`,
      }}
    >
      {grid.flat().map((cell) => (
        <MazeCell key={`${cell.row}-${cell.col}`} cell={cell} />
      ))}
    </div>
  );
}
