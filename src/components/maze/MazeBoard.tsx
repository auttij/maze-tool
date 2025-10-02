import { type Cell, type Coord } from '@/lib/gridUtils';
import MazeGrid from './MazeGrid';

type MazeBoardProps = {
  grid: Cell[][];
  start: Coord;
  end: Coord;
};

export function MazeBoard(props: MazeBoardProps) {
  return <MazeGrid {...props} />;
}
