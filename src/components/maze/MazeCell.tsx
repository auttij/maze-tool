import { memo } from 'react';
import { type Walls, type Coord } from '@/lib/gridUtils';

type MazeCellProps = Coord &
  Walls & {
    start: Coord;
    end: Coord;
  };

export default memo(
  function MazeCell({ row, col, n, e, s, w, start, end }: MazeCellProps) {
    const cellColor = () => {
      if (row === start.row && col === start.col) return 'bg-emerald-400';
      if (row === end.row && col === end.col) return 'bg-amber-600';
      if (n && e && s && w) return 'bg-black';
      return 'bg-white';
    };

    return (
      <div className={`relative h-5 w-5 border-0 ${cellColor()}`}>
        {n && <div className="absolute top-0 right-0 left-0 h-[2px] bg-black" />}
        {e && <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-black" />}
        {s && <div className="absolute right-0 bottom-0 left-0 h-[2px] bg-black" />}
        {w && <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-black" />}
      </div>
    );
  },
  (prev, next) => prev.n === next.n && prev.e === next.e && prev.s === next.s && prev.w === next.w,
);
