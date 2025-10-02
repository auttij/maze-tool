import { type Cell, type Coord } from '@/lib/gridUtils';
import MazeCell from './MazeCell';

type MazeGridProps = {
  grid: Cell[][];
  start: Coord;
  end: Coord;
};

export default function MazeGrid({ grid, start, end }: MazeGridProps) {
  return (
    <div
      className="grid gap-0"
      style={{
        gridTemplateRows: `repeat(${grid.length}, 1fr)`,
        gridTemplateColumns: `repeat(${grid[0].length}, 1fr)`,
      }}
    >
      {grid.flat().map((cell) => (
        <MazeCell key={`${cell.row}-${cell.col}`} cell={cell} start={start} end={end} />
      ))}
    </div>
  );
}
