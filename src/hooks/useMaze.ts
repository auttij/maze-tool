import { useEffect, useRef, useState } from 'react';
import { type Cell } from '@/lib/gridUtils';
import { generateMazeDFSAnimated } from '@/algorithms/generators/dfs';

export function useMaze(rows: number, cols: number, speed: number) {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const generatorRef = useRef<Generator<Cell[][]>>(null);
  const intervalRef = useRef<number | null>(null);

  const start = () => {
    generatorRef.current = generateMazeDFSAnimated(rows, cols);
    setIsRunning(true);
  };

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsRunning(false);
  };

  const step = () => {
    if (generatorRef.current) {
      const { value, done } = generatorRef.current.next();
      if (!done && value) {
        setGrid(value);
      } else {
        stop();
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (isRunning && generatorRef.current) {
        const { value, done } = generatorRef.current!.next();
        if (done) {
          stop();
        } else {
          setGrid(value!);
        }
      }
    });

    intervalRef.current = timer;
    return () => clearInterval(timer);
  }, [isRunning, speed]);

  return { grid, start, stop, step, isRunning };
}
