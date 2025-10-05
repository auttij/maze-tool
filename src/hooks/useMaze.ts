import { useEffect, useRef, useState, useCallback } from 'react';
import { type Cell, type MazeStep, createEmptyGrid } from '@/lib/gridUtils';
import { generateMazeDFSAnimated } from '@/algorithms/generators/dfs';

export function useMaze(rows: number, cols: number, speed: number) {
  const [version, setVersion] = useState(0); // force re-render counter
  const [history, setHistory] = useState<MazeStep[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const gridRef = useRef<Cell[][]>(createEmptyGrid(rows, cols));
  const generatorRef = useRef<Generator<MazeStep>>(null);
  const intervalRef = useRef<NodeJS.Timeout>(null);

  const forceUpdate = useCallback(() => {
    setVersion((v) => v + 1);
  }, []);

  function applyStep(grid: Cell[][], step: MazeStep) {
    if (step.type === 'carve') {
      const [r, c] = step.from;
      const [nr, nc] = step.to;
      grid[r + (nr - r) / 2][c + (nc - c) / 2].isWall = false;
      grid[nr][nc].isWall = false;
    }
  }

  function applyAndRecord(step: MazeStep) {
    setHistory((h) => [...h, step]);
    applyStep(gridRef.current, step);
  }

  const reset = () => {
    gridRef.current = createEmptyGrid(rows, cols);
    setHistory([]);
    generatorRef.current = null;
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    forceUpdate();
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

  return {
    grid: gridRef.current,
    start,
    stop,
    step,
    reset,
    isRunning,
  };
}
