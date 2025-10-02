import { type Cell } from '@/lib/gridUtils';

type MazeCellProps = {
  cell: Cell;
};

export default function MazeCell({ cell }: MazeCellProps) {
  return (
    <div className={`h-5 w-5 border border-gray-300 ${cell.isWall ? 'bg-gray-800' : 'bg-white'}`} />
  );
}
