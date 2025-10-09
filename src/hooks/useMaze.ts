import { useEffect, useRef, useState } from 'react';
import { initGrid } from '@/lib/gridUtils';
import { type MazeStep, applyStep } from '@/algorithms/MazeGenerator';
import { getMazeGenerator } from '@/algorithms';

export function useMaze(rows: number, cols: number, speed: number, algorithm: string) {
  const generator = getMazeGenerator(algorithm);
  const [grid, setGrid] = useState(initGrid(rows, cols));
  const [history, setHistory] = useState<MazeStep[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const generatorRef = useRef<Generator<MazeStep>>(null);
  const intervalRef = useRef<NodeJS.Timeout>(null);

  /* Helpers */

  function applyAndRecord(step: MazeStep) {
    setHistory((h) => [...h, step]);
    setGrid((g) => applyStep(g, step));
  }

  const addGenerator = () => {
    if (!generatorRef.current) {
      reset();
      generatorRef.current = generator.generateAnimated(rows, cols);
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
    setGrid(generator.generate(rows, cols));
  };

  const reset = () => {
    setGrid(initGrid(rows, cols));
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
