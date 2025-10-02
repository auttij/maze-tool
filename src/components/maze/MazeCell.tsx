import { type Cell, type Coord } from '@/lib/gridUtils';

type MazeCellProps = {
  cell: Cell;
  start: Coord;
  end: Coord;
};

export default function MazeCell({ cell, start, end }: MazeCellProps) {
  const cellColor = () => {
    if (cell.row === start.row && cell.col === start.col) return 'bg-emerald-400';
    if (cell.row === end.row && cell.col === end.col) return 'bg-amber-600';
    return cell.isWall ? 'bg-gray-800' : 'bg-white';
  };

  return <div className={`h-5 w-5 border border-gray-300 ${cellColor()}`} />;
}
