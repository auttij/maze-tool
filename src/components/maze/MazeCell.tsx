import { memo } from 'react';
import { type Cell, type Coord } from '@/lib/gridUtils';

type MazeCellProps = Cell & {
  start: Coord;
  end: Coord;
};

export default memo(
  function MazeCell({ row, col, walls, start, end }: MazeCellProps) {
    const cellColor = () => {
      if (row === start.row && col === start.col) return 'bg-emerald-400';
      if (row === end.row && col === end.col) return 'bg-amber-600';
      const { n, e, w, s } = walls;
      if (n && e && s && w) return 'bg-gray-700';
      return 'bg-white';
    };

    const borders = () => {
      const out = [];
      const { n, e, w, s } = walls;
      if (n) out.push('border-t-gray-800');
      if (e) out.push('border-r-gray-800');
      if (s) out.push('border-b-gray-800');
      if (w) out.push('border-l-gray-800');
      return out.join(' ');
    };

    return <div className={`h-5 w-5 border-2 ${cellColor()} ${borders()}`} />;
  },
  ({ walls: pw }, { walls: nw }) => pw.n === nw.n && pw.e === nw.e && pw.s === nw.s && pw.w && nw.w,
);
