import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

type PlaybackControlsProps = {
  isRunning: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStep: () => void;
  speed: number;
  onSpeedChange: (val: number) => void;
};

export function PlaybackControls({
  isRunning,
  onPlay,
  onPause,
  onStep,
  speed,
  onSpeedChange,
}: PlaybackControlsProps) {
  const speedOptions = [320, 160, 80, 40, 20, 10];

  return (
    <div className="mt-4 flex items-center gap-4">
      {isRunning ? (
        <Button onClick={onPause} variant="destructive">
          Pause
        </Button>
      ) : (
        <Button onClick={onPlay} variant="default">
          Play
        </Button>
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
    </div>
  );
}
