import { useEffect, useRef, useState } from 'react';
import { type Cell, type MazeStep, createEmptyGrid } from '@/lib/gridUtils';
import { generateMazeDFSAnimated, generateMazeDFS } from '@/algorithms/generators/dfs';

export function useMaze(rows: number, cols: number, speed: number) {
  const [grid, setGrid] = useState(createEmptyGrid(rows, cols));
  const [history, setHistory] = useState<MazeStep[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const generatorRef = useRef<Generator<MazeStep>>(null);
  const intervalRef = useRef<NodeJS.Timeout>(null);

  function applyStep(grid: Cell[][], step: MazeStep): Cell[][] {
    if (step.type === 'carve') {
      const [r, c] = step.from;
      const [nr, nc] = step.to;
      grid[r + (nr - r) / 2][c + (nc - c) / 2].isWall = false;
      grid[nr][nc].isWall = false;
    }
    return [...grid];
  }

  function applyAndRecord(step: MazeStep) {
    setHistory((h) => [...h, step]);
    setGrid((g) => applyStep(g, step));
  }

  const generate = () => {
    reset();
    setGrid(generateMazeDFS(rows, cols));
  };

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

  return { grid, generate, start, stop, step, reset, isRunning };
}
