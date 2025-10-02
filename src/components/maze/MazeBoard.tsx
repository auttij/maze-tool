import { type Cell } from '@/lib/gridUtils';
import MazeGrid from './MazeGrid';

type MazeBoardProps = {
  grid: Cell[][];
};

export function MazeBoard({ grid }: MazeBoardProps) {
  return <MazeGrid grid={grid} />;
}
