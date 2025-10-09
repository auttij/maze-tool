import { useState } from 'react';
import { availableGenerators } from '@/hooks/useMaze';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type AlgorithmSelectProps = {
  onAlgorithmChange: (val: string) => void;
};

export default function AlgorithmSelect({ onAlgorithmChange }: AlgorithmSelectProps) {
  const [selectedAlgo, setSelectedAlgo] = useState('Depth-first search');
  const generators = availableGenerators();

  function changeAlgorithm(val: string) {
    setSelectedAlgo(val);
    onAlgorithmChange(val);
  }

  return (
    <Select value={selectedAlgo} onValueChange={changeAlgorithm}>
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder="Select algorithm" />
      </SelectTrigger>
      <SelectContent>
        {generators.map((name) => (
          <SelectItem key={name} value={name}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
