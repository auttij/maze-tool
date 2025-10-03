import { useEffect, useRef, useState } from 'react';
import { type Cell, type MazeStep, createEmptyGrid } from '@/lib/gridUtils';
import { generateMazeDFSAnimated } from '@/algorithms/generators/dfs';

export function useMaze(rows: number, cols: number, speed: number) {
  const [grid, setGrid] = useState(createEmptyGrid(rows, cols));
  const [history, setHistory] = useState<MazeStep[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const generatorRef = useRef<Generator<MazeStep>>(null);
  const intervalRef = useRef<number | null>(null);

  function applyStep(grid: Cell[][], step: MazeStep): Cell[][] {
    const newGrid = grid.map((row) => row.slice()); // shallow clone

    if (step.type === 'carve') {
      const [r, c] = step.from;
      const [nr, nc] = step.to;
      newGrid[r + (nr - r) / 2][c + (nc - c) / 2].isWall = false;
      newGrid[nr][nc].isWall = false;
    } else if (step.type === 'backtrack') {
      const [r, c] = step.cell;
      // newGrid[r][c].isBacktracked = true;
    }

    return newGrid;
  }

  function applyAndRecord(step: MazeStep) {
    setHistory((h) => [...h, step]);
    setGrid((g) => applyStep(g, step));
  }

  const reset = () => {
    setGrid(createEmptyGrid(rows, cols));
    generatorRef.current = null;
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const start = () => {
    if (!generatorRef.current) {
      reset();
      generatorRef.current = generateMazeDFSAnimated(rows, cols);
    }
    setIsRunning(true);
  };

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  };

  const step = () => {
    if (generatorRef.current) {
      const { value, done } = generatorRef.current.next();
      if (!done && value) {
        applyAndRecord(value);
      } else {
        generatorRef.current = null;
        stop();
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (isRunning && generatorRef.current) {
        const { value, done } = generatorRef.current!.next();

        if (done) {
          generatorRef.current = null;
          stop();
        } else {
          applyAndRecord(value);
        }
      }
    }, speed);

    intervalRef.current = timer;
    return () => clearInterval(timer);
  }, [isRunning, speed]);

  return { grid, start, stop, step, reset, isRunning };
}
