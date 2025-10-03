import { memo } from 'react';
import { type Cell, type Coord } from '@/lib/gridUtils';

type MazeCellProps = Cell & {
  start: Coord;
  end: Coord;
};

export default memo(
  function MazeCell({ row, col, isWall, start, end }: MazeCellProps) {
    const cellColor = () => {
      if (row === start.row && col === start.col) return 'bg-emerald-400';
      if (row === end.row && col === end.col) return 'bg-amber-600';
      return isWall ? 'bg-gray-800' : 'bg-white';
    };

    return <div className={`h-5 w-5 border border-gray-300 ${cellColor()}`} />;
  },
  (prevProps, nextProps) => prevProps.isWall === nextProps.isWall,
);
