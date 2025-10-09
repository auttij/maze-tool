import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import AlgorithmSelect from './AlgorithmSelect';

type PlaybackControlsProps = {
  isRunning: boolean;
  generate: () => void;
  onPlay: () => void;
  onPause: () => void;
  onStep: () => void;
  onReset: () => void;
  speed: number;
  onSpeedChange: (val: number) => void;
  onAlgorithmChange: (val: string) => void;
};

export function PlaybackControls({
  isRunning,
  generate,
  onPlay,
  onPause,
  onStep,
  onReset,
  speed,
  onSpeedChange,
  onAlgorithmChange,
}: PlaybackControlsProps) {
  const speedOptions = [320, 160, 80, 40, 20, 10];

  return (
    <div className="mt-4 flex items-center gap-4">
      <Button onClick={generate} variant="default">
        Generate
      </Button>
      {isRunning ? (
        <Button onClick={onPause} variant="destructive">
          Pause
        </Button>
      ) : (
        <>
          <Button onClick={onPlay} variant="default">
            Play
          </Button>
          <Button onClick={onReset} variant="destructive">
            Reset
          </Button>
        </>
      )}

      <Button onClick={onStep} variant="secondary">
        Step
      </Button>

      <div className="flex items-center gap-2">
        <span className="text-sm">Speed:</span>
        <Slider
          value={[speedOptions.indexOf(speed)]}
          min={0}
          max={speedOptions.length - 1}
          step={1}
          className="w-32"
          onValueChange={(val) => onSpeedChange(speedOptions[val[0]])}
        />
      </div>

      <AlgorithmSelect onAlgorithmChange={onAlgorithmChange} />
    </div>
  );
}
