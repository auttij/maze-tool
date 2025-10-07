import { useEffect, useRef, useState } from 'react';
import { type Cell, type MazeStep, createEmptyGrid, carveWall } from '@/lib/gridUtils';
import { generateMazeDFSAnimated, generateMazeDFS } from '@/algorithms/generators/dfs';

export function useMaze(rows: number, cols: number, speed: number) {
  const [grid, setGrid] = useState(createEmptyGrid(rows, cols));
  const [history, setHistory] = useState<MazeStep[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const generatorRef = useRef<Generator<MazeStep>>(null);
  const intervalRef = useRef<NodeJS.Timeout>(null);

  /* Helpers */

  function applyStep(grid: Cell[][], step: MazeStep): Cell[][] {
    if (step.type === 'carve') {
      const [r, c] = step.from;
      const [nr, nc] = step.to;

      const cell = grid[r][c];
      const neighbor = grid[nr][nc];
      carveWall(cell, neighbor);
    }
    return [...grid];
  }

  function applyAndRecord(step: MazeStep) {
    setHistory((h) => [...h, step]);
    setGrid((g) => applyStep(g, step));
  }

  const addGenerator = () => {
    if (!generatorRef.current) {
      reset();
      generatorRef.current = generateMazeDFSAnimated(rows, cols);
    }
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const processStep = () => {
    if (generatorRef.current) {
      const { value, done } = generatorRef.current.next();
      if (done) {
        generatorRef.current = null;
        stop();
      } else {
        applyAndRecord(value);
      }
    }
  };

  /* Exposed functions */

  const generate = () => {
    reset();
    setGrid(generateMazeDFS(rows, cols));
  };

  const reset = () => {
    setGrid(createEmptyGrid(rows, cols));
    generatorRef.current = null;
    stopTimer();
    setIsRunning(false);
  };

  const start = () => {
    addGenerator();
    setIsRunning(true);
  };

  const stop = () => {
    stopTimer();
    setIsRunning(false);
  };

  const step = () => {
    addGenerator();
    processStep();
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (isRunning) processStep();
    }, speed);

    intervalRef.current = timer;
    return () => clearInterval(timer);
  }, [isRunning, speed]);

  return { grid, generate, start, stop, step, reset, isRunning };
}
